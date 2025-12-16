<?php

namespace App\Livewire;

use App\Models\Setting;
use Livewire\Component;

class Settings extends Component
{
    public $contractTerms;

    public function mount()
    {
        $this->contractTerms = Setting::get('contract_terms', 'Standard Terms and Conditions...');
    }

    public function save()
    {
        Setting::set('contract_terms', $this->contractTerms);

        // Flash message using standard session flash
        session()->flash('status', 'Settings saved successfully!');
    }

    public function render()
    {
        return view('livewire.settings');
    }
}
