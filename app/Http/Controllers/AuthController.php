<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function redirectGithub(): RedirectResponse
    {
        return Socialite::driver('github')->redirect();
    }

    public function callbackGithub(): RedirectResponse
    {
        $githubUser = Socialite::driver('github')->user();

        $user = User::updateOrCreate([
            'github_id' => $githubUser->id,
        ], [
            'name' => $githubUser->name,
            'email' => $githubUser->email,
            'github_token' => $githubUser->token,
            'github_refresh_token' => $githubUser->refreshToken,
        ]);

        Auth::login($user, true);

        return redirect('/');
    }

    public function redirectGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function callbackGoogle(): RedirectResponse
    {
        $googleUser = Socialite::driver('google')->user();

        $user = User::updateOrCreate([
            'google_id' => $googleUser->id,
        ], [
            'name' => $googleUser->name,
            'email' => $googleUser->email,
            'google_token' => $googleUser->token,
            'google_refresh_token' => $googleUser->refreshToken,
        ]);

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

        $user = User::updateOrCreate([
            'facebook_id' => $facebookUser->id,
        ], [
            'name' => $facebookUser->name,
            'email' => $facebookUser->email,
            'facebook_token' => $facebookUser->token,
            'facebook_refresh_token' => $facebookUser->refreshToken,
        ]);

        Auth::login($user, true);

        return redirect('/');
    }

    public function redirectTwitter(): RedirectResponse
    {
        return Socialite::driver('twitter')->redirect();
    }

    public function callbackTwitter(): RedirectResponse
    {
        $twitterUser = Socialite::driver('twitter')->user();

        $user = User::updateOrCreate([
            'twitter_id' => $twitterUser->id,
        ], [
            'name' => $twitterUser->name,
            'email' => $twitterUser->email,
            'twitter_token' => $twitterUser->token,
            'twitter_refresh_token' => $twitterUser->refreshToken,
        ]);

        Auth::login($user, true);

        return redirect('/');
    }

    public function logout(): RedirectResponse
    {
        Auth::logout();

        return redirect('/');
    }
}
