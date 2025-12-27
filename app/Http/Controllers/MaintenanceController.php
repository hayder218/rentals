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
        $type = $request->input('type', '');

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
            ->when($type, function ($query) use ($type) {
                $query->where('type', $type);
            })
            ->latest()
            ->get();

        return Inertia::render('Maintenances/Index', [
            'maintenances' => $maintenances,
            'cars' => Car::all()->map(function ($car) {
                $car->maintenance_status = $car->getMaintenanceStatus();
                return $car;
            }),
            'filters' => [
                'search' => $search,
                'status' => $status,
                'type' => $type,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Maintenances/Create', [
            'cars' => Car::all(),
            'rules' => \App\Models\MaintenanceRule::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'description' => 'required|string',
            'date' => 'required|date',
            'cost' => 'required|numeric|min:0',
            'status' => 'required|in:scheduled,completed',
            'type' => 'required|in:consumable,repair',
            'subtype' => 'nullable|string',
            'mileage' => 'required|integer|min:0',
        ]);

        $maintenance = Maintenance::create($validated);

        $car = Car::find($validated['car_id']);
        
        // Update car mileage if the maintenance mileage is higher
        if ($validated['mileage'] > $car->current_mileage) {
            $car->update(['current_mileage' => $validated['mileage']]);
        }

        // If maintenance is logged as scheduled, optionally update car status
        if ($validated['status'] === 'scheduled') {
            $car->update(['status' => 'maintenance']);
        }

        return redirect()->route('maintenances.index')->with('success', 'Maintenance record created!');
    }

    public function destroy(Maintenance $maintenance)
    {
        $maintenance->delete();
        return redirect()->back()->with('success', 'Maintenance record deleted!');
    }
}
