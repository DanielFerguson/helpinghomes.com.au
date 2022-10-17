<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePointOfInterestRequest;
use App\Http\Requests\UpdatePointOfInterestRequest;
use App\Models\PointOfInterest;
use Illuminate\Http\JsonResponse;

class PointsOfInterestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $features = PointOfInterest::all()->map(function ($feature) {
            return [
                'type' => 'Feature',
                'geometry' => [
                    'type' => 'Point',
                    'coordinates' => [$feature->lng, $feature->lat],
                ],
                'properties' => [
                    'name' => $feature->name,
                    'type' => $feature->type,
                ],
            ];
        });

        return response()->json([
            'type' => 'FeatureCollection',
            'features' => $features,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePointOfInterestRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StorePointOfInterestRequest $request): JsonResponse
    {
        PointOfInterest::create($request->validated());

        return response()->json();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PointOfInterest  $pointOfInterest
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(PointOfInterest $pointOfInterest): JsonResponse
    {
        // TODO

        return response()->json();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePointOfInterestRequest  $request
     * @param  \App\Models\PointOfInterest  $pointOfInterest
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdatePointOfInterestRequest $request, PointOfInterest $pointOfInterest): JsonResponse
    {
        // TODO

        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PointOfInterest  $pointOfInterest
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(PointOfInterest $pointOfInterest): JsonResponse
    {
        // TODO

        return response()->json();
    }
}
