<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use Uuid;

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'email_verified_at',
        'mobile_number',
        'mobile_number_verified_at',
        'github_id',
        'github_token',
        'github_refresh_token',
        'google_id',
        'google_token',
        'google_refresh_token',
        'facebook_id',
        'facebook_token',
        'facebook_refresh_token',
        'twitter_id',
        'twitter_token',
        'twitter_refresh_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'id' => 'string',
        'email_verified_at' => 'datetime',
    ];

    public function offers(): HasMany
    {
        return $this->hasMany(Offer::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(PointOfInterest::class);
    }
}
