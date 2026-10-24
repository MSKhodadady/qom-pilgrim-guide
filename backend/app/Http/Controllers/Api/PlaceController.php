<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Place\StorePlaceRequest;
use App\Http\Requests\Place\UpdatePlaceRequest;
use App\Models\Place;
use Illuminate\Http\JsonResponse;

class PlaceController extends Controller
{
    /**
     * List the places in a stable order.
     */
    public function index(): JsonResponse
    {
        $places = Place::query()
            ->orderBy('name')
            ->orderBy('id')
            ->get();

        return response()->json(['data' => $places]);
    }

    /**
     * Create a new place.
     */
    public function store(StorePlaceRequest $request): JsonResponse
    {
        $place = Place::create($request->safe()->only(['name', 'description']));

        return response()->json(['data' => $place], 201);
    }

    /**
     * Show a single place.
     */
    public function show(Place $place): JsonResponse
    {
        return response()->json(['data' => $place]);
    }

    /**
     * Update an existing place.
     */
    public function update(UpdatePlaceRequest $request, Place $place): JsonResponse
    {
        $place->update($request->safe()->only(['name', 'description']));

        return response()->json(['data' => $place]);
    }

    /**
     * Delete a place.
     */
    public function destroy(Place $place): JsonResponse
    {
        $place->delete();

        return response()->json(null, 204);
    }
}
