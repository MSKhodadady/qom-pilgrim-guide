<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class AdminSecretKey implements ValidationRule
{
    /**
     * Determine whether the given value matches the configured admin secret.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $secret = (string) config('auth.admin_secret_key');

        if ($secret === '' || ! is_string($value) || ! hash_equals($secret, $value)) {
            $fail('The provided secret key is invalid.');
        }
    }
}
