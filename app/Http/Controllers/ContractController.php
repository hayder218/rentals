<?php

namespace App\Http\Controllers;

use App\Models\Rental;
use App\Models\Setting;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    public function download(Rental $rental)
    {
        $terms = Setting::get('contract_terms', 'Standard Terms and Conditions apply.');
        $rental->load('car');

        $logoPath = public_path('logo.png');
        $logoBase64 = '';
        if (file_exists($logoPath)) {
            $logoData = base64_encode(file_get_contents($logoPath));
            $logoBase64 = 'data:image/png;base64,' . $logoData;
        }

        $pdf = Pdf::loadView('pdf.contract', [
            'rental' => $rental,
            'terms' => $terms,
            'logo' => $logoBase64,
        ]);

        return $pdf->download('rental-contract-' . $rental->id . '.pdf');
    }

    public function exportAll()
    {
        $rentals = Rental::with('car')->get();
        
        $pdf = Pdf::loadView('pdf.rentals-report', [
            'rentals' => $rentals,
            'date' => now()->format('Y-m-d H:i'),
        ]);

        return $pdf->download('rentals-report-' . now()->format('Y-m-d') . '.pdf');
    }
}
