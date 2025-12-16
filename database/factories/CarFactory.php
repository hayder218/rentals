<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'make' => fake()->randomElement(['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi']),
            'model' => fake()->word(),
            'year' => fake()->year(),
            'license_plate' => strtoupper(fake()->bothify('###-???')),
            'status' => fake()->randomElement(['available', 'rented', 'maintenance']),
            'daily_rate' => fake()->randomFloat(2, 30, 200),
        ];
    }
}
