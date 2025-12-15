<?php

namespace App\Livewire\Rentals;

use App\Models\Rental;
use App\Models\Car;
use Livewire\Component;

class Edit extends Component
{
    public Rental $rental;
    public $status;

    public function mount(Rental $rental)
    {
        $this->rental = $rental;
        $this->status = $rental->status;
    }

    public function update()
    {
        $this->validate([
            'status' => 'required|in:active,completed,cancelled',
        ]);

        $oldStatus = $this->rental->status;
        $newStatus = $this->status;

        $this->rental->update([
            'status' => $newStatus,
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
