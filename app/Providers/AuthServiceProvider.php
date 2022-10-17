<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Offer;
use App\Models\PointOfInterest;
use App\Policies\OfferPolicy;
use App\Policies\PointOfInterestPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        PointOfInterest::class => PointOfInterestPolicy::class,
        Offer::class => OfferPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
