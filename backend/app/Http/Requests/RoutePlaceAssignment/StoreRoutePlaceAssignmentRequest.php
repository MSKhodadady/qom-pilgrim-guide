<?php

namespace App\Http\Requests\RoutePlaceAssignment;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRoutePlaceAssignmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'entry_route_id' => ['required', 'integer', Rule::exists('entry_routes', 'id')],
            'stay_mode_id' => ['required', 'integer', Rule::exists('stay_modes', 'id')],
            'place_id' => ['required', 'integer', Rule::exists('places', 'id')],
            'role' => [
                'required',
                'string',
                'max:255',
                Rule::unique('route_place_assignments', 'role')
                    ->where(fn ($query) => $query
                        ->where('entry_route_id', $this->integer('entry_route_id'))
                        ->where('stay_mode_id', $this->integer('stay_mode_id'))
                        ->where('place_id', $this->integer('place_id'))),
            ],
            'notes' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],
            'sort_order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
