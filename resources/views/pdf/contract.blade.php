<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Rental Contract #{{ $rental->id }}</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
            line-height: 1.4;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .section {
            margin-bottom: 20px;
        }
        .section-title {
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 5px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 3px;
        }
        .row {
            margin-bottom: 5px;
        }
        .label {
            font-weight: bold;
            display: inline-block;
            width: 150px;
        }
        .terms {
            margin-top: 20px;
            border-top: 2px solid #000;
            padding-top: 10px;
            text-align: justify;
            font-size: 10px;
        }
        .signatures {
            margin-top: 50px;
        }
        .signature-box {
            float: left;
            width: 45%;
            height: 100px;
            border-top: 1px solid #000;
            padding-top: 10px;
        }
        .clearfix::after {
            content: "";
            clear: both;
            display: table;
        }
    </style>
</head>
<body>
    <div class="header">
        @if($logo)
            <img src="{{ $logo }}" style="width: 200px; height: auto;">
        @endif
        <h1>RENTAL AGREEMENT</h1>
        <p>Contract #{{ $rental->id }}</p>
    </div>

    <div class="section">
        <div class="section-title">CUSTOMER DETAILS</div>
        <div class="row">
            <span class="label">Full Name:</span> {{ $rental->customer_name }}
        </div>
        <div class="row">
            <span class="label">ID/License Number:</span> {{ $rental->customer_identification ?? 'N/A' }}
        </div>
    </div>

    <div class="section">
        <div class="section-title">VEHICLE DETAILS</div>
        <div class="row">
            <span class="label">Make & Model:</span> {{ $rental->car->make }} {{ $rental->car->model }}
        </div>
        <div class="row">
            <span class="label">Year:</span> {{ $rental->car->year }}
        </div>
        <div class="row">
            <span class="label">License Plate:</span> {{ $rental->car->license_plate }}
        </div>
    </div>

    <div class="section">
        <div class="section-title">RENTAL DETAILS</div>
        <div class="row">
            <span class="label">Start Date:</span> {{ $rental->start_date->format('Y-m-d') }}
        </div>
        <div class="row">
            <span class="label">End Date:</span> {{ $rental->end_date->format('Y-m-d') }}
        </div>
        <div class="row">
            <span class="label">Total Cost:</span> ${{ number_format($rental->total_cost, 2) }}
        </div>
        <div class="row">
            <span class="label">Prepaid Amount:</span> ${{ number_format($rental->prepaid_amount, 2) }}
        </div>
        <div class="row">
            <span class="label">Balance Due:</span> ${{ number_format(max(0, $rental->total_cost - $rental->prepaid_amount), 2) }}
        </div>
    </div>

    <div class="section terms">
        <div class="section-title">CONDITIONS OF USE</div>
        <div>
            {!! nl2br(e($terms)) !!}
        </div>
    </div>

    <div class="signatures clearfix">
        <div class="signature-box">
            Owner Signature & Date
        </div>
        <div class="signature-box" style="float: right;">
            Customer Signature & Date
        </div>
    </div>
</body>
</html>
