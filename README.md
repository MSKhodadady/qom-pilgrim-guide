

# Bootstrap and develop project

## Backend

### `.env` file
1. `cp .env.example .env`
1. filling required value in `.env`:

```
APP_KEY=
JWT_SECRET=
ADMIN_SECRET_KEY=
```

**Note:** values that you might need to change:
```
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=
```


### Database

1. `php artisan migrate`
1. `sqlite3 database/database.sqlite < seed_qom.sql`


### Run

`php artisan serve`


## Api Sdk

For generating api sdk and using api functions, after each change in backend codes, run this command in main directory:
```bash
npm run build --workspace api-sdk
```

## Frontend

### Development

After running backend, run frontend for development using this command:
```bash
npm run dev --workspace frontend
```

Or you can run both backend and frontend _just for developing frontend_ by this command:
```bash
npm run dev-front
```


# Build project and run in production

## Backend

Create `.env` file as said above, except this one:
```
APP_DEBUG=false
```

## frontend

Run:
```sh
npm run build --workspace frontend

npm run start --workspace frontend
```



