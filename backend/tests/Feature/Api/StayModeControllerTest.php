<?php

use App\Models\Admin;
use App\Models\StayMode;
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
        $this->getJson('/api/stay-modes')->assertUnauthorized();
    });

    it('returns stay modes ordered by id', function () {
        $tent = StayMode::factory()->create(['name' => 'Tent']);
        $hotel = StayMode::factory()->create(['name' => 'Hotel']);

        $this->withToken($this->token)
            ->getJson('/api/stay-modes')
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.id', $tent->id)
            ->assertJsonPath('data.0.name', 'Tent')
            ->assertJsonPath('data.1.id', $hotel->id);
    });
});

describe('store', function () {
    it('returns 401 without a token', function () {
        $this->postJson('/api/stay-modes', [
            'name' => 'Hotel',
            'slug' => 'hotel',
        ])->assertUnauthorized();
    });

    it('creates a stay mode', function () {
        $this->withToken($this->token)
            ->postJson('/api/stay-modes', [
                'name' => 'Hotel',
                'slug' => 'hotel',
            ])
            ->assertCreated()
            ->assertJsonPath('data.name', 'Hotel')
            ->assertJsonPath('data.slug', 'hotel');

        $this->assertDatabaseHas('stay_modes', [
            'name' => 'Hotel',
            'slug' => 'hotel',
        ]);
    });

    it('rejects a request with missing required fields', function () {
        $this->withToken($this->token)
            ->postJson('/api/stay-modes')
            ->assertInvalid(['name', 'slug']);

        $this->assertDatabaseCount('stay_modes', 0);
    });

    it('rejects a duplicate slug', function () {
        StayMode::factory()->create(['slug' => 'taken-slug']);

        $this->withToken($this->token)
            ->postJson('/api/stay-modes', [
                'name' => 'Hotel',
                'slug' => 'taken-slug',
            ])->assertInvalid('slug');

        $this->assertDatabaseCount('stay_modes', 1);
    });
});

describe('show', function () {
    it('returns 401 without a token', function () {
        $stayMode = StayMode::factory()->create();

        $this->getJson("/api/stay-modes/{$stayMode->id}")->assertUnauthorized();
    });

    it('returns the stay mode', function () {
        $stayMode = StayMode::factory()->create([
            'name' => 'Hotel',
            'slug' => 'hotel',
        ]);

        $this->withToken($this->token)
            ->getJson("/api/stay-modes/{$stayMode->id}")
            ->assertOk()
            ->assertJsonPath('data.id', $stayMode->id)
            ->assertJsonPath('data.slug', 'hotel');
    });

    it('returns 404 for an unknown stay mode', function () {
        $this->withToken($this->token)
            ->getJson('/api/stay-modes/999999')
            ->assertNotFound();
    });
});

describe('update', function () {
    it('returns 401 without a token', function () {
        $stayMode = StayMode::factory()->create();

        $this->putJson("/api/stay-modes/{$stayMode->id}", [
            'name' => 'Updated',
        ])->assertUnauthorized();
    });

    it('updates the stay mode', function () {
        $stayMode = StayMode::factory()->create([
            'name' => 'Old Name',
            'slug' => 'old-slug',
        ]);

        $this->withToken($this->token)
            ->putJson("/api/stay-modes/{$stayMode->id}", [
                'name' => 'New Name',
                'slug' => 'new-slug',
            ])
            ->assertOk()
            ->assertJsonPath('data.name', 'New Name')
            ->assertJsonPath('data.slug', 'new-slug');

        $this->assertDatabaseHas('stay_modes', [
            'id' => $stayMode->id,
            'name' => 'New Name',
            'slug' => 'new-slug',
        ]);
    });

    it('keeps the current slug when it is not provided', function () {
        $stayMode = StayMode::factory()->create([
            'name' => 'Old Name',
            'slug' => 'old-slug',
        ]);

        $this->withToken($this->token)
            ->putJson("/api/stay-modes/{$stayMode->id}", ['name' => 'New Name'])
            ->assertOk()
            ->assertJsonPath('data.name', 'New Name')
            ->assertJsonPath('data.slug', 'old-slug');
    });

    it('allows the stay mode to keep its own slug', function () {
        $stayMode = StayMode::factory()->create(['slug' => 'own-slug']);

        $this->withToken($this->token)
            ->putJson("/api/stay-modes/{$stayMode->id}", [
                'name' => 'Renamed',
                'slug' => 'own-slug',
            ])
            ->assertOk()
            ->assertJsonPath('data.slug', 'own-slug');
    });

    it('rejects a slug that belongs to another stay mode', function () {
        StayMode::factory()->create(['slug' => 'taken-slug']);
        $stayMode = StayMode::factory()->create(['slug' => 'own-slug']);

        $this->withToken($this->token)
            ->putJson("/api/stay-modes/{$stayMode->id}", ['slug' => 'taken-slug'])
            ->assertInvalid('slug');

        $this->assertDatabaseHas('stay_modes', [
            'id' => $stayMode->id,
            'slug' => 'own-slug',
        ]);
    });

    it('returns 404 for an unknown stay mode', function () {
        $this->withToken($this->token)
            ->putJson('/api/stay-modes/999999', ['name' => 'Updated'])
            ->assertNotFound();
    });
});

describe('destroy', function () {
    it('returns 401 without a token', function () {
        $stayMode = StayMode::factory()->create();

        $this->deleteJson("/api/stay-modes/{$stayMode->id}")->assertUnauthorized();
    });

    it('deletes the stay mode', function () {
        $stayMode = StayMode::factory()->create();

        $this->withToken($this->token)
            ->deleteJson("/api/stay-modes/{$stayMode->id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('stay_modes', ['id' => $stayMode->id]);
    });

    it('returns 404 for an unknown stay mode', function () {
        $this->withToken($this->token)
            ->deleteJson('/api/stay-modes/999999')
            ->assertNotFound();
    });
});
