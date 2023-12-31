<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return response([
        'status' => true,
        'message' => 'Welcome to Nukerduit Service API',
    ], 200);
});

Route::get('/unauthenticated', function () {
    return response([
        'status' => false,
        'message' => 'Unauthenticated',
    ], 401);
})->name('unauthenticated');
