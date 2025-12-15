<?php

use Illuminate\Support\Facades\Route;
use App\Livewire\Cars\Index as CarsIndex;
use App\Livewire\Cars\Create as CarsCreate;
use App\Livewire\Cars\Edit as CarsEdit;

use App\Livewire\Dashboard;

Route::get('/', Dashboard::class)->name('dashboard');

Route::get('/cars', CarsIndex::class)->name('cars.index');
Route::get('/cars/create', CarsCreate::class)->name('cars.create');
Route::get('/cars/{car}/edit', CarsEdit::class)->name('cars.edit');

use App\Livewire\Rentals\Index as RentalsIndex;
use App\Livewire\Rentals\Create as RentalsCreate;
use App\Livewire\Rentals\Edit as RentalsEdit;

Route::get('/rentals', RentalsIndex::class)->name('rentals.index');
Route::get('/rentals/create', RentalsCreate::class)->name('rentals.create');
Route::get('/rentals/{rental}/edit', RentalsEdit::class)->name('rentals.edit');

use App\Livewire\Maintenances\Index as MaintenancesIndex;
use App\Livewire\Maintenances\Create as MaintenancesCreate;

Route::get('/maintenances', MaintenancesIndex::class)->name('maintenances.index');
Route::get('/maintenances/create', MaintenancesCreate::class)->name('maintenances.create');
