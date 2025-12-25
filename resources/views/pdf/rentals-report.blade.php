<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Rentals Report - {{ $date }}</title>
    <style>
        body { font-family: sans-serif; font-size: 10px; color: #333; }
        .header { text-align: center; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background-color: #f3f4f6; color: #111; font-weight: bold; border: 1px solid #d1d5db; padding: 8px; text-align: left; }
        td { border: 1px solid #d1d5db; padding: 8px; }
        .footer { margin-top: 20px; text-align: right; font-style: italic; }
        .badge { padding: 2px 6px; border-radius: 4px; font-size: 8px; text-transform: uppercase; font-weight: bold; }
        .badge-active { background-color: #dbeafe; color: #1d4ed8; }
        .badge-completed { background-color: #dcfce7; color: #15803d; }
        .badge-cancelled { background-color: #fee2e2; color: #b91c1c; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Fleewise: Rental Operations Report</h1>
        <p>Generated on: {{ $date }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Revenue</th>
            </tr>
        </thead>
        <tbody>
            @foreach($rentals as $rental)
            <tr>
                <td>#{{ $rental->id }}</td>
                <td>{{ $rental->customer_name }}</td>
                <td>{{ $rental->car->make }} {{ $rental->car->model }}</td>
                <td>{{ $rental->start_date->format('Y-m-d') }}</td>
                <td>{{ $rental->end_date->format('Y-m-d') }}</td>
                <td>
                    <span class="badge badge-{{ $rental->status }}">
                        {{ $rental->status }}
                    </span>
                </td>
                <td>${{ number_format($rental->total_cost, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        <p>Total Revenue: ${{ number_format($rentals->sum('total_cost'), 2) }}</p>
        <p>Internal Operations Document</p>
    </div>
</body>
</html>
