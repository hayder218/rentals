<?php

namespace App\Http\Controllers;

use App\Models\Maintenance;
use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaintenanceController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $status = $request->input('status', '');

        $maintenances = Maintenance::with('car')
            ->when($search, function ($query) use ($search) {
                $query->where('description', 'like', '%' . $search . '%')
                    ->orWhereHas('car', function ($q) use ($search) {
                        $q->where('make', 'like', '%' . $search . '%')
                            ->orWhere('model', 'like', '%' . $search . '%')
                            ->orWhere('license_plate', 'like', '%' . $search . '%');
                    });
            })
            ->when($status, function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->latest()
            ->get();

        return Inertia::render('Maintenances/Index', [
            'maintenances' => $maintenances,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Maintenances/Create', [
            'cars' => Car::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'description' => 'required|string',
            'date' => 'required|date',
            'cost' => 'required|numeric|min:0',
            'status' => 'required|in:pending,completed',
        ]);

        Maintenance::create($validated);

        // If maintenance is logged, optionally update car status
        if ($validated['status'] === 'pending') {
            Car::find($validated['car_id'])->update(['status' => 'maintenance']);
        }

        return redirect()->route('maintenances.index')->with('success', 'Maintenance record created!');
    }

    public function destroy(Maintenance $maintenance)
    {
        $maintenance->delete();
        return redirect()->back()->with('success', 'Maintenance record deleted!');
    }
}
