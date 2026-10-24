<?php

namespace Database\Factories;

use App\Models\AccessRoute;
use App\Models\EntryRoute;
use App\Models\Place;
use App\Models\StayMode;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<AccessRoute> */
class AccessRouteFactory extends Factory
{
    protected $model = AccessRoute::class;

    public function definition(): array
    {
        return [
            'entry_route_id' => EntryRoute::factory(),
            'stay_mode_id' => StayMode::factory(),
            'destination_place_id' => Place::factory(),
            'route_description' => fake()->sentence(),
            'sort_order' => fake()->numberBetween(1, 20),
        ];
    }
}
