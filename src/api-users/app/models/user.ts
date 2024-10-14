import client from "../database";

interface UserData {
  id?: number;
  lastname: string;
  firstname?: string;
  email: string;
  password: string;
  image?: string;
  roles?: string[];
  created_at?: Date;
  updated_at?: Date;
}

interface findAllData {
  lastname?: string;
  firstname?: string;
  email?: string;
}

export class User {
  id?: number;
  lastname: string;
  firstname?: string;
  email: string;
  password: string;
  image?: string;
  roles?: string[];
  created_at?: Date;
  updated_at?: Date;

  constructor(data: UserData) {
    this.id = data.id;
    this.lastname = data.lastname;
    this.firstname = data.firstname;
    this.email = data.email;
    this.password = data.password;
    this.image = data.image;
    this.roles = data.roles;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Récupérer tous les utilisateurs
  static async findAll(options?: findAllData): Promise<User[]> {
    let baseQuery = 'SELECT * FROM "user_with_role"';
    if (options) {
      const conditions = Object.entries(options)
        .map(([key, value]) => {
          return `${key} = '${value}'`;
        })
        .join(" AND ");
      baseQuery = `${baseQuery} WHERE ${conditions}`;
    }
    const result = await client.query(baseQuery);
    return result.rows.map(row => new User(row));
  }

  // Récupérer un utilisateur par ID
  static async findById(id: number): Promise<User | null> {
    const preparedQuery = {
      text: 'SELECT * FROM "user_with_role" WHERE id = $1',
      values: [id],
    };
    const result = await client.query(preparedQuery);
    if (result.rows.length) {
      return new User(result.rows[0]);
    } else {
      return null;
    }
  }

  // Créer ou mettre à jour un utilisateur
  async save(): Promise<void> {
    if (this.id) {
      // Mise à jour si l'utilisateur existe déjà
      const preparedQuery = {
        text: 'SELECT * FROM "update_user"($1)',
        values: [JSON.stringify(this)],
      };
      await client.query(preparedQuery);
      const result = await client.query(
        'SELECT * FROM "user_with_role" WHERE id = $1',
        [this.id]
      );

      console.log(result.rows[0]);
      Object.assign(this, result.rows[0]);
      console.log(this);
    } else {
      // Création d'un nouvel utilisateur
      const preparedQuery = {
        text: 'SELECT * FROM "create_user"($1)',
        values: [JSON.stringify(this)],
      };
      const insertResult = await client.query(preparedQuery);
      const userResult = await client.query(
        'SELECT * FROM "user_with_role" WHERE id = $1',
        [insertResult.rows[0].id]
      );
      Object.assign(this, userResult.rows[0]);
    }
  }
  // Supprimer un utilisateur
  static async deleteById(id: number): Promise<boolean> {
    const result = await client.query('DELETE FROM "user" WHERE id = $1', [id]);
    return !!result.rowCount;
  }
}
