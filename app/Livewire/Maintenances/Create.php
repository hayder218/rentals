<?php

namespace App\Livewire\Maintenances;

use App\Models\Car;
use App\Models\Maintenance;
use Livewire\Component;

class Create extends Component
{
    public $car_id;
    public $description;
    public $cost;
    public $date;

    protected $rules = [
        'car_id' => 'required|exists:cars,id',
        'description' => 'required|string',
        'cost' => 'required|numeric|min:0',
        'date' => 'required|date',
    ];

    public function save()
    {
        $this->validate();

        Maintenance::create([
            'car_id' => $this->car_id,
            'description' => $this->description,
            'cost' => $this->cost,
            'date' => $this->date,
            'status' => 'scheduled',
        ]);

        $car = Car::find($this->car_id);
        $car->update(['status' => 'maintenance']);

        return redirect()->route('maintenances.index');
    }

    public function render()
    {
        return view('livewire.maintenances.create', [
            'cars' => Car::all(),
        ]);
    }
}
