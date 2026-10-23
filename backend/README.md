# Backend API

This directory contains the Laravel API backend. It does not include frontend assets, web routes, or authentication scaffolding.

## Development

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

API routes belong in `routes/api.php` and are served under the `/api` prefix. The framework health endpoint is available at `/up`.

## Admin authentication

Admin accounts live in the `admins` table and passwords are hashed with Argon2id. The API issues JSON Web Tokens signed with `HS256`; send the token as `Authorization: Bearer <token>`.

Set the following values in `.env` before starting the server:

```dotenv
JWT_SECRET=                 # long random string, required
JWT_ALGORITHM=HS256
JWT_ISSUER="${APP_NAME}"
JWT_TTL=60                  # token lifetime in minutes
JWT_LEEWAY=0                # clock skew tolerance in seconds

ADMIN_SECRET_KEY=           # shared secret that stands in for phone/email verification
```

Because admins have no phone or email verification, `ADMIN_SECRET_KEY` is a shared secret required by the registration and password reset endpoints. Requests must send it as `secret_key`.

| Method | Endpoint | Body | Auth |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | `username`, `password`, `password_confirmation`, `secret_key` | none |
| `POST` | `/api/auth/login` | `username`, `password` | none |
| `POST` | `/api/auth/password/reset` | `username`, `password`, `password_confirmation`, `secret_key` | none |
| `GET` | `/api/auth/me` | – | bearer token |

Each successful call returns `data` (the admin), `token`, `token_type`, and `expires_in` (seconds). Register and the credential endpoints are rate limited to 10 requests per minute per username and IP address.
