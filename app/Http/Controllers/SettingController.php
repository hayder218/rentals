<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Settings', [
            'contractTerms' => Setting::get('contract_terms', 'Standard Terms and Conditions...'),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'contract_terms' => 'required|string',
        ]);

        Setting::set('contract_terms', $request->contract_terms);

        return redirect()->back()->with('status', 'Settings saved successfully!');
    }
}
