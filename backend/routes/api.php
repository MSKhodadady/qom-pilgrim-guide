<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EntryRouteController;
use App\Http\Controllers\Api\PlaceController;
use App\Http\Controllers\Api\RoutePlaceAssignmentController;
use App\Http\Controllers\Api\StayModeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return 'HEllo world!';
});

Route::prefix('auth')->group(function () {
    Route::middleware('throttle:auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    });

    Route::middleware('auth:admin')->get('/me', [AuthController::class, 'me']);
});

Route::apiResource('entry-routes', EntryRouteController::class)
    ->middlewareFor(['store', 'update', 'destroy'], 'auth:admin');
Route::apiResource('stay-modes', StayModeController::class)
    ->middlewareFor(['store', 'update', 'destroy'], 'auth:admin');
Route::apiResource('places', PlaceController::class)
    ->middlewareFor(['store', 'update', 'destroy'], 'auth:admin');
Route::apiResource('route-place-assignments', RoutePlaceAssignmentController::class)
    ->middlewareFor(['store', 'update', 'destroy'], 'auth:admin');
