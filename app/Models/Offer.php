<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'location_id',
        'type',
        'notes',
        'duration',
        'capacity',
        'canTakePets',
        'assistanceType',
    ];

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }
}
