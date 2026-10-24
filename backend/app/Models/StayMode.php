<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StayMode extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug'];

    public function assignments(): HasMany
    {
        return $this->hasMany(RoutePlaceAssignment::class);
    }
}
