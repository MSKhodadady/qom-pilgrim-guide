<?php

use App\Models\Admin;
use App\Models\Place;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    Admin::factory()->create([
        'username' => 'knownadmin',
        'password' => 'password',
    ]);

    $this->token = $this->postJson('/api/auth/login', [
        'username' => 'knownadmin',
        'password' => 'password',
    ])->json('token');
});

describe('index', function () {
    it('returns 401 without a token', function () {
        $this->getJson('/api/places')->assertUnauthorized();
    });

    it('returns places ordered by name', function () {
        $shrine = Place::factory()->create(['name' => 'Shrine']);
        $mosque = Place::factory()->create(['name' => 'Mosque']);

        $this->withToken($this->token)
            ->getJson('/api/places')
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.id', $mosque->id)
            ->assertJsonPath('data.0.name', 'Mosque')
            ->assertJsonPath('data.1.id', $shrine->id);
    });
});

describe('store', function () {
    it('returns 401 without a token', function () {
        $this->postJson('/api/places', [
            'name' => 'Shrine',
        ])->assertUnauthorized();
    });

    it('creates a place', function () {
        $this->withToken($this->token)
            ->postJson('/api/places', [
                'name' => 'Shrine',
                'description' => 'A holy site.',
            ])
            ->assertCreated()
            ->assertJsonPath('data.name', 'Shrine')
            ->assertJsonPath('data.description', 'A holy site.');

        $this->assertDatabaseHas('places', [
            'name' => 'Shrine',
            'description' => 'A holy site.',
        ]);
    });

    it('creates a place without a description', function () {
        $this->withToken($this->token)
            ->postJson('/api/places', ['name' => 'Shrine'])
            ->assertCreated()
            ->assertJsonPath('data.name', 'Shrine')
            ->assertJsonPath('data.description', null);

        $this->assertDatabaseHas('places', [
            'name' => 'Shrine',
            'description' => null,
        ]);
    });

    it('rejects a request without a name', function () {
        $this->withToken($this->token)
            ->postJson('/api/places', ['description' => 'Missing name.'])
            ->assertInvalid('name');

        $this->assertDatabaseCount('places', 0);
    });
});

describe('show', function () {
    it('returns 401 without a token', function () {
        $place = Place::factory()->create();

        $this->getJson("/api/places/{$place->id}")->assertUnauthorized();
    });

    it('returns the place', function () {
        $place = Place::factory()->create(['name' => 'Shrine']);

        $this->withToken($this->token)
            ->getJson("/api/places/{$place->id}")
            ->assertOk()
            ->assertJsonPath('data.id', $place->id)
            ->assertJsonPath('data.name', 'Shrine');
    });

    it('returns 404 for an unknown place', function () {
        $this->withToken($this->token)
            ->getJson('/api/places/999999')
            ->assertNotFound();
    });
});

describe('update', function () {
    it('returns 401 without a token', function () {
        $place = Place::factory()->create();

        $this->putJson("/api/places/{$place->id}", [
            'name' => 'Updated',
        ])->assertUnauthorized();
    });

    it('updates the place', function () {
        $place = Place::factory()->create([
            'name' => 'Old Name',
            'description' => 'Old description.',
        ]);

        $this->withToken($this->token)
            ->putJson("/api/places/{$place->id}", [
                'name' => 'New Name',
                'description' => 'New description.',
            ])
            ->assertOk()
            ->assertJsonPath('data.name', 'New Name')
            ->assertJsonPath('data.description', 'New description.');

        $this->assertDatabaseHas('places', [
            'id' => $place->id,
            'name' => 'New Name',
            'description' => 'New description.',
        ]);
    });

    it('keeps the current name when it is not provided', function () {
        $place = Place::factory()->create(['name' => 'Old Name']);

        $this->withToken($this->token)
            ->putJson("/api/places/{$place->id}", ['description' => 'New description.'])
            ->assertOk()
            ->assertJsonPath('data.name', 'Old Name')
            ->assertJsonPath('data.description', 'New description.');
    });

    it('clears the description when it is set to null', function () {
        $place = Place::factory()->create(['description' => 'Old description.']);

        $this->withToken($this->token)
            ->putJson("/api/places/{$place->id}", ['description' => null])
            ->assertOk()
            ->assertJsonPath('data.description', null);

        $this->assertDatabaseHas('places', [
            'id' => $place->id,
            'description' => null,
        ]);
    });

    it('rejects an empty name', function () {
        $place = Place::factory()->create(['name' => 'Old Name']);

        $this->withToken($this->token)
            ->putJson("/api/places/{$place->id}", ['name' => ''])
            ->assertInvalid('name');

        $this->assertDatabaseHas('places', [
            'id' => $place->id,
            'name' => 'Old Name',
        ]);
    });

    it('returns 404 for an unknown place', function () {
        $this->withToken($this->token)
            ->putJson('/api/places/999999', ['name' => 'Updated'])
            ->assertNotFound();
    });
});

describe('destroy', function () {
    it('returns 401 without a token', function () {
        $place = Place::factory()->create();

        $this->deleteJson("/api/places/{$place->id}")->assertUnauthorized();
    });

    it('deletes the place', function () {
        $place = Place::factory()->create();

        $this->withToken($this->token)
            ->deleteJson("/api/places/{$place->id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('places', ['id' => $place->id]);
    });

    it('returns 404 for an unknown place', function () {
        $this->withToken($this->token)
            ->deleteJson('/api/places/999999')
            ->assertNotFound();
    });
});
