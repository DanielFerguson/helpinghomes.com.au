<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PointsOfInterestController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('offers', OfferController::class);
Route::apiResource('points-of-interest', PointsOfInterestController::class);
