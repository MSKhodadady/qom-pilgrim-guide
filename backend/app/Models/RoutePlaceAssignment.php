<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RoutePlaceAssignment extends Model
{
    use HasFactory;

    protected $fillable = ['entry_route_id', 'stay_mode_id', 'place_id', 'role', 'notes', 'address', 'sort_order'];

    protected $casts = ['entry_route_id' => 'integer', 'stay_mode_id' => 'integer', 'place_id' => 'integer', 'sort_order' => 'integer'];

    public function entryRoute(): BelongsTo
    {
        return $this->belongsTo(EntryRoute::class);
    }

    public function stayMode(): BelongsTo
    {
        return $this->belongsTo(StayMode::class);
    }

    public function place(): BelongsTo
    {
        return $this->belongsTo(Place::class);
    }
}
