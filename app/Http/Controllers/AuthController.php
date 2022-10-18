<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function redirectGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function callbackGoogle(): RedirectResponse
    {
        $googleUser = Socialite::driver('google')->user();

        $user = User::where('email', $googleUser->email)->first();

        if ($user === null) {
            $user = User::create([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'google_id' => $googleUser->id,
                'google_token' => $googleUser->token,
                'google_refresh_token' => $googleUser->refresh_token,
            ]);
        } else {
            $user->google_id = $googleUser->id;
            $user->google_token = $googleUser->token;
            $user->google_refresh_token = $googleUser->refresh_token;
            $user->save();
        }

        Auth::login($user, true);

        return redirect('/');
    }

    public function redirectFacebook(): RedirectResponse
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function callbackFacebook(): RedirectResponse
    {
        $facebookUser = Socialite::driver('facebook')->user();

        $user = User::where('email', $facebookUser->email)->first();

        if ($user === null) {
            $user = User::create([
                'name' => $facebookUser->name,
                'email' => $facebookUser->email,
                'facebook_id' => $facebookUser->id,
                'facebook_token' => $facebookUser->token,
                'facebook_refresh_token' => $facebookUser->refresh_token,
            ]);
        } else {
            $user->facebook_id = $facebookUser->id;
            $user->facebook_token = $facebookUser->token;
            $user->facebook_refresh_token = $facebookUser->refresh_token;
            $user->save();
        }

        Auth::login($user, true);

        return redirect('/');
    }

    public function redirectTwitter(): RedirectResponse
    {
        return Socialite::driver('twitter-oauth-2')->redirect();
    }

    public function callbackTwitter(): RedirectResponse
    {
        $twitterUser = Socialite::driver('twitter-oauth-2')->user();

        $user = User::where('email', $twitterUser->email)->first();

        if ($user === null) {
            $user = User::create([
                'name' => $twitterUser->name,
                'email' => $twitterUser->email,
                'twitter_id' => $twitterUser->id,
                'twitter_token' => $twitterUser->token,
            ]);
        } else {
            $user->twitter_id = $twitterUser->id;
            $user->twitter_token = $twitterUser->token;
            $user->save();
        }

        Auth::login($user, true);

        return redirect('/');
    }

    public function logout(): RedirectResponse
    {
        Auth::logout();

        return redirect('/');
    }
}
