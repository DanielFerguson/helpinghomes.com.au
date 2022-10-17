<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
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

    /**
     * Get the offers user.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all of the offers's contact requests.
     */
    public function contactDetailRequests(): HasMany
    {
        return $this->hasMany(ContactDetailRequest::class);
    }

    /**
     * Get all of the offers reports.
     */
    public function reports()
    {
        return $this->morphMany(Report::class, 'reportable');
    }
}
