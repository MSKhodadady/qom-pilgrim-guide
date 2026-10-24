<?php

use App\Models\Admin;
use App\Models\EntryRoute;
use App\Models\Place;
use App\Models\RoutePlaceAssignment;
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

/**
 * Build a full assignment payload with real related records.
 *
 * @param  array<string, mixed>  $overrides
 * @return array<string, mixed>
 */
function assignmentPayload(array $overrides = []): array
{
    return array_merge([
        'entry_route_id' => EntryRoute::factory()->create()->id,
        'stay_mode_id' => StayMode::factory()->create()->id,
        'place_id' => Place::factory()->create()->id,
        'role' => 'parking',
        'sort_order' => 1,
    ], $overrides);
}

describe('index', function () {
    it('returns 401 without a token', function () {
        $this->getJson('/api/route-place-assignments')->assertUnauthorized();
    });

    it('returns assignments with their related labels', function () {
        $entryRoute = EntryRoute::factory()->create(['name' => 'Tehran', 'slug' => 'tehran']);
        $stayMode = StayMode::factory()->create(['name' => 'Central', 'slug' => 'central']);
        $place = Place::factory()->create(['name' => 'Kazemi Parking', 'description' => 'Covered.']);

        RoutePlaceAssignment::factory()->create([
            'entry_route_id' => $entryRoute->id,
            'stay_mode_id' => $stayMode->id,
            'place_id' => $place->id,
            'role' => 'parking',
        ]);

        $this->withToken($this->token)
            ->getJson('/api/route-place-assignments')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.entry_route.name', 'Tehran')
            ->assertJsonPath('data.0.entry_route.slug', 'tehran')
            ->assertJsonPath('data.0.stay_mode.name', 'Central')
            ->assertJsonPath('data.0.stay_mode.slug', 'central')
            ->assertJsonPath('data.0.place.name', 'Kazemi Parking')
            ->assertJsonPath('data.0.place.description', 'Covered.');
    });

    it('filters by entry route slug', function () {
        $tehran = EntryRoute::factory()->create(['slug' => 'tehran']);
        $saveh = EntryRoute::factory()->create(['slug' => 'saveh']);
        $stayMode = StayMode::factory()->create();

        $expected = RoutePlaceAssignment::factory()->create([
            'entry_route_id' => $tehran->id,
            'stay_mode_id' => $stayMode->id,
        ]);
        RoutePlaceAssignment::factory()->create([
            'entry_route_id' => $saveh->id,
            'stay_mode_id' => $stayMode->id,
        ]);

        $this->withToken($this->token)
            ->getJson('/api/route-place-assignments?entry_route=tehran')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $expected->id);
    });

    it('filters by entry route id', function () {
        $tehran = EntryRoute::factory()->create(['slug' => 'tehran']);
        $saveh = EntryRoute::factory()->create(['slug' => 'saveh']);
        $stayMode = StayMode::factory()->create();

        RoutePlaceAssignment::factory()->create([
            'entry_route_id' => $tehran->id,
            'stay_mode_id' => $stayMode->id,
        ]);
        $expected = RoutePlaceAssignment::factory()->create([
            'entry_route_id' => $saveh->id,
            'stay_mode_id' => $stayMode->id,
        ]);

        $this->withToken($this->token)
            ->getJson("/api/route-place-assignments?entry_route={$saveh->id}")
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $expected->id);
    });

    it('filters by stay mode slug', function () {
        $entryRoute = EntryRoute::factory()->create();
        $central = StayMode::factory()->create(['slug' => 'central']);
        $peripheral = StayMode::factory()->create(['slug' => 'peripheral']);

        $expected = RoutePlaceAssignment::factory()->create([
            'entry_route_id' => $entryRoute->id,
            'stay_mode_id' => $central->id,
        ]);
        RoutePlaceAssignment::factory()->create([
            'entry_route_id' => $entryRoute->id,
            'stay_mode_id' => $peripheral->id,
        ]);

        $this->withToken($this->token)
            ->getJson('/api/route-place-assignments?stay_mode=central')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $expected->id);
    });

    it('filters by stay mode id', function () {
        $entryRoute = EntryRoute::factory()->create();
        $central = StayMode::factory()->create(['slug' => 'central']);
        $peripheral = StayMode::factory()->create(['slug' => 'peripheral']);

        RoutePlaceAssignment::factory()->create([
            'entry_route_id' => $entryRoute->id,
            'stay_mode_id' => $central->id,
        ]);
        $expected = RoutePlaceAssignment::factory()->create([
            'entry_route_id' => $entryRoute->id,
            'stay_mode_id' => $peripheral->id,
        ]);

        $this->withToken($this->token)
            ->getJson("/api/route-place-assignments?stay_mode={$peripheral->id}")
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $expected->id);
    });

    it('combines the entry route and stay mode filters', function () {
        $tehran = EntryRoute::factory()->create(['slug' => 'tehran']);
        $saveh = EntryRoute::factory()->create(['slug' => 'saveh']);
        $central = StayMode::factory()->create(['slug' => 'central']);
        $peripheral = StayMode::factory()->create(['slug' => 'peripheral']);

        $expected = RoutePlaceAssignment::factory()->create([
            'entry_route_id' => $tehran->id,
            'stay_mode_id' => $central->id,
            'role' => 'parking',
        ]);
        RoutePlaceAssignment::factory()->create([
            'entry_route_id' => $tehran->id,
            'stay_mode_id' => $peripheral->id,
        ]);
        RoutePlaceAssignment::factory()->create([
            'entry_route_id' => $saveh->id,
            'stay_mode_id' => $central->id,
        ]);

        $this->withToken($this->token)
            ->getJson('/api/route-place-assignments?entry_route=tehran&stay_mode=central')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $expected->id);
    });

    it('returns an empty list when no assignment matches the filters', function () {
        RoutePlaceAssignment::factory()->create();

        $this->withToken($this->token)
            ->getJson('/api/route-place-assignments?entry_route=missing')
            ->assertOk()
            ->assertJsonCount(0, 'data');
    });
});

