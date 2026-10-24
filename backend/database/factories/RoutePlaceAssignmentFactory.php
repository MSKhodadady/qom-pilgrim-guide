<?php

namespace Database\Factories;

use App\Models\EntryRoute;
use App\Models\Place;
use App\Models\RoutePlaceAssignment;
use App\Models\StayMode;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<RoutePlaceAssignment> */
class RoutePlaceAssignmentFactory extends Factory
{
    protected $model = RoutePlaceAssignment::class;

    public function definition(): array
    {
        return [
            'entry_route_id' => EntryRoute::factory(),
            'stay_mode_id' => StayMode::factory(),
            'place_id' => Place::factory(),
            'role' => fake()->randomElement(['parking', 'lodging', 'transport', 'hotel']),
            'notes' => fake()->optional()->sentence(),
            'sort_order' => fake()->numberBetween(1, 20),
        ];
    }
}
