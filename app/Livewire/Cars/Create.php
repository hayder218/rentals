<?php

namespace App\Livewire\Cars;

use App\Models\Car;
use Livewire\Component;

class Create extends Component
{
    public $make;
    public $model;
    public $year;
    public $license_plate;
    public $status = 'available';
    public $daily_rate;

    protected $rules = [
        'make' => 'required|string|max:255',
        'model' => 'required|string|max:255',
        'year' => 'required|integer|min:1900|max:2100',
        'license_plate' => 'required|string|unique:cars,license_plate',
        'status' => 'required|in:available,rented,maintenance',
        'daily_rate' => 'required|numeric|min:0',
    ];

    public function save()
    {
        $this->validate();

        Car::create([
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
        return view('livewire.cars.create');
    }
}
