<?php

use App\Models\Admin;
use App\Models\EntryRoute;
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
        $this->getJson('/api/entry-routes')->assertUnauthorized();
    });

    it('returns entry routes ordered by sort order', function () {
        $later = EntryRoute::factory()->create(['sort_order' => 20, 'name' => 'Later']);
        $earlier = EntryRoute::factory()->create(['sort_order' => 10, 'name' => 'Earlier']);

        $this->withToken($this->token)
            ->getJson('/api/entry-routes')
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.id', $earlier->id)
            ->assertJsonPath('data.0.name', 'Earlier')
            ->assertJsonPath('data.1.id', $later->id);
    });
});

describe('store', function () {
    it('returns 401 without a token', function () {
        $this->postJson('/api/entry-routes', [
            'name' => 'Northern Route',
            'slug' => 'northern-route',
        ])->assertUnauthorized();
    });

    it('creates an entry route', function () {
        $this->withToken($this->token)
            ->postJson('/api/entry-routes', [
                'name' => 'Northern Route',
                'slug' => 'northern-route',
                'sort_order' => 3,
            ])
            ->assertCreated()
            ->assertJsonPath('data.name', 'Northern Route')
            ->assertJsonPath('data.slug', 'northern-route')
            ->assertJsonPath('data.sort_order', 3);

        $this->assertDatabaseHas('entry_routes', [
            'name' => 'Northern Route',
            'slug' => 'northern-route',
            'sort_order' => 3,
        ]);
    });

    it('defaults sort order to zero when it is omitted', function () {
        $this->withToken($this->token)
            ->postJson('/api/entry-routes', [
                'name' => 'Northern Route',
                'slug' => 'northern-route',
            ])
            ->assertCreated()
            ->assertJsonPath('data.sort_order', 0);

        $this->assertDatabaseHas('entry_routes', [
            'slug' => 'northern-route',
            'sort_order' => 0,
        ]);
    });

    it('rejects a request with missing required fields', function () {
        $this->withToken($this->token)
            ->postJson('/api/entry-routes')
            ->assertInvalid(['name', 'slug']);

        $this->assertDatabaseCount('entry_routes', 0);
    });

    it('rejects a duplicate slug', function () {
        EntryRoute::factory()->create(['slug' => 'taken-slug']);

        $this->withToken($this->token)
            ->postJson('/api/entry-routes', [
                'name' => 'Northern Route',
                'slug' => 'taken-slug',
            ])->assertInvalid('slug');

        $this->assertDatabaseCount('entry_routes', 1);
    });

    it('rejects a negative sort order', function () {
        $this->withToken($this->token)
            ->postJson('/api/entry-routes', [
                'name' => 'Northern Route',
                'slug' => 'northern-route',
                'sort_order' => -1,
            ])->assertInvalid('sort_order');
    });
});

describe('show', function () {
    it('returns 401 without a token', function () {
        $entryRoute = EntryRoute::factory()->create();

        $this->getJson("/api/entry-routes/{$entryRoute->id}")->assertUnauthorized();
    });

    it('returns the entry route', function () {
        $entryRoute = EntryRoute::factory()->create([
            'name' => 'Northern Route',
            'slug' => 'northern-route',
        ]);

        $this->withToken($this->token)
            ->getJson("/api/entry-routes/{$entryRoute->id}")
            ->assertOk()
            ->assertJsonPath('data.id', $entryRoute->id)
            ->assertJsonPath('data.slug', 'northern-route');
    });

    it('returns 404 for an unknown entry route', function () {
        $this->withToken($this->token)
            ->getJson('/api/entry-routes/999999')
            ->assertNotFound();
    });
});

describe('update', function () {
    it('returns 401 without a token', function () {
        $entryRoute = EntryRoute::factory()->create();

        $this->putJson("/api/entry-routes/{$entryRoute->id}", [
            'name' => 'Updated',
        ])->assertUnauthorized();
    });

    it('updates the entry route', function () {
        $entryRoute = EntryRoute::factory()->create([
            'name' => 'Old Name',
            'slug' => 'old-slug',
            'sort_order' => 1,
        ]);

        $this->withToken($this->token)
            ->putJson("/api/entry-routes/{$entryRoute->id}", [
                'name' => 'New Name',
                'slug' => 'new-slug',
                'sort_order' => 5,
            ])
            ->assertOk()
            ->assertJsonPath('data.name', 'New Name')
            ->assertJsonPath('data.slug', 'new-slug')
            ->assertJsonPath('data.sort_order', 5);

        $this->assertDatabaseHas('entry_routes', [
            'id' => $entryRoute->id,
            'name' => 'New Name',
            'slug' => 'new-slug',
            'sort_order' => 5,
        ]);
    });

    it('keeps the current slug when it is not provided', function () {
        $entryRoute = EntryRoute::factory()->create([
            'name' => 'Old Name',
            'slug' => 'old-slug',
        ]);

        $this->withToken($this->token)
            ->putJson("/api/entry-routes/{$entryRoute->id}", ['name' => 'New Name'])
            ->assertOk()
            ->assertJsonPath('data.name', 'New Name')
            ->assertJsonPath('data.slug', 'old-slug');
    });

    it('allows the entry route to keep its own slug', function () {
        $entryRoute = EntryRoute::factory()->create(['slug' => 'own-slug']);

        $this->withToken($this->token)
            ->putJson("/api/entry-routes/{$entryRoute->id}", [
                'name' => 'Renamed',
                'slug' => 'own-slug',
            ])
            ->assertOk()
            ->assertJsonPath('data.slug', 'own-slug');
    });

    it('rejects a slug that belongs to another entry route', function () {
        EntryRoute::factory()->create(['slug' => 'taken-slug']);
        $entryRoute = EntryRoute::factory()->create(['slug' => 'own-slug']);

        $this->withToken($this->token)
            ->putJson("/api/entry-routes/{$entryRoute->id}", ['slug' => 'taken-slug'])
            ->assertInvalid('slug');

        $this->assertDatabaseHas('entry_routes', [
            'id' => $entryRoute->id,
            'slug' => 'own-slug',
        ]);
    });

    it('returns 404 for an unknown entry route', function () {
        $this->withToken($this->token)
            ->putJson('/api/entry-routes/999999', ['name' => 'Updated'])
            ->assertNotFound();
    });
});

describe('destroy', function () {
    it('returns 401 without a token', function () {
        $entryRoute = EntryRoute::factory()->create();

        $this->deleteJson("/api/entry-routes/{$entryRoute->id}")->assertUnauthorized();
    });

    it('deletes the entry route', function () {
        $entryRoute = EntryRoute::factory()->create();

        $this->withToken($this->token)
            ->deleteJson("/api/entry-routes/{$entryRoute->id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('entry_routes', ['id' => $entryRoute->id]);
    });

    it('returns 404 for an unknown entry route', function () {
        $this->withToken($this->token)
            ->deleteJson('/api/entry-routes/999999')
            ->assertNotFound();
    });
});
