BEGIN;

CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "lastname" VARCHAR(255) NOT NULL,
  "firstname" VARCHAR(255),
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "image" VARCHAR(255),
  "created_at" TIMESTAMPTZ NOT NULL default(now()),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "role" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL UNIQUE,
  "created_at" TIMESTAMPTZ NOT NULL default(now()),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_role" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "role_id" INT NOT NULL REFERENCES "role"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL default(now()),
  "updated_at" TIMESTAMPTZ
);

COMMIT;