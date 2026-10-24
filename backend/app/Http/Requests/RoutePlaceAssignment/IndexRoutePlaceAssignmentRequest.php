<?php

namespace App\Http\Requests\RoutePlaceAssignment;

use Illuminate\Foundation\Http\FormRequest;

class IndexRoutePlaceAssignmentRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'entry_route' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],
            'stay_mode' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],
        ];
    }

    /**
     * Custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'entry_route' => 'entry route',
            'stay_mode'   => 'stay mode',
        ];
    }
}
