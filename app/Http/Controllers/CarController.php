<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $status = $request->input('status', '');

        $cars = Car::query()
            ->when($search, function ($query) use ($search) {
                $query->where('make', 'like', '%' . $search . '%')
                    ->orWhere('model', 'like', '%' . $search . '%')
                    ->orWhere('license_plate', 'like', '%' . $search . '%');
            })
            ->when($status, function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->latest()
            ->get();

        return Inertia::render('Cars/Index', [
            'cars' => $cars,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:2100',
            'license_plate' => 'required|string|unique:cars,license_plate',
            'status' => 'required|in:available,rented,maintenance',
            'daily_rate' => 'required|numeric|min:0',
        ]);

        Car::create($validated);

        return redirect()->route('cars.index')->with('success', 'Car created successfully!');
    }

    public function update(Request $request, Car $car)
    {
        $validated = $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:2100',
            'license_plate' => 'required|string|unique:cars,license_plate,' . $car->id,
            'status' => 'required|in:available,rented,maintenance',
            'daily_rate' => 'required|numeric|min:0',
        ]);

        $car->update($validated);
        return redirect()->route('cars.index')->with('success', 'Car updated successfully!');
    }

    public function edit(Car $car)
    {
        return Inertia::render('Cars/Edit', [
            'car' => $car,
        ]);
    }

    public function destroy(Car $car)
    {
        $car->delete();
        return redirect()->back()->with('success', 'Car deleted successfully!');
    }
}
