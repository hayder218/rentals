<?php

namespace App\Http\Controllers;

use App\Models\Rental;
use App\Models\Maintenance;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Reports/Index');
    }

    public function fetchData(Request $request)
    {
        $startDate = $request->input('start_date', Carbon::now()->subDays(30)->toDateString());
        $endDate = $request->input('end_date', Carbon::now()->toDateString());

        $revenueData = Rental::whereBetween('end_date', [$startDate, $endDate])
            ->where('status', 'completed')
            ->selectRaw('DATE(end_date) as date, SUM(total_cost) as total')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->pluck('total', 'date');

        $maintenanceData = Maintenance::whereBetween('date', [$startDate, $endDate])
            ->selectRaw('DATE(date) as date, SUM(cost) as total')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->pluck('total', 'date');

        // Merge dates for the chart
        $allDates = collect($revenueData->keys())
            ->merge($maintenanceData->keys())
            ->unique()
            ->sort();

        $chartData = $allDates->map(function ($date) use ($revenueData, $maintenanceData) {
            return [
                'date' => Carbon::parse($date)->format('M d'),
                'revenue' => (float) ($revenueData[$date] ?? 0),
                'maintenance' => (float) ($maintenanceData[$date] ?? 0),
            ];
        })->values();

        $summary = [
            'total_revenue' => (float) $revenueData->sum(),
            'total_maintenance' => (float) $maintenanceData->sum(),
            'net_profit' => (float) ($revenueData->sum() - $maintenanceData->sum()),
        ];

        return response()->json([
            'chartData' => $chartData,
            'summary' => $summary,
        ]);
    }

    public function download(Request $request)
    {
        $startDate = $request->input('start_date', Carbon::now()->subDays(30)->toDateString());
        $endDate = $request->input('end_date', Carbon::now()->toDateString());

        $rentals = Rental::with('car')
            ->whereBetween('end_date', [$startDate, $endDate])
            ->where('status', 'completed')
            ->get();

        $maintenances = Maintenance::with('car')
            ->whereBetween('date', [$startDate, $endDate])
            ->get();

        $data = [
            'startDate' => $startDate,
            'endDate' => $endDate,
            'rentals' => $rentals,
            'maintenances' => $maintenances,
            'totalRevenue' => $rentals->sum('total_cost'),
            'totalMaintenance' => $maintenances->sum('cost'),
            'date' => Carbon::now()->format('Y-m-d H:i'),
        ];

        $pdf = Pdf::loadView('pdf.financial-report', $data);
        return $pdf->download("financial-report-{$startDate}-to-{$endDate}.pdf");
    }
}
