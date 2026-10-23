<?php

use App\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

uses(RefreshDatabase::class);

describe('register', function () {
    it('creates an admin and returns a token', function () {
        $response = $this->postJson('/api/auth/register', [
            'username' => 'newadmin',
            'password' => 'secret-password',
            'password_confirmation' => 'secret-password',
            'secret_key' => 'testing-admin-secret',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.username', 'newadmin')
            ->assertJsonPath('token_type', 'Bearer')
            ->assertJsonStructure(['token', 'expires_in']);

        $admin = Admin::where('username', 'newadmin')->firstOrFail();

        expect($admin->password)->toStartWith('$argon2id$')
            ->and(Hash::check('secret-password', $admin->password))->toBeTrue();
    });

    it('rejects a request with an invalid secret key', function () {
        $this->postJson('/api/auth/register', [
            'username' => 'newadmin',
            'password' => 'secret-password',
            'password_confirmation' => 'secret-password',
            'secret_key' => 'wrong-secret',
        ])->assertInvalid(['secret_key' => 'The provided secret key is invalid.']);

        $this->assertDatabaseMissing('admins', ['username' => 'newadmin']);
    });

    it('rejects a username that is already taken', function () {
        Admin::factory()->create(['username' => 'taken']);

        $this->postJson('/api/auth/register', [
            'username' => 'taken',
            'password' => 'secret-password',
            'password_confirmation' => 'secret-password',
            'secret_key' => 'testing-admin-secret',
        ])->assertInvalid('username');
    });

    it('rejects a request without a matching password confirmation', function () {
        $this->postJson('/api/auth/register', [
            'username' => 'newadmin',
            'password' => 'secret-password',
            'password_confirmation' => 'different-password',
            'secret_key' => 'testing-admin-secret',
        ])->assertInvalid('password');
    });
});

describe('login', function () {
    it('returns a token for valid credentials', function () {
        Admin::factory()->create([
            'username' => 'knownadmin',
            'password' => 'secret-password',
        ]);

        $this->postJson('/api/auth/login', [
            'username' => 'knownadmin',
            'password' => 'secret-password',
        ])->assertOk()
            ->assertJsonPath('data.username', 'knownadmin')
            ->assertJsonStructure(['token', 'token_type', 'expires_in']);
    });

    it('returns 401 for a wrong password', function () {
        Admin::factory()->create([
            'username' => 'knownadmin',
            'password' => 'secret-password',
        ]);

        $this->postJson('/api/auth/login', [
            'username' => 'knownadmin',
            'password' => 'wrong-password',
        ])->assertUnauthorized();
    });

    it('returns 401 for an unknown username', function () {
        $this->postJson('/api/auth/login', [
            'username' => 'missing',
            'password' => 'secret-password',
        ])->assertUnauthorized();
    });
});

describe('reset password', function () {
    it('updates the password and returns a token', function () {
        $admin = Admin::factory()->create([
            'username' => 'knownadmin',
            'password' => 'old-password',
        ]);

        $this->postJson('/api/auth/password/reset', [
            'username' => 'knownadmin',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
            'secret_key' => 'testing-admin-secret',
        ])->assertOk()
            ->assertJsonPath('data.username', 'knownadmin')
            ->assertJsonStructure(['token']);

        expect(Hash::check('new-password', $admin->refresh()->password))->toBeTrue();
    });

    it('rejects a request with an invalid secret key', function () {
        $admin = Admin::factory()->create([
            'username' => 'knownadmin',
            'password' => 'old-password',
        ]);

        $this->postJson('/api/auth/password/reset', [
            'username' => 'knownadmin',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
            'secret_key' => 'wrong-secret',
        ])->assertInvalid(['secret_key' => 'The provided secret key is invalid.']);

        expect(Hash::check('old-password', $admin->refresh()->password))->toBeTrue();
    });

    it('rejects an unknown username', function () {
        $this->postJson('/api/auth/password/reset', [
            'username' => 'missing',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
            'secret_key' => 'testing-admin-secret',
        ])->assertInvalid('username');
    });
});

describe('me', function () {
    it('returns the authenticated admin', function () {
        $admin = Admin::factory()->create(['username' => 'knownadmin']);
        $token = $this->postJson('/api/auth/login', [
            'username' => 'knownadmin',
            'password' => 'password',
        ])->json('token');

        $this->withToken($token)
            ->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('data.id', $admin->id)
            ->assertJsonPath('data.username', 'knownadmin')
            ->assertJsonMissingPath('data.password');
    });

    it('returns 401 without a token', function () {
        $this->getJson('/api/auth/me')->assertUnauthorized();
    });

    it('returns 401 with an invalid token', function () {
        $this->withToken('not-a-real-token')->getJson('/api/auth/me')->assertUnauthorized();
    });

    it('returns 401 for an unauthenticated request that does not expect json', function () {
        $this->get('/api/auth/me', ['Accept' => 'text/html'])->assertUnauthorized();
    });
});
