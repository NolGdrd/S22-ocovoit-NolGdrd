-- ajout du role membre à tout utilisateur inséré
CREATE FUNCTION "assign_default_role"() RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO user_role (user_id, role_id)
    VALUES (NEW.id, (SELECT id FROM role WHERE name = 'member'));
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "trigger_assign_default_role"
AFTER INSERT ON "user"
FOR EACH ROW
EXECUTE FUNCTION "assign_default_role"();