BEGIN;

-- Création d'un utilisateur à partir d'un json
CREATE FUNCTION "create_user"(json) RETURNS "user" AS $$
  INSERT INTO "user" ("lastname", "firstname", "email", "password", "image")
    VALUES ( 
      $1->>'lastname', 
      COALESCE($1->>'firstname', null),
      $1->>'email', 
      $1->>'password', 
      COALESCE($1->>'image', null)
    )
    RETURNING *;
$$ LANGUAGE sql STRICT;

-- Mise à jour d'un utilisateur à partir d'un json
CREATE FUNCTION "update_user"(json) RETURNS "user" AS $$
  UPDATE "user" SET
    "lastname" = $1->>'lastname',
    "firstname" = COALESCE($1->>'firstname', "firstname"),
    "email" = $1->>'email',
    "password" = COALESCE($1->>'password', "password"),
    "image" = COALESCE($1->>'image', "image"),
    "updated_at" = now()
  WHERE id = ($1->>'id')::int
  RETURNING *;
$$ LANGUAGE sql STRICT;

-- Création d'un rôle à partir d'un json
CREATE FUNCTION "create_role"(json) RETURNS "role" AS $$
  INSERT INTO "role" ("name")
  VALUES ( 
    $1->>'name'
  )
  RETURNING *;
$$ LANGUAGE sql STRICT;

-- Mise à jour d'un rôle à partir d'un json
CREATE FUNCTION "update_role"(json) RETURNS "role" AS $$
UPDATE "role" SET
  "name" = $1->>'name',
  "updated_at" = now()
  WHERE "id" = ($1->>'id')::int
  RETURNING *;
$$ LANGUAGE sql STRICT;

COMMIT;