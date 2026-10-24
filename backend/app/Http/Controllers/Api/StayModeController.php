<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StayMode\StoreStayModeRequest;
use App\Http\Requests\StayMode\UpdateStayModeRequest;
use App\Models\StayMode;
use Illuminate\Http\JsonResponse;

class StayModeController extends Controller
{
    /**
     * List the stay modes in a stable order.
     */
    public function index(): JsonResponse
    {
        $stayModes = StayMode::query()
            ->orderBy('id')
            ->orderBy('name')
            ->get();

        return response()->json(['data' => $stayModes]);
    }

    /**
     * Create a new stay mode.
     */
    public function store(StoreStayModeRequest $request): JsonResponse
    {
        $stayMode = StayMode::create($request->safe()->only(['name', 'slug']));

        return response()->json(['data' => $stayMode], 201);
    }

    /**
     * Show a single stay mode.
     */
    public function show(StayMode $stayMode): JsonResponse
    {
        return response()->json(['data' => $stayMode]);
    }

    /**
     * Update an existing stay mode.
     */
    public function update(UpdateStayModeRequest $request, StayMode $stayMode): JsonResponse
    {
        $stayMode->update($request->safe()->only(['name', 'slug']));

        return response()->json(['data' => $stayMode]);
    }

    /**
     * Delete a stay mode.
     */
    public function destroy(StayMode $stayMode): JsonResponse
    {
        $stayMode->delete();

        return response()->json(null, 204);
    }
}
