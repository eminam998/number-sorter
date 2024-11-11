<?php

use App\Http\Controllers\NumbersController;
use Illuminate\Support\Facades\Route;

Route::get('/numbers', [NumbersController::class, 'index']); // To display form
Route::post('/sort-numbers', [NumbersController::class, 'sortNumbers']); // For sorting
Route::get('/frequent-numbers', [NumbersController::class, 'frequentNumbers']); // Optional: for frequently used numbers
