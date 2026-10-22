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
