# points-list

## API
The API was built using the Django Rest Framework. https://www.django-rest-framework.org/

Poetry was used to create a virtual environment for the python side: https://python-poetry.org/

Start a shell & install the dependencies:
```shell
> cd points-list/api
> poetry shell
> poetry install
```

If needed, run migrations:
```shell
> python manage.py migrate
```

Create an `.env` file from `.env.example`:
```shell
> cd points-list/api/app
> cp .env.example .env
```
Fill in the database connection data, secret key, debug variables.

To generate a token for the .env `SECRET_KEY`:
```shell
> python -c "import secrets; print(secrets.token_urlsafe(128))"
```

Start the dev server:
```shell
> python manage.py runserver
```

## WWW
Create a .env from the .env.example:
```shell
> cd points-list/www
> cp .env.example .env
```
Update the base URL as needed.

Install node_modules:
```shell
> cd points-list/www
> yarn install
```

Run dev server:
```shell
> yarn run dev
```

## DB
Django requires `psycopg2` the poetry dependencies include the binary build, but this is not recommended for production.

Assume a PostgresQL DB with the following table:
```sql
CREATE TABLE point (
id SERIAL PRIMARY KEY,
name text NOT NULL,
x integer NOT NULL,
y integer NOT NULL
);
```
