<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompareVerificationNumberRequest;
use App\Http\Requests\ResetVerificationMobileNumberRequest;
use App\Http\Requests\StoreMobileNumberRequest;
use App\Notifications\VerificationPinRequested;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class VerifyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except('index');
    }

    public function store(StoreMobileNumberRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // Save/update the users mobile number.
        Auth::user()->mobile_number = $validated['mobile_number'];

        // Generate and save a code to the database.
        Auth::user()->verify_code = (string) rand(1231, 7879);
        Auth::user()->verify_code_created_at = now();
        Auth::user()->save();

        // Send them the verification pin.
        Auth::user()->notify(new VerificationPinRequested());

        return Redirect::route('home');
    }

    public function verify(CompareVerificationNumberRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        if (Auth::user()->verify_code === $validated['verification_code']) {
            Auth::user()->mobile_number_verified_at = now();
            Auth::user()->save();
        }

        return Redirect::route('home');
    }

    public function reset(): RedirectResponse
    {
        Auth::user()->mobile_number = null;
        Auth::user()->verify_code = null;
        Auth::user()->mobile_number_verified_at = null;
        Auth::user()->save();

        return Redirect::route('home');
    }
}
