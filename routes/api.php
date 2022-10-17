<?php

use App\Http\Controllers\OfferController;
use App\Models\PointOfInterest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// TODO: Add caching to this route
Route::get('points-of-interest', function () {
    $features = PointOfInterest::all()->map(function ($feature) {
        return [
            'type' => 'Feature',
            'geometry' => [
                'type' => 'Point',
                'coordinates' => [$feature->lng, $feature->lat]
            ],
            'properties' => [
                'name' => $feature->name,
                'type' => $feature->type,
            ]
        ];
    });

    return response()->json([
        'type' => 'FeatureCollection',
        'features' => $features
    ]);
});

// TODO: Protect create, edit, delete route with middleware
Route::apiResource('offers', OfferController::class);
