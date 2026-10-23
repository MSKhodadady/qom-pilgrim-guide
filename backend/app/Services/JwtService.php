<?php

namespace App\Services;

use App\Models\Admin;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Contracts\Auth\Authenticatable;
use InvalidArgumentException;
use RuntimeException;
use UnexpectedValueException;

class JwtService
{
    /**
     * Issue a signed token for the given admin.
     */
    public function issue(Authenticatable $admin): string
    {
        $now = now();

        $payload = [
            'iss' => config('jwt.issuer'),
            'sub' => (string) $admin->getAuthIdentifier(),
            'iat' => $now->getTimestamp(),
            'exp' => $now->addMinutes($this->ttl())->getTimestamp(),
        ];

        return JWT::encode($payload, $this->secret(), $this->algorithm());
    }

    /**
     * Decode a token and return its claims, or null when it is not valid.
     *
     * @return array<string, mixed>|null
     */
    public function decode(string $token): ?array
    {
        JWT::$leeway = (int) config('jwt.leeway');

        try {
            $claims = (array) JWT::decode($token, new Key($this->secret(), $this->algorithm()));
        } catch (UnexpectedValueException|InvalidArgumentException) {
            return null;
        }

        if (($claims['iss'] ?? null) !== config('jwt.issuer')) {
            return null;
        }

        return $claims;
    }

    /**
     * Resolve the admin identified by the given token, or null when the token
     * is missing, malformed, expired, or points to an admin that no longer exists.
     */
    public function resolveAdmin(?string $token): ?Admin
    {
        if ($token === null || $token === '') {
            return null;
        }

        $claims = $this->decode($token);

        if ($claims === null || ! isset($claims['sub'])) {
            return null;
        }

        return Admin::find($claims['sub']);
    }

    /**
     * The token lifetime in minutes.
     */
    public function ttl(): int
    {
        return (int) config('jwt.ttl');
    }

    private function secret(): string
    {
        $secret = config('jwt.secret');

        if (blank($secret)) {
            throw new RuntimeException('The JWT_SECRET environment variable is not set.');
        }

        return $secret;
    }

    private function algorithm(): string
    {
        return config('jwt.algorithm');
    }
}
