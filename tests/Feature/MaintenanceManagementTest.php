<?php

namespace Tests\Feature;

use App\Models\Car;
use App\Models\Maintenance;
use App\Livewire\Maintenances\Create;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;
use Carbon\Carbon;

class MaintenanceManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_schedule_maintenance_and_update_car_status()
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
            ->set('description', 'Oil Change')
            ->set('cost', 100.00)
            ->set('date', Carbon::today()->format('Y-m-d'))
            ->call('save')
            ->assertRedirect('/maintenances');

        $this->assertTrue(Maintenance::where('car_id', $car->id)->exists());
        $this->assertEquals('maintenance', $car->fresh()->status);
    }
}
