<?php

namespace App\Livewire\Maintenances;

use App\Models\Maintenance;
use Livewire\Component;

class Index extends Component
{
    public $search = '';
    public $status = '';

    public function render()
    {
        $maintenances = Maintenance::with('car')
            ->when($this->search, function ($query) {
                $query->where('description', 'like', '%' . $this->search . '%')
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

        return view('livewire.maintenances.index', [
            'maintenances' => $maintenances,
        ]);
    }
}
