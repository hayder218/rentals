<?php

namespace Database\Factories;

use App\Models\Car;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rental>
 */
class RentalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('-2 months', 'now');
        $endDate = fake()->dateTimeBetween($startDate, '+1 month');

        return [
            'car_id' => Car::factory(),
            'customer_name' => fake()->name(),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'total_cost' => fake()->randomFloat(2, 50, 1000),
            'status' => fake()->randomElement(['active', 'completed', 'cancelled']),
        ];
    }
}
