<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'suburb',
        'urbanArea',
        'postcode',
        'state',
        'stateName',
        'type',
        'localGovernmentArea',
        'lat',
        'lng',
        'timezone',
    ];

    public function offers(): HasMany
    {
        return $this->hasMany(Offer::class);
    }
}
