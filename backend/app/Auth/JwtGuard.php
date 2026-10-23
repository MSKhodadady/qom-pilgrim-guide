<?php

namespace App\Auth;

use App\Services\JwtService;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Http\Request;

class JwtGuard implements Guard
{
    use GuardHelpers;

    public function __construct(
        UserProvider $provider,
        private Request $request,
        private JwtService $jwt,
    ) {
        $this->provider = $provider;
    }

    /**
     * Get the currently authenticated admin.
     */
    public function user(): ?Authenticatable
    {
        if (! is_null($this->user)) {
            return $this->user;
        }

        return $this->user = $this->jwt->resolveAdmin($this->request->bearerToken());
    }

    /**
     * Validate an admin's credentials against a raw token.
     *
     * @param  array<string, mixed>  $credentials
     */
    public function validate(#[\SensitiveParameter] array $credentials = []): bool
    {
        $token = $credentials['token'] ?? null;

        return is_string($token) && $this->jwt->resolveAdmin($token) !== null;
    }

    /**
     * Set the request instance used to read the bearer token.
     */
    public function setRequest(Request $request): static
    {
        $this->request = $request;

        return $this;
    }
}
