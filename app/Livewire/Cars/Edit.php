<?php

namespace App\Livewire\Cars;

use App\Models\Car;
use Livewire\Component;

class Edit extends Component
{
    public Car $car;
    public $make;
    public $model;
    public $year;
    public $license_plate;
    public $status;
    public $daily_rate;

    protected function rules()
    {
        return [
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:2100',
            'license_plate' => 'required|string|unique:cars,license_plate,' . $this->car->id,
            'status' => 'required|in:available,rented,maintenance',
            'daily_rate' => 'required|numeric|min:0',
        ];
    }

    public function mount(Car $car)
    {
        $this->car = $car;
        $this->make = $car->make;
        $this->model = $car->model;
        $this->year = $car->year;
        $this->license_plate = $car->license_plate;
        $this->status = $car->status;
        $this->daily_rate = $car->daily_rate;
    }

    public function update()
    {
        $this->validate();

        $this->car->update([
            'make' => $this->make,
            'model' => $this->model,
            'year' => $this->year,
            'license_plate' => $this->license_plate,
            'status' => $this->status,
            'daily_rate' => $this->daily_rate,
        ]);

        return redirect()->route('cars.index');
    }

    public function render()
    {
        return view('livewire.cars.edit');
    }
}
