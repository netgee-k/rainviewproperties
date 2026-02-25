<?php

use App\Http\Controllers\ListingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// ── Public ────────────────────────────────────────────────────────────────────
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// ── Auth required ─────────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Listings CRUD (Sellers + Admins)
    Route::middleware(['role:Seller|Admin'])->group(function () {
        Route::resource('listings', ListingController::class);
    });

});

require __DIR__ . '/settings.php';
