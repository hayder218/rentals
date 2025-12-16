<?php

namespace App\Livewire\Rentals;

use App\Models\Rental;
use App\Models\Car;
use Livewire\Component;

class Edit extends Component
{
    public Rental $rental;
    public $status;
    public $customer_identification;
    public $prepaid_amount;

    public function mount(Rental $rental)
    {
        $this->rental = $rental;
        $this->status = $rental->status;
        $this->customer_identification = $rental->customer_identification;
        $this->prepaid_amount = $rental->prepaid_amount;
    }

    public function update()
    {
        $this->validate([
            'status' => 'required|in:active,completed,cancelled',
            'customer_identification' => 'required|string|max:255',
            'prepaid_amount' => 'required|numeric|min:0',
        ]);

        $oldStatus = $this->rental->status;
        $newStatus = $this->status;

        $this->rental->update([
            'status' => $newStatus,
            'customer_identification' => $this->customer_identification,
            'prepaid_amount' => $this->prepaid_amount,
        ]);

        if ($oldStatus === 'active' && in_array($newStatus, ['completed', 'cancelled'])) {
            $this->rental->car->update(['status' => 'available']);
        } elseif (in_array($oldStatus, ['completed', 'cancelled']) && $newStatus === 'active') {
            $this->rental->car->update(['status' => 'rented']);
        }

        return redirect()->route('rentals.index');
    }

    public function render()
    {
        return view('livewire.rentals.edit');
    }
}
