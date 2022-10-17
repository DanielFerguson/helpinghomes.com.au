<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function redirectApple()
    {
        return Socialite::driver('apple')->redirect();
    }

    // TODO
    public function callbackApple()
    {
        $appleUser = Socialite::driver('apple')->user();

        $user = User::updateOrCreate([
            'apple_id' => $appleUser->id,
        ], [
            'name' => $appleUser->name,
            'email' => $appleUser->email,
            'apple_token' => $appleUser->token,
            'apple_refresh_token' => $appleUser->refreshToken,
        ]);

        Auth::login($user);

        return redirect('/');
    }

    public function redirectGithub()
    {
        return Socialite::driver('github')->redirect();
    }

    public function callbackGithub()
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

        Auth::login($user);

        return redirect('/');
    }

    public function redirectGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callbackGoogle()
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

        Auth::login($user);

        return redirect('/');
    }

    public function redirectFacebook()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function callbackFacebook()
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

        Auth::login($user);

        return redirect('/');
    }

    public function redirectTwitter()
    {
        return Socialite::driver('twitter')->redirect();
    }

    public function callbackTwitter()
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

        Auth::login($user);

        return redirect('/');
    }

    public function logout()
    {
        Auth::logout();

        return redirect('/');
    }
}
