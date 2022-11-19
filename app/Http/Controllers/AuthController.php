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

        $user = User::where('email', $githubUser->email)->first();

        if ($user === null) {
            $user = User::create([
                'name' => $githubUser->name,
                'email' => $githubUser->email,
                'github_id' => $githubUser->id,
                'github_token' => $githubUser->token,
            ]);
        } else {
            $user->github_id = $githubUser->id;
            $user->github_token = $githubUser->token;
            $user->save();
        }

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

        $user = User::where('email', $googleUser->email)->first();

        if ($user === null) {
            $user = User::create([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'google_id' => $googleUser->id,
                'google_token' => $googleUser->token,
            ]);
        } else {
            $user->google_id = $googleUser->id;
            $user->google_token = $googleUser->token;
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
            ]);
        } else {
            $user->facebook_id = $facebookUser->id;
            $user->facebook_token = $facebookUser->token;
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
