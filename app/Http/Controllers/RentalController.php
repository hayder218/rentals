<?php

namespace App\Http\Controllers;

use App\Models\Rental;
use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RentalController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $status = $request->input('status', '');

        $rentals = Rental::with('car')
            ->when($search, function ($query) use ($search) {
                $query->where('customer_name', 'like', '%' . $search . '%')
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

        return Inertia::render('Rentals/Index', [
            'rentals' => $rentals,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Rentals/Create', [
            'cars' => Car::with('activeRentals')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'customer_name' => 'required|string|max:255',
            'customer_identification' => 'required|string|max:255',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'prepaid_amount' => 'required|numeric|min:0',
        ]);

        $car = Car::find($validated['car_id']);
        $start = \Carbon\Carbon::parse($validated['start_date']);
        $end = \Carbon\Carbon::parse($validated['end_date']);
        $days = $start->diffInDays($end);
        
        $validated['total_cost'] = $days * $car->daily_rate;
        $validated['status'] = 'active';

        Rental::create($validated);

        $car->update(['status' => 'rented']);

        return redirect()->route('rentals.index');
    }

    public function edit(Rental $rental)
    {
        return Inertia::render('Rentals/Edit', [
            'rental' => $rental->load('car'),
            'cars' => Car::with('activeRentals')->get(),
        ]);
    }

    public function update(Request $request, Rental $rental)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'customer_name' => 'required|string|max:255',
            'customer_identification' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'prepaid_amount' => 'required|numeric|min:0',
            'status' => 'required|in:active,completed,cancelled',
        ]);

        $car = Car::find($validated['car_id']);
        $start = \Carbon\Carbon::parse($validated['start_date']);
        $end = \Carbon\Carbon::parse($validated['end_date']);
        $days = $start->diffInDays($end);
        
        $validated['total_cost'] = $days * $car->daily_rate;

        // Handle status changes for car availability
        if ($rental->status !== $validated['status']) {
            if ($validated['status'] === 'completed' || $validated['status'] === 'cancelled') {
                $car->update(['status' => 'available']);
            } elseif ($validated['status'] === 'active') {
                $car->update(['status' => 'rented']);
            }
        }

        $rental->update($validated);

        return redirect()->route('rentals.index');
    }

}
