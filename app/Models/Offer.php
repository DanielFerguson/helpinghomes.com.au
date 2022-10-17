<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Offer extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'lat',
        'lng',
        'type',
        'notes',
        'canTakePets',
        'canTakeSingles',
        'canTakeCouples',
        'canTakeFamilies',
        'assistanceType',
    ];
}
