<?php

namespace App\Http\Requests\RoutePlaceAssignment;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRoutePlaceAssignmentRequest extends FormRequest
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
        $assignment = $this->route('route_place_assignment');

        return [
            'entry_route_id' => ['sometimes', 'required', 'integer', Rule::exists('entry_routes', 'id')],
            'stay_mode_id' => ['sometimes', 'required', 'integer', Rule::exists('stay_modes', 'id')],
            'place_id' => ['sometimes', 'required', 'integer', Rule::exists('places', 'id')],
            'role' => [
                'required',
                'string',
                'max:255',
                Rule::unique('route_place_assignments', 'role')
                    ->where(fn ($query) => $query
                        ->where('entry_route_id', $this->input('entry_route_id', $assignment->entry_route_id))
                        ->where('stay_mode_id', $this->input('stay_mode_id', $assignment->stay_mode_id))
                        ->where('place_id', $this->input('place_id', $assignment->place_id)))
                    ->ignore($assignment),
            ],
            'notes' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],
            'sort_order' => ['sometimes', 'integer', 'min:0'],
        ];
    }

    /**
     * Ensure the role is always present so the composite uniqueness check runs
     * against the assignment's effective values, even on a partial update.
     */
    protected function prepareForValidation(): void
    {
        if (! $this->exists('role')) {
            $this->merge(['role' => $this->route('route_place_assignment')->role]);
        }
    }
}
