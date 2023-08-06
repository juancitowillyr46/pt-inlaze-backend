CREATE DATABASE db_cocktails;

-- MICROSERVICE 1

-- TABLE: Roles
CREATE TABLE public.roles (
    id SERIAL NOT NULL PRIMARY KEY,
    name character varying(250),
    is_deleted boolean,
    created_at date,
    updated_at date
);

-- TABLE: Usuarios
CREATE TABLE public.users (
    id SERIAL NOT NULL PRIMARY KEY,
    fullname character varying(250),
    email character varying(250),
    password character varying(250),
    phone character varying(250),
    role_id integer REFERENCES roles(id) ON DELETE CASCADE,
    is_deleted boolean,
    created_at date,
    updated_at date
);

-- MICROSERVICE 2

-- TABLE: Cocteles
CREATE TABLE public.cocktails (
    id SERIAL NOT NULL PRIMARY KEY,
    name character varying(250),
    instructions character varying(250),
    additional_notes character varying(250),
    is_deleted boolean,
    created_at date,
    updated_at date
);

-- TABLE: Ingredientes
CREATE TABLE public.ingredients (
    id SERIAL NOT NULL PRIMARY KEY,
    name character varying(250),
    is_deleted boolean,
    created_at date,
    updated_at date
);

-- TABLE: Ingredientes a Cocteles
CREATE TABLE public.cocktails_ingredients (
    cocktail_id integer REFERENCES cocktails(id) ON DELETE CASCADE,
    ingredient_id integer REFERENCES ingredients(id) ON DELETE CASCADE
);