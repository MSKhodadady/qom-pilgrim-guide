<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EntryRoute extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'sort_order'];

    protected $casts = ['sort_order' => 'integer'];

    public function assignments(): HasMany
    {
        return $this->hasMany(RoutePlaceAssignment::class);
    }

    public function accessRoutes(): HasMany
    {
        return $this->hasMany(AccessRoute::class);
    }
}
