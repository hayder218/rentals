<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\Maintenance;
use App\Models\Rental;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $cars = Car::factory(5)->create();

        Rental::factory(20)
            ->recycle($cars)
            ->create();

        Maintenance::factory(33)
            ->recycle($cars)
            ->create();
    }
}
