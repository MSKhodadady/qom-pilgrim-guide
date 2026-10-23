<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Models\Admin;
use App\Services\JwtService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct(private JwtService $jwt) {}

    /**
     * Register a new admin and return a token for the new account.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $admin = Admin::create($request->safe()->only(['username', 'password']));

        return $this->tokenResponse($admin, 201);
    }

    /**
     * Authenticate an admin and return a token.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $admin = Admin::where('username', $request->validated('username'))->first();

        if ($admin === null || ! Hash::check($request->validated('password'), $admin->password)) {
            throw new AuthenticationException('Invalid credentials.');
        }

        return $this->tokenResponse($admin);
    }

    /**
     * Reset an admin's password and return a fresh token.
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $admin = Admin::where('username', $request->validated('username'))->firstOrFail();

        $admin->update($request->safe()->only(['password']));

        return $this->tokenResponse($admin);
    }

    /**
     * Return the currently authenticated admin.
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json(['data' => $request->user()]);
    }

    /**
     * Build the standard token response for an admin.
     */
    private function tokenResponse(Admin $admin, int $status = 200): JsonResponse
    {
        return response()->json([
            'data' => $admin,
            'token' => $this->jwt->issue($admin),
            'token_type' => 'Bearer',
            'expires_in' => $this->jwt->ttl() * 60,
        ], $status);
    }
}
