<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('access_routes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('entry_route_id')->constrained('entry_routes')->cascadeOnDelete();
            $table->foreignId('stay_mode_id')->constrained('stay_modes')->cascadeOnDelete();
            $table->foreignId('destination_place_id')->constrained('places')->cascadeOnDelete();
            $table->text('route_description');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->unique(['entry_route_id', 'stay_mode_id'], 'access_routes_entry_stay_unique');
            $table->index(['stay_mode_id', 'sort_order'], 'access_routes_mode_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('access_routes');
    }
};
