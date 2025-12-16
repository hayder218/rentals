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

        \App\Models\Setting::set('contract_terms', "1. The Renter agrees to rent the Vehicle described above for the dates specified.\n2. The Renter acknowledges that the Vehicle is in good operating condition.\n3. The Renter agrees to pay the Total Cost specified in this contract.\n4. The Vehicle shall not be used for any illegal purpose.\n5. The Renter is responsible for all fines and penalties incurred using the Vehicle during the rental period.");

        $cars = Car::factory(5)->create();

        Rental::factory(20)
            ->recycle($cars)
            ->create();

        Maintenance::factory(33)
            ->recycle($cars)
            ->create();
    }
}
