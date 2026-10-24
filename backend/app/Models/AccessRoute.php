<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccessRoute extends Model
{
    use HasFactory;

    protected $fillable = ['entry_route_id', 'stay_mode_id', 'destination_place_id', 'route_description', 'sort_order'];

    protected $casts = ['entry_route_id' => 'integer', 'stay_mode_id' => 'integer', 'destination_place_id' => 'integer', 'sort_order' => 'integer'];

    public function entryRoute(): BelongsTo
    {
        return $this->belongsTo(EntryRoute::class);
    }

    public function stayMode(): BelongsTo
    {
        return $this->belongsTo(StayMode::class);
    }

    public function destinationPlace(): BelongsTo
    {
        return $this->belongsTo(Place::class, 'destination_place_id');
    }
}
