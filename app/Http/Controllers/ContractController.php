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

        $pdf = Pdf::loadView('pdf.contract', [
            'rental' => $rental,
            'terms' => $terms,
        ]);

        return $pdf->download('rental-contract-' . $rental->id . '.pdf');
    }
}
