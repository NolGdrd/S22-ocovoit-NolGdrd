BEGIN;
INSERT INTO "role" ("name") VALUES 
  ('admin'), 
  ('moderator'), 
  ('member');

INSERT INTO "user" ("lastname", "firstname", "email", "password", "image") VALUES
  ('Doe', 'John', 'john.doe@example.com', 'hashedpassword1', 'john-image.png'),
  ('Smith', 'Jane', 'jane.smith@example.com', 'hashedpassword2', 'jane-image.png'),
  ('Brown', 'Charlie', 'charlie.brown@example.com', 'hashedpassword3', 'charlie-image.png');

INSERT INTO "user_role" ("user_id", "role_id") VALUES
  (1, 1),
  (1, 2),
  (2, 2);


COMMIT;