<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePointOfInterestReportRequest;
use App\Http\Requests\StorePointOfInterestRequest;
use App\Http\Requests\UpdatePointOfInterestRequest;
use App\Models\PointOfInterest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class PointOfInterestController extends Controller
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
        $features = PointOfInterest::all()->map(function ($feature) {
            return [
                'type' => 'Feature',
                'geometry' => [
                    'type' => 'Point',
                    'coordinates' => [$feature->lng, $feature->lat],
                ],
                'properties' => [
                    'id' => $feature->id,
                    'name' => $feature->name,
                    'type' => $feature->type,
                    'lat' => $feature->lat,
                    'lng' => $feature->lng,
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
     * @return \Illuminate\Http\Response
     */
    public function store(StorePointOfInterestRequest $request)
    {
        PointOfInterest::create($request->validated());

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePointOfInterestRequest  $request
     * @param  \App\Models\PointOfInterest  $pointOfInterest
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePointOfInterestRequest $request, PointOfInterest $pointOfInterest): RedirectResponse
    {
        $pointOfInterest->update($request->validated());

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(int $id): RedirectResponse
    {
        $pointOfInterest = PointOfInterest::find($id);
        $pointOfInterest->delete();

        return Redirect::route('home');
    }

    /**
     * Create a report on an point of interest.
     *
     * @param  \App\Http\Requests\StorePointOfInterestReportRequest  $request
     * @param  \App\Models\PointOfInterest  $pointOfInterest
     * @return \Illuminate\Http\RedirectResponse
     */
    public function report(StorePointOfInterestReportRequest $request, PointOfInterest $pointOfInterest): RedirectResponse
    {
        $validated = $request->safe();

        $pointOfInterest->reports()->create([
            'user_id' => Auth::id(),
            'reason' => $validated['reason'],
        ]);

        return Redirect::route('home');
    }
}