describe('store', function () {
    it('returns 401 without a token', function () {
        $this->postJson('/api/route-place-assignments', assignmentPayload())->assertUnauthorized();
    });

    it('creates an assignment', function () {
        $payload = assignmentPayload([
            'role' => 'hotel',
            'notes' => 'Near the shrine.',
            'address' => 'Imam Khomeini St.',
            'sort_order' => 4,
        ]);

        $this->withToken($this->token)
            ->postJson('/api/route-place-assignments', $payload)
            ->assertCreated()
            ->assertJsonPath('data.entry_route_id', $payload['entry_route_id'])
            ->assertJsonPath('data.role', 'hotel')
            ->assertJsonPath('data.address', 'Imam Khomeini St.')
            ->assertJsonPath('data.sort_order', 4);

        $this->assertDatabaseHas('route_place_assignments', [
            'entry_route_id' => $payload['entry_route_id'],
            'stay_mode_id' => $payload['stay_mode_id'],
            'place_id' => $payload['place_id'],
            'role' => 'hotel',
            'address' => 'Imam Khomeini St.',
        ]);
    });

    it('defaults sort order to zero when it is omitted', function () {
        $payload = assignmentPayload();
        unset($payload['sort_order']);

        $this->withToken($this->token)
            ->postJson('/api/route-place-assignments', $payload)
            ->assertCreated()
            ->assertJsonPath('data.sort_order', 0);
    });

    it('rejects a request with missing required fields', function () {
        $this->withToken($this->token)
            ->postJson('/api/route-place-assignments')
            ->assertInvalid(['entry_route_id', 'stay_mode_id', 'place_id', 'role']);

        $this->assertDatabaseCount('route_place_assignments', 0);
    });

    it('rejects related records that do not exist', function () {
        $this->withToken($this->token)
            ->postJson('/api/route-place-assignments', assignmentPayload([
                'entry_route_id' => 999999,
                'stay_mode_id' => 999999,
                'place_id' => 999999,
            ]))
            ->assertInvalid(['entry_route_id', 'stay_mode_id', 'place_id']);
    });

    it('rejects a duplicate role for the same route, stay mode and place', function () {
        $payload = assignmentPayload(['role' => 'parking']);
        RoutePlaceAssignment::factory()->create($payload);

        $this->withToken($this->token)
            ->postJson('/api/route-place-assignments', $payload)
            ->assertInvalid('role');

        $this->assertDatabaseCount('route_place_assignments', 1);
    });

    it('allows the same role for a different place', function () {
        $payload = assignmentPayload(['role' => 'parking']);
        RoutePlaceAssignment::factory()->create($payload);

        $this->withToken($this->token)
            ->postJson('/api/route-place-assignments', array_merge($payload, [
                'place_id' => Place::factory()->create()->id,
            ]))
            ->assertCreated();
    });

    it('rejects a negative sort order', function () {
        $this->withToken($this->token)
            ->postJson('/api/route-place-assignments', assignmentPayload(['sort_order' => -1]))
            ->assertInvalid('sort_order');
    });
});

