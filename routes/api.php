<?php

use App\Http\Controllers\OfferController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// TODO: Protect create, edit, delete route with middleware
Route::apiResource('offers', OfferController::class);
