<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PointOfInterestController;
use App\Http\Controllers\VerifyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::inertia('/', 'home')->name('home');

Route::view('/about', 'about');

Route::post('/offers/{offer}/report', [OfferController::class, 'report']);
Route::post('/points-of-interest/{pointOfInterest}/report', [PointOfInterestController::class, 'report']);
Route::apiResources([
    'offers' => OfferController::class,
    'points-of-interest' => PointOfInterestController::class,
]);

Route::post('/verify', [VerifyController::class, 'store']);
Route::post('/verify-code', [VerifyController::class, 'verify']);

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

Route::inertia('/login', 'home')->name('login');

Route::get('/auth/redirect/google', [AuthController::class, 'redirectGoogle']);
Route::get('/auth/redirect/facebook', [AuthController::class, 'redirectFacebook']);
Route::get('/auth/redirect/twitter', [AuthController::class, 'redirectTwitter']);

Route::get('/auth/callback/google', [AuthController::class, 'callbackGoogle']);
Route::get('/auth/callback/facebook', [AuthController::class, 'callbackFacebook']);
Route::get('/auth/callback/twitter', [AuthController::class, 'callbackTwitter']);

Route::post('logout', [AuthController::class, 'logout']);
