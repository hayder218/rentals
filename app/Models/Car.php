<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MaintenanceRule;
use App\Models\Maintenance;
use App\Models\Rental;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'make',
        'model',
        'year',
        'license_plate',
        'status',
        'daily_rate',
        'current_mileage',
    ];

    protected $casts = [
        'daily_rate' => 'decimal:2',
    ];

    public function rentals()
    {
        return $this->hasMany(Rental::class);
    }

    public function activeRentals()
    {
        return $this->hasMany(Rental::class)->whereIn('status', ['active', 'completed']);
    }

    public function maintenances()
    {
        return $this->hasMany(Maintenance::class);
    }

    public function getMaintenanceStatus()
    {
        $rules = MaintenanceRule::all();
        $status = [];

        foreach ($rules as $rule) {
            $lastService = $this->maintenances()
                ->where('subtype', $rule->subtype)
                ->where('status', 'completed')
                ->latest('mileage')
                ->first();

            $lastServiceMileage = $lastService ? $lastService->mileage : 0;
            $nextDueAt = $lastServiceMileage + $rule->interval_mileage;
            $remaining = $nextDueAt - $this->current_mileage;

            $condition = 'ok';
            if ($remaining <= 0) {
                $condition = 'overdue';
            } elseif ($remaining <= ($rule->interval_mileage * 0.1)) { // 10% remaining
                $condition = 'due_soon';
            }

            $status[] = [
                'subtype' => $rule->subtype,
                'label' => $rule->label,
                'last_mileage' => $lastServiceMileage,
                'next_due_mileage' => $nextDueAt,
                'remaining_mileage' => $remaining,
                'status' => $condition
            ];
        }

        return $status;
    }
}
