<?php

use App\Http\Controllers\AuthUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

$router->group(['prefix' => 'v1'], function () use ($router) {
    $router->get('/ping', function () use ($router) {
        return 'pong';
    });

    $router->group(['prefix' => 'auth'], function () use ($router) {
        $router->post('/login', [AuthUserController::class, 'login']);
    });
});
