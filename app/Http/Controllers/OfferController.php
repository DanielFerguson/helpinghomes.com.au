<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOfferRequest;
use App\Http\Requests\UpdateOfferRequest;
use App\Models\Offer;
use Illuminate\Http\JsonResponse;

class OfferController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $offers = Offer::all()->map(fn ($offer) => [
            'type' => 'Feature',
            'geometry' => [
                'type' => 'Point',
                'coordinates' => [$offer->lat, $offer->lng],
            ],
            'properties' => [
                'userId' => $offer->user_id,
                'offerType' => $offer->type,
                'notes' => $offer->notes,
                'duration' => $offer->duration,
                'canTakePets' => $offer->canTakePets,
                'assistanceType' => $offer->assistanceType,
                'capacity' => $offer->capacity,
            ],
        ]);

        return response()->json([
            'type' => 'FeatureCollection',
            'features' => $offers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreOfferRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreOfferRequest $request): JsonResponse
    {
        // TODO

        return response()->json();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Offer  $offer
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Offer $offer): JsonResponse
    {
        // TODO

        return response()->json();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateOfferRequest  $request
     * @param  \App\Models\Offer  $offer
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateOfferRequest $request, Offer $offer): JsonResponse
    {
        // TODO

        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Offer  $offer
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Offer $offer): JsonResponse
    {
        // TODO

        return response()->json();
    }
}
