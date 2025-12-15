<?php

namespace App\Livewire\Rentals;

use App\Models\Rental;
use Livewire\Component;

class Index extends Component
{
    public $search = '';
    public $status = '';

    public function render()
    {
        $rentals = Rental::with('car')
            ->when($this->search, function ($query) {
                $query->where('customer_name', 'like', '%' . $this->search . '%')
                    ->orWhereHas('car', function ($q) {
                        $q->where('make', 'like', '%' . $this->search . '%')
                            ->orWhere('model', 'like', '%' . $this->search . '%')
                            ->orWhere('license_plate', 'like', '%' . $this->search . '%');
                    });
            })
            ->when($this->status, function ($query) {
                $query->where('status', $this->status);
            })
            ->latest()
            ->get();

        return view('livewire.rentals.index', [
            'rentals' => $rentals,
        ]);
    }
}
