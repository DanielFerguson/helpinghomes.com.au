<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PointsOfInterestController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::inertia('/', 'home')->name('home');
Route::inertia('/login', 'home')->name('login');

Route::apiResource('offers', OfferController::class);

Route::get('/reports', [ReportController::class, 'store']);

Route::controller(PointsOfInterestController::class)->group(function () {
    Route::get('/points-of-interest', 'index');
    Route::post('/points-of-interest', 'store');
    Route::get('/points-of-interest/{id}', 'show');
    Route::put('/points-of-interest/{id}', 'update');
    Route::delete('/points-of-interest/{id}', 'destroy');
});

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

Route::get('/auth/redirect/github', [AuthController::class, 'redirectGithub']);
Route::get('/auth/redirect/google', [AuthController::class, 'redirectGoogle']);
Route::get('/auth/redirect/facebook', [AuthController::class, 'redirectFacebook']);
Route::get('/auth/redirect/twitter', [AuthController::class, 'redirectTwitter']);

Route::get('/auth/callback/github', [AuthController::class, 'callbackGithub']);
Route::get('/auth/callback/google', [AuthController::class, 'callbackGoogle']);
Route::get('/auth/callback/facebook', [AuthController::class, 'callbackFacebook']);
Route::get('/auth/callback/twitter', [AuthController::class, 'callbackTwitter']);

Route::post('logout', [AuthController::class, 'logout']);
