<?php

namespace Database\Factories;

use App\Models\StayMode;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<StayMode> */
class StayModeFactory extends Factory
{
    protected $model = StayMode::class;

    public function definition(): array
    {
        return ['name' => fake()->unique()->word(), 'slug' => fake()->unique()->slug()];
    }
}
