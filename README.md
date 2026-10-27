

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


## Api OpenApi doc
You can access api open api doc at  `http://<baseurl>/docs/api`. If `baseurl` is default so: [http://localhost:8000/docs/api](http://localhost:8000/docs/api).

## Creating first **Admin** (IMPORTANT)

**After starting api server**, you can create first admin user by:
1. Calling `/api/auth/register` manually and passing `ADMIN_SECRET_KEY` from `.env` to `secret_key` field.
2. Using prepared script by easily running this commands:
```bash
cd backend
./create_admin.sh
```


## Api Sdk

For generating api sdk and using api functions, after each change in backend codes, run this command in main directory:
```bash
npm run build --workspace api-sdk
```

**IMPORTANT NOTE:** you only need to run this command _if you changed the backend code_.

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


## **Admin** panel

Go to [localhost:3000/admin](http://localhost:3000/admin).


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