describe('show', function () {
    it('returns 401 without a token', function () {
        $assignment = RoutePlaceAssignment::factory()->create();

        $this->getJson("/api/route-place-assignments/{$assignment->id}")->assertUnauthorized();
    });

    it('returns the assignment with its related labels', function () {
        $entryRoute = EntryRoute::factory()->create(['name' => 'Tehran', 'slug' => 'tehran']);
        $stayMode = StayMode::factory()->create(['name' => 'Central', 'slug' => 'central']);
        $place = Place::factory()->create(['name' => 'Kazemi Parking', 'description' => 'Covered.']);

        $assignment = RoutePlaceAssignment::factory()->create([
            'entry_route_id' => $entryRoute->id,
            'stay_mode_id' => $stayMode->id,
            'place_id' => $place->id,
        ]);

        $this->withToken($this->token)
            ->getJson("/api/route-place-assignments/{$assignment->id}")
            ->assertOk()
            ->assertJsonPath('data.id', $assignment->id)
            ->assertJsonPath('data.entry_route.name', 'Tehran')
            ->assertJsonPath('data.entry_route.slug', 'tehran')
            ->assertJsonPath('data.stay_mode.name', 'Central')
            ->assertJsonPath('data.stay_mode.slug', 'central')
            ->assertJsonPath('data.place.name', 'Kazemi Parking')
            ->assertJsonPath('data.place.description', 'Covered.');
    });

    it('returns 404 for an unknown assignment', function () {
        $this->withToken($this->token)
            ->getJson('/api/route-place-assignments/999999')
            ->assertNotFound();
    });
});

describe('update', function () {
    it('returns 401 without a token', function () {
        $assignment = RoutePlaceAssignment::factory()->create();

        $this->putJson("/api/route-place-assignments/{$assignment->id}", [
            'role' => 'hotel',
        ])->assertUnauthorized();
    });

    it('updates the assignment', function () {
        $assignment = RoutePlaceAssignment::factory()->create([
            'role' => 'parking',
            'notes' => 'Old notes.',
        ]);

        $this->withToken($this->token)
            ->putJson("/api/route-place-assignments/{$assignment->id}", [
                'role' => 'hotel',
                'notes' => 'New notes.',
                'sort_order' => 9,
            ])
            ->assertOk()
            ->assertJsonPath('data.role', 'hotel')
            ->assertJsonPath('data.notes', 'New notes.')
            ->assertJsonPath('data.sort_order', 9);

        $this->assertDatabaseHas('route_place_assignments', [
            'id' => $assignment->id,
            'role' => 'hotel',
            'notes' => 'New notes.',
            'sort_order' => 9,
        ]);
    });

    it('keeps the current role when it is not provided', function () {
        $assignment = RoutePlaceAssignment::factory()->create(['role' => 'parking']);

        $this->withToken($this->token)
            ->putJson("/api/route-place-assignments/{$assignment->id}", ['notes' => 'New notes.'])
            ->assertOk()
            ->assertJsonPath('data.role', 'parking')
            ->assertJsonPath('data.notes', 'New notes.');
    });

    it('rejects a duplicate role for the same route, stay mode and place', function () {
        $existing = RoutePlaceAssignment::factory()->create([
            'role' => 'parking',
        ]);
        $assignment = RoutePlaceAssignment::factory()->create([
            'entry_route_id' => $existing->entry_route_id,
            'stay_mode_id' => $existing->stay_mode_id,
            'place_id' => $existing->place_id,
            'role' => 'hotel',
        ]);

        $this->withToken($this->token)
            ->putJson("/api/route-place-assignments/{$assignment->id}", ['role' => 'parking'])
            ->assertInvalid('role');

        $this->assertDatabaseHas('route_place_assignments', [
            'id' => $assignment->id,
            'role' => 'hotel',
        ]);
    });

    it('allows the assignment to keep its own combination', function () {
        $assignment = RoutePlaceAssignment::factory()->create(['role' => 'parking']);

        $this->withToken($this->token)
            ->putJson("/api/route-place-assignments/{$assignment->id}", [
                'role' => 'parking',
                'notes' => 'Changed.',
            ])
            ->assertOk()
            ->assertJsonPath('data.role', 'parking');
    });

    it('rejects an unknown related record', function () {
        $assignment = RoutePlaceAssignment::factory()->create();

        $this->withToken($this->token)
            ->putJson("/api/route-place-assignments/{$assignment->id}", ['place_id' => 999999])
            ->assertInvalid('place_id');
    });

    it('returns 404 for an unknown assignment', function () {
        $this->withToken($this->token)
            ->putJson('/api/route-place-assignments/999999', ['role' => 'hotel'])
            ->assertNotFound();
    });
});

describe('destroy', function () {
    it('returns 401 without a token', function () {
        $assignment = RoutePlaceAssignment::factory()->create();

        $this->deleteJson("/api/route-place-assignments/{$assignment->id}")->assertUnauthorized();
    });

    it('deletes the assignment', function () {
        $assignment = RoutePlaceAssignment::factory()->create();

        $this->withToken($this->token)
            ->deleteJson("/api/route-place-assignments/{$assignment->id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('route_place_assignments', ['id' => $assignment->id]);
    });

    it('returns 404 for an unknown assignment', function () {
        $this->withToken($this->token)
            ->deleteJson('/api/route-place-assignments/999999')
            ->assertNotFound();
    });
});
