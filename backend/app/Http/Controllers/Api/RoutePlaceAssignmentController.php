<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoutePlaceAssignment\StoreRoutePlaceAssignmentRequest;
use App\Http\Requests\RoutePlaceAssignment\UpdateRoutePlaceAssignmentRequest;
use App\Models\RoutePlaceAssignment;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoutePlaceAssignmentController extends Controller
{
    /**
     * The relations shown alongside an assignment, limited to the fields the
     * client needs to render a label for each linked record.
     *
     * @var list<string>
     */
    private const RELATIONS = [
        'entryRoute:id,name,slug',
        'stayMode:id,name,slug',
        'place:id,name,description',
    ];

    /**
     * List the route place assignments, optionally filtered by entry route
     * and stay mode. Each filter accepts either an id or a slug.
     */
    public function index(Request $request): JsonResponse
    {
        $assignments = RoutePlaceAssignment::query()
            ->with(self::RELATIONS)
            ->when(
                $request->filled('entry_route'),
                fn(Builder $query) => $query->whereHas(
                    'entryRoute',
                    fn(Builder $related) => $related->where(
                        fn(Builder $group) => $group->where(
                            'slug',
                            $request->input('entry_route')
                        )->orWhere('id', $request->input('entry_route')),
                    )
                ),
            )
            ->when(
                $request->filled('stay_mode'),
                fn(Builder $query) => $query->whereHas(
                    'stayMode',
                    fn(Builder $related) => $related->where(
                        fn(Builder $group) => $group->where(
                            'slug',
                            $request->input('stay_mode')
                        )->orWhere('id', $request->input('stay_mode')),
                    )
                ),
            )
            ->orderBy('entry_route_id')
            ->orderBy('stay_mode_id')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return response()->json(['data' => $assignments]);
    }

    /**
     * Create a new route place assignment.
     */
    public function store(StoreRoutePlaceAssignmentRequest $request): JsonResponse
    {
        $assignment = RoutePlaceAssignment::create(
            $request->safe()->only([
                'entry_route_id',
                'stay_mode_id',
                'place_id',
                'role',
                'notes',
                'address',
                'sort_order',
            ]),
        );

        return response()->json(['data' => $assignment], 201);
    }

    /**
     * Show a single route place assignment with its linked records.
     */
    public function show(RoutePlaceAssignment $routePlaceAssignment): JsonResponse
    {
        $routePlaceAssignment->load(self::RELATIONS);

        return response()->json(['data' => $routePlaceAssignment]);
    }

    /**
     * Update an existing route place assignment.
     */
    public function update(
        UpdateRoutePlaceAssignmentRequest $request,
        RoutePlaceAssignment $routePlaceAssignment,
    ): JsonResponse {
        $routePlaceAssignment->update(
            $request->safe()->only([
                'entry_route_id',
                'stay_mode_id',
                'place_id',
                'role',
                'notes',
                'address',
                'sort_order',
            ]),
        );

        return response()->json(['data' => $routePlaceAssignment]);
    }

    /**
     * Delete a route place assignment.
     */
    public function destroy(RoutePlaceAssignment $routePlaceAssignment): JsonResponse
    {
        $routePlaceAssignment->delete();

        return response()->json(null, 204);
    }
}
