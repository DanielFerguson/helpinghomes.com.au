<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOfferRequest;
use App\Http\Requests\UpdateOfferRequest;
use App\Models\Offer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

// TODO: Protect create, edit, delete route with middleware

class OfferController extends Controller
{
    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth')->except('index');
    }

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
                'coordinates' => [$offer->lng, $offer->lat],
            ],
            'properties' => [
                'userId' => $offer->user_id,
                'offerType' => $offer->type,
                'notes' => $offer->notes,
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreOfferRequest $request): RedirectResponse
    {
        Offer::create($request->validated());

        return Redirect::route('home');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Offer  $offer
     * @return \Illuminate\Http\RedirectResponse
     */
    public function show(Offer $offer): RedirectResponse
    {
        // TODO

        return Redirect::route('home');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateOfferRequest  $request
     * @param  \App\Models\Offer  $offer
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateOfferRequest $request, Offer $offer): RedirectResponse
    {
        if (!Auth::user()->can('update', $offer)) {
            return response()->back();
        }

        $offer->update($request->validated());

        return Redirect::route('home');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Offer  $offer
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Offer $offer): RedirectResponse
    {
        if (!Auth::user()->can('delete', $offer)) {
            return response()->back();
        }

        $offer->delete();

        return Redirect::route('home');
    }
}
