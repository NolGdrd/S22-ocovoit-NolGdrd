import client from "../database";

interface RoleData {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Role {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(data: RoleData) {
    this.id = data.id;
    this.name = data.name;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Récupérer tous les utilisateurs
  static async findAll(): Promise<Role[]> {
    const result = await client.query('SELECT * FROM "role"');
    return result.rows.map(row => new Role(row));
  }

  // Récupérer un utilisateur par ID
  static async findById(id: number): Promise<Role | null> {
    const preparedQuery = {
      text: 'SELECT * FROM "role" WHERE id = $1',
      values: [id],
    };
    const result = await client.query(preparedQuery);
    if (result.rows.length) {
      return new Role(result.rows[0]);
    } else {
      return null;
    }
  }

  // Créer ou mettre à jour un role
  async save(): Promise<void> {
    if (this.id) {
      // Mise à jour si le role existe déjà
      const preparedQuery = {
        text: 'SELECT * FROM "update_role"($1)',
        values: [JSON.stringify(this)],
      };
      const result = await client.query(preparedQuery);
      Object.assign(this, result.rows[0]);
    } else {
      // Création d'un nouveau role
      const preparedQuery = {
        text: 'SELECT * FROM "create_role"($1)',
        values: [JSON.stringify(this)],
      };
      const result = await client.query(preparedQuery);
      Object.assign(this, result.rows[0]);
    }
  }
  // Supprimer un utilisateur
  static async deleteById(id: number): Promise<boolean> {
    const result = await client.query('DELETE FROM "role" WHERE id = $1', [id]);
    return !!result.rowCount;
  }
}
