<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
