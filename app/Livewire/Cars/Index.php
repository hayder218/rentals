<?php

namespace App\Livewire\Cars;

use App\Models\Car;
use Livewire\Component;

class Index extends Component
{
    public $search = '';
    public $status = '';

    public function delete($id)
    {
        Car::find($id)->delete();
    }

    public function render()
    {
        $cars = Car::query()
            ->when($this->search, function ($query) {
                $query->where('make', 'like', '%' . $this->search . '%')
                    ->orWhere('model', 'like', '%' . $this->search . '%')
                    ->orWhere('license_plate', 'like', '%' . $this->search . '%');
            })
            ->when($this->status, function ($query) {
                $query->where('status', $this->status);
            })
            ->get();

        return view('livewire.cars.index', [
            'cars' => $cars,
        ]);
    }
}
