<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EntryRoute\StoreEntryRouteRequest;
use App\Http\Requests\EntryRoute\UpdateEntryRouteRequest;
use App\Models\EntryRoute;
use Illuminate\Http\JsonResponse;

class EntryRouteController extends Controller
{
    /**
     * List the entry routes ordered by their configured display order.
     */
    public function index(): JsonResponse
    {
        $entryRoutes = EntryRoute::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return response()->json(['data' => $entryRoutes]);
    }

    /**
     * Create a new entry route.
     */
    public function store(StoreEntryRouteRequest $request): JsonResponse
    {
        $entryRoute = EntryRoute::create($request->safe()->only(['name', 'slug', 'sort_order']));

        return response()->json(['data' => $entryRoute], 201);
    }

    /**
     * Show a single entry route.
     */
    public function show(EntryRoute $entryRoute): JsonResponse
    {
        return response()->json(['data' => $entryRoute]);
    }

    /**
     * Update an existing entry route.
     */
    public function update(UpdateEntryRouteRequest $request, EntryRoute $entryRoute): JsonResponse
    {
        $entryRoute->update($request->safe()->only(['name', 'slug', 'sort_order']));

        return response()->json(['data' => $entryRoute]);
    }

    /**
     * Delete an entry route.
     */
    public function destroy(EntryRoute $entryRoute): JsonResponse
    {
        $entryRoute->delete();

        return response()->json(null, 204);
    }
}
