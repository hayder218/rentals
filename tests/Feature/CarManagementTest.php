<?php

namespace Tests\Feature;

use App\Models\Car;
use App\Livewire\Cars\Index;
use App\Livewire\Cars\Create;
use App\Livewire\Cars\Edit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class CarManagementTest extends TestCase
{
    use RefreshDatabase;



    public function test_can_create_car()
    {
        Livewire::test(Create::class)
            ->set('make', 'Toyota')
            ->set('model', 'Camry')
            ->set('year', 2023)
            ->set('license_plate', 'ABC-123')
            ->set('status', 'available')
            ->set('daily_rate', 50.00)
            ->call('save')
            ->assertRedirect('/cars');

        $this->assertTrue(Car::where('license_plate', 'ABC-123')->exists());
    }

    public function test_can_edit_car()
    {
        $car = Car::create([
            'make' => 'Toyota',
            'model' => 'Camry',
            'year' => 2023,
            'license_plate' => 'ABC-123',
            'status' => 'available',
            'daily_rate' => 50.00,
        ]);

        Livewire::test(Edit::class, ['car' => $car])
            ->set('make', 'Honda')
            ->call('update')
            ->assertRedirect('/cars');

        $this->assertEquals('Honda', $car->fresh()->make);
    }

    public function test_can_delete_car()
    {
        $car = Car::create([
            'make' => 'Toyota',
            'model' => 'Camry',
            'year' => 2023,
            'license_plate' => 'ABC-123',
            'status' => 'available',
            'daily_rate' => 50.00,
        ]);

        Livewire::test(Index::class)
            ->call('delete', $car->id);

        $this->assertNull(Car::find($car->id));
    }
}
