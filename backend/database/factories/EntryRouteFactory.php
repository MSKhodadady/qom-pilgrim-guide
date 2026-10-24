<?php

namespace Database\Factories;

use App\Models\EntryRoute;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<EntryRoute> */
class EntryRouteFactory extends Factory
{
    protected $model = EntryRoute::class;

    public function definition(): array
    {
        $name = fake()->unique()->city();
        return ['name' => $name, 'slug' => fake()->unique()->slug(), 'sort_order' => fake()->numberBetween(1, 100)];
    }
}
