<?php

use Illuminate\Support\Facades\Route;
use App\Livewire\Cars\Index as CarsIndex;
use App\Livewire\Cars\Create as CarsCreate;
use App\Livewire\Cars\Edit as CarsEdit;

use App\Http\Controllers\DashboardController;

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

use App\Http\Controllers\CarController;

Route::get('/cars', [CarController::class, 'index'])->name('cars.index');
Route::get('/cars/create', [CarController::class, 'create'])->name('cars.create');
Route::post('/cars', [CarController::class, 'store'])->name('cars.store');
Route::get('/cars/{car}/edit', [CarController::class, 'edit'])->name('cars.edit');
Route::put('/cars/{car}', [CarController::class, 'update'])->name('cars.update');
Route::delete('/cars/{car}', [CarController::class, 'destroy'])->name('cars.destroy');

use App\Http\Controllers\RentalController;

Route::get('/rentals', [RentalController::class, 'index'])->name('rentals.index');
Route::get('/rentals/create', [RentalController::class, 'create'])->name('rentals.create');
Route::post('/rentals', [RentalController::class, 'store'])->name('rentals.store');
Route::get('/rentals/{rental}/edit', [RentalController::class, 'edit'])->name('rentals.edit');
Route::put('/rentals/{rental}', [RentalController::class, 'update'])->name('rentals.update');
Route::delete('/rentals/{rental}', [RentalController::class, 'destroy'])->name('rentals.destroy');

use App\Http\Controllers\MaintenanceController;

Route::get('/maintenances', [MaintenanceController::class, 'index'])->name('maintenances.index');
Route::get('/maintenances/create', [MaintenanceController::class, 'create'])->name('maintenances.create');
Route::post('/maintenances', [MaintenanceController::class, 'store'])->name('maintenances.store');
Route::delete('/maintenances/{maintenance}', [MaintenanceController::class, 'destroy'])->name('maintenances.destroy');

use App\Http\Controllers\SettingController;
Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
Route::put('/settings', [SettingController::class, 'update'])->name('settings.update');

use App\Http\Controllers\ContractController;
Route::get('/rentals/{rental}/contract', [ContractController::class, 'download'])->name('rentals.contract');
