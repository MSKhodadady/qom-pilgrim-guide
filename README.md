

# install and running


## backend

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


### database

1. `php artisan migrate`
1. `sqlite3 database/database.sqlite < seed_qom.sql`


### running

`php artisan serve`

