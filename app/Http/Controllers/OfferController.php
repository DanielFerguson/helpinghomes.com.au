<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOfferReportRequest;
use App\Http\Requests\StoreOfferRequest;
use App\Http\Requests\UpdateOfferRequest;
use App\Jobs\MessageOffererAfterCall;
use App\Models\Call;
use App\Models\ContactDetailRequest;
use App\Models\Offer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

// TODO: Protect create, edit, delete route with middleware

class OfferController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except('index');
    }

    public function index(): JsonResponse
    {
        $offers = Offer::all()->map(fn ($offer) => [
            'type' => 'Feature',
            'geometry' => [
                'type' => 'Point',
                'coordinates' => [$offer->lng, $offer->lat],
            ],
            'properties' => [
                'id' => $offer->id,
                'userId' => $offer->user_id,
                'offerType' => $offer->type,
                'notes' => $offer->notes,
                'canTakePets' => $offer->canTakePets,
                'canTakeSingles' => $offer->canTakeSingles,
                'canTakeCouples' => $offer->canTakeCouples,
                'canTakeFamilies' => $offer->canTakeFamilies,
                'assistanceType' => $offer->assistanceType,
            ],
        ]);

        return response()->json([
            'type' => 'FeatureCollection',
            'features' => $offers,
        ]);
    }

    public function store(StoreOfferRequest $request): RedirectResponse
    {
        Offer::create($request->validated());

        return Redirect::route('home');
    }

    public function show(Offer $offer): JsonResponse
    {
        ContactDetailRequest::create([
            'user_id' => Auth::user()->id,
            'offer_id' => $offer->id,
        ]);

        return response()->json([
            'phone_number' => $offer->user->mobile_number,
        ]);
    }

    public function update(UpdateOfferRequest $request, Offer $offer): RedirectResponse
    {
        if (!Auth::user()->can('update', $offer)) {
            abort(403);
        }

        $offer->update($request->validated());

        return Redirect::route('home');
    }

    public function destroy(Offer $offer): RedirectResponse
    {
        if (!Auth::user()->can('delete', $offer)) {
            abort(403);
        }

        $offer->delete();

        return Redirect::route('home');
    }

    public function report(StoreOfferReportRequest $request, Offer $offer): RedirectResponse
    {
        $validated = $request->safe();

        $offer->reports()->create([
            'user_id' => Auth::id(),
            'reason' => $validated['reason'],
        ]);

        return Redirect::route('home');
    }

    public function called(Request $request, Offer $offer): RedirectResponse
    {
        Call::create([
            'caller_id' => $request->user()->id,
            'offer_id' => $offer->id
        ]);

        $delay = App::isProduction() ? 15 : 1;

        MessageOffererAfterCall::dispatch($offer)
            ->delay(now()->addMinutes($delay));

        return Redirect::route('home');
    }
}
