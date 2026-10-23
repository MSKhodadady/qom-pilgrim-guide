<?php

namespace App\Http\Requests\Auth;

use App\Rules\AdminSecretKey;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class ResetPasswordRequest extends FormRequest
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
            'username' => ['required', 'string', Rule::exists('admins', 'username')],
            'password' => ['required', 'string', 'confirmed', Password::defaults()],
            'secret_key' => ['required', 'string', new AdminSecretKey],
        ];
    }
}
