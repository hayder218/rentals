<?php

namespace App\Livewire\Rentals;

use App\Models\Car;
use App\Models\Rental;
use Livewire\Component;
use Carbon\Carbon;

class Create extends Component
{
    public $car_id;
    public $customer_name;
    public $start_date;
    public $end_date;
    public $total_cost = 0;

    protected $rules = [
        'car_id' => 'required|exists:cars,id',
        'customer_name' => 'required|string|max:255',
        'start_date' => 'required|date|after_or_equal:today',
        'end_date' => 'required|date|after:start_date',
    ];

    public function updated($propertyName)
    {
        $this->calculateTotalCost();
    }

    public function calculateTotalCost()
    {
        if ($this->car_id && $this->start_date && $this->end_date) {
            $car = Car::find($this->car_id);
            $start = Carbon::parse($this->start_date);
            $end = Carbon::parse($this->end_date);
            $days = $start->diffInDays($end);
            $this->total_cost = $days * $car->daily_rate;
        }
    }

    public function save()
    {
        $this->validate();

        $this->calculateTotalCost();

        $rental = Rental::create([
            'car_id' => $this->car_id,
            'customer_name' => $this->customer_name,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'total_cost' => $this->total_cost,
            'status' => 'active',
        ]);

        $car = Car::find($this->car_id);
        $car->update(['status' => 'rented']);

        return redirect()->route('rentals.index');
    }

    public function render()
    {
        return view('livewire.rentals.create', [
            'cars' => Car::where('status', 'available')->get(),
        ]);
    }
}
