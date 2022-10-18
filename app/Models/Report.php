<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'reason',
        'reportable_id',
        'reportable_type',
    ];

    /**
     * Get the parent reportable model (offer or point-of-interest).
     */
    public function reportable(): MorphTo
    {
        return $this->morphTo();
    }
}
