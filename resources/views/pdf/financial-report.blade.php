<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Financial Report</title>
    <style>
        body { font-family: sans-serif; font-size: 11px; color: #333; line-height: 1.5; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        .section-title { font-size: 14px; font-weight: bold; margin-top: 20px; margin-bottom: 10px; color: #1e40af; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { background-color: #f8fafc; color: #475569; font-weight: bold; border: 1px solid #e2e8f0; padding: 10px; text-align: left; text-transform: uppercase; font-size: 9px; }
        td { border: 1px solid #e2e8f0; padding: 10px; vertical-align: top; }
        .summary-box { background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .summary-item { display: inline-block; width: 32%; text-align: center; }
        .summary-label { display: block; color: #64748b; font-size: 10px; text-transform: uppercase; margin-bottom: 5px; }
        .summary-value { display: block; font-size: 16px; font-weight: bold; }
        .text-green { color: #16a34a; }
        .text-red { color: #dc2626; }
        .footer { position: fixed; bottom: 0; width: 100%; text-align: center; font-size: 9px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0; color: #2563eb;">FLEETWISE</h1>
        <p style="margin: 5px 0;">Financial Performance Report</p>
        <p style="margin: 0; font-size: 10px; color: #64748b;">Period: {{ $startDate }} to {{ $endDate }}</p>
    </div>

    <div class="summary-box">
        <div class="summary-item">
            <span class="summary-label">Total Revenue</span>
            <span class="summary-value text-green">${{ number_format($totalRevenue, 2) }}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Maintenance Costs</span>
            <span class="summary-value text-red">-${{ number_format($totalMaintenance, 2) }}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Net Performance</span>
            <span class="summary-value">${{ number_format($totalRevenue - $totalMaintenance, 2) }}</span>
        </div>
    </div>

    <div class="section-title">Revenue Details (Completed Rentals)</div>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Revenue</th>
            </tr>
        </thead>
        <tbody>
            @foreach($rentals as $rental)
            <tr>
                <td>{{ $rental->end_date->format('Y-m-d') }}</td>
                <td>{{ $rental->customer_name }}</td>
                <td>{{ $rental->car->make }} {{ $rental->car->model }}</td>
                <td class="text-green">${{ number_format($rental->total_cost, 2) }}</td>
            </tr>
            @endforeach
            @if($rentals->isEmpty())
            <tr><td colspan="4" style="text-align: center;">No revenue records for this period.</td></tr>
            @endif
        </tbody>
    </table>

    <div class="section-title">Maintenance Cost Details</div>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Vehicle</th>
                <th>Description</th>
                <th>Cost</th>
            </tr>
        </thead>
        <tbody>
            @foreach($maintenances as $maintenance)
            <tr>
                <td>{{ $maintenance->date->format('Y-m-d') }}</td>
                <td>{{ $maintenance->car->make }} {{ $maintenance->car->model }}</td>
                <td>{{ $maintenance->description }}</td>
                <td class="text-red">-${{ number_format($maintenance->cost, 2) }}</td>
            </tr>
            @endforeach
            @if($maintenances->isEmpty())
            <tr><td colspan="4" style="text-align: center;">No maintenance records for this period.</td></tr>
            @endif
        </tbody>
    </table>

    <div class="footer">
        Generated on {{ $date }} | FleetWise Management System Internal Document
    </div>
</body>
</html>
