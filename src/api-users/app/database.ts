import { Pool } from "pg";
import debug from "debug";

const log = debug("app:api-users");

// Configurer la connexion avec PostgreSQL
const pool = new Pool();

async function connect() {
  try {
    await pool.connect();
    log("Connexion à la base de données réussie !");
    // const result = await pool.query(
    //   `SELECT * FROM "user_with_role" WHERE "id" = 1`
    // );
    // log("réponse :", result.rows);
  } catch (err) {
    log("Erreur de connexion à la base de données :", err);
  }
}

connect();

export default pool;
