<?php

namespace App\Livewire;

use App\Models\Car;
use App\Models\Rental;
use App\Models\Maintenance;
use Livewire\Component;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class Dashboard extends Component
{
    public function render()
    {
        // Fleet Status
        $total_cars = Car::count();
        $available_cars = Car::where('status', 'available')->count();
        $rented_cars = Car::where('status', 'rented')->count();
        $maintenance_cars = Car::where('status', 'maintenance')->count();

        // Active Rentals (returning today)
        $active_rentals = Rental::where('status', 'active')->count();
        $returning_today = Rental::where('status', 'active')
            ->whereDate('end_date', Carbon::today())
            ->count();

        // In Maintenance (critical repair - placeholder logic)
        $in_maintenance = $maintenance_cars;
        $critical_repair = 0; // Placeholder

        // Revenue (Week)
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();

        $revenue_week = Rental::whereBetween('end_date', [$startOfWeek, $endOfWeek])
            ->where('status', 'completed')
            ->sum('total_cost');

        $last_week_revenue = Rental::whereBetween('end_date', [$startOfWeek->copy()->subWeek(), $endOfWeek->copy()->subWeek()])
            ->where('status', 'completed')
            ->sum('total_cost');

        $revenue_growth = $last_week_revenue > 0 ? (($revenue_week - $last_week_revenue) / $last_week_revenue) * 100 : 0;

        // Weekly Revenue Chart Data
        $weekly_revenue_data = [];
        for ($i = 0; $i < 7; $i++) {
            $date = $startOfWeek->copy()->addDays($i);
            $daily_revenue = Rental::whereDate('end_date', $date)
                ->where('status', 'completed')
                ->sum('total_cost');
            $weekly_revenue_data[] = $daily_revenue;
        }

        // Recent Maintenance
        $recent_maintenance = Maintenance::with('car')->latest()->take(3)->get();

        return view('livewire.dashboard', [
            'total_cars' => $total_cars,
            'available_cars' => $available_cars,
            'rented_cars' => $rented_cars,
            'maintenance_cars' => $maintenance_cars,
            'active_rentals' => $active_rentals,
            'returning_today' => $returning_today,
            'in_maintenance' => $in_maintenance,
            'critical_repair' => $critical_repair,
            'revenue_week' => $revenue_week,
            'revenue_growth' => $revenue_growth,
            'weekly_revenue_data' => $weekly_revenue_data,
            'recent_maintenance' => $recent_maintenance,
            'rentals' => Rental::with('car')->latest()->get(),
        ]);
    }
}
