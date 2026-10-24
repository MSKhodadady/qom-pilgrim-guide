<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('route_place_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('entry_route_id')->constrained('entry_routes')->cascadeOnDelete();
            $table->foreignId('stay_mode_id')->constrained('stay_modes')->cascadeOnDelete();
            $table->foreignId('place_id')->constrained('places')->cascadeOnDelete();
            $table->string('role');
            $table->text('notes')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->unique(['entry_route_id', 'stay_mode_id', 'place_id', 'role'], 'route_place_assignments_unique');
            $table->index(['entry_route_id', 'stay_mode_id', 'role'], 'route_place_assignments_lookup');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('route_place_assignments');
    }
};
