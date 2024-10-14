CREATE TYPE "user_with_roles" AS (
  "id" INT,
  "lastname" VARCHAR(255),
  "firstname" VARCHAR(255),
  "email" VARCHAR(255),
  "password" VARCHAR(255),
  "image" VARCHAR(255),
  "roles" VARCHAR(255)[],
  "created_at" TIMESTAMPTZ,
  "updated_at" TIMESTAMPTZ
);

CREATE VIEW "user_with_role" AS
  SELECT
    "user"."id",
    "user"."lastname",
    "user"."firstname",
    "user"."email",
    "user"."password",
    "user"."image",
    CASE
      WHEN COUNT("role"."name") = 0 THEN NULL
      ELSE array_agg("role"."name")
    END AS "roles",
    "user"."created_at",
    "user"."updated_at"
  FROM "user"
  LEFT JOIN "user_role" 
    ON "user"."id" = "user_role"."user_id"
  LEFT JOIN "role" 
    ON "user_role"."role_id" = "role"."id"
  GROUP BY "user"."id"
  ORDER BY "user"."id";