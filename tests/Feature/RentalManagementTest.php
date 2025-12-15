<?php

namespace Tests\Feature;

use App\Models\Car;
use App\Models\Rental;
use App\Livewire\Rentals\Create;
use App\Livewire\Rentals\Edit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;
use Carbon\Carbon;

class RentalManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_rental_and_update_car_status()
    {
        $car = Car::create([
            'make' => 'Toyota',
            'model' => 'Camry',
            'year' => 2023,
            'license_plate' => 'ABC-123',
            'status' => 'available',
            'daily_rate' => 50.00,
        ]);

        Livewire::test(Create::class)
            ->set('car_id', $car->id)
            ->set('customer_name', 'John Doe')
            ->set('start_date', Carbon::today()->format('Y-m-d'))
            ->set('end_date', Carbon::tomorrow()->format('Y-m-d'))
            ->call('save')
            ->assertRedirect('/rentals');

        $this->assertTrue(Rental::where('car_id', $car->id)->exists());
        $this->assertEquals('rented', $car->fresh()->status);
    }

    public function test_can_complete_rental_and_free_car()
    {
        $car = Car::create([
            'make' => 'Toyota',
            'model' => 'Camry',
            'year' => 2023,
            'license_plate' => 'ABC-123',
            'status' => 'rented',
            'daily_rate' => 50.00,
        ]);

        $rental = Rental::create([
            'car_id' => $car->id,
            'customer_name' => 'John Doe',
            'start_date' => Carbon::today(),
            'end_date' => Carbon::tomorrow(),
            'total_cost' => 50.00,
            'status' => 'active',
        ]);

        Livewire::test(Edit::class, ['rental' => $rental])
            ->set('status', 'completed')
            ->call('update')
            ->assertRedirect('/rentals');

        $this->assertEquals('completed', $rental->fresh()->status);
        $this->assertEquals('available', $car->fresh()->status);
    }
}
