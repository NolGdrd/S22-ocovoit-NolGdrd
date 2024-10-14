import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

// Conversion de la fonction 'scrypt' en une fonction retournant une promesse
const scryptPromise = promisify(scrypt);

// Longueur par défaut pour la clé dérivée
const KEY_LENGTH = 64;
// Longueur du sel en octets
const SALT_LENGTH = 16;

/**
 * Crée un hash sécurisé à partir d'un mot de passe en utilisant un sel aléatoire.
 * @param password Le mot de passe à hasher.
 * @returns Une promesse qui résout avec le hash du mot de passe.
 * @throws Une erreur si la création du hash échoue.
 */
async function hash(password: string): Promise<string> {
  if (!password) {
    throw new Error("Le mot de passe ne peut pas être vide");
  }
  try {
    // Génération d'un sel aléatoire, converti en chaîne hexadécimale
    const salt = randomBytes(SALT_LENGTH).toString("hex");
    // Création d'une clé dérivée à partir du mot de passe et du sel
    const derivedKey = await scryptPromise(password, salt, KEY_LENGTH);
    // Retour du sel et de la clé dérivée concaténés, séparés par ':'
    return `${salt}:${(derivedKey as Buffer).toString("hex")}`;
  } catch (error) {
    throw new Error(
      `Erreur lors de la création du hash: ${(error as Error).message}`
    );
  }
}

/**
 * Vérifie si un mot de passe correspond à un hash existant.
 * @param password Le mot de passe à vérifier.
 * @param hash Le hash à comparer.
 * @returns Une promesse qui résout avec true si le mot de passe correspond au hash, sinon false.
 * @throws Une erreur si la vérification échoue.
 */
async function verify(password: string, hash: string): Promise<boolean> {
  if (!password || !hash) {
    throw new Error("Le mot de passe et le hash ne peuvent pas être vides");
  }

  try {
    // Séparation du hash en sel et clé dérivée
    const [salt, key] = hash.split(":");
    if (!salt || !key) {
      throw new Error("Hash invalide");
    }

    // Conversion de la clé dérivée en buffer depuis sa représentation hexadécimale
    const keyBuffer = Buffer.from(key, "hex");
    // Création d'une clé dérivée à partir du mot de passe et du sel
    const derivedKey = await scryptPromise(password, salt, KEY_LENGTH);
    // Comparaison sécurisée des deux buffers
    return timingSafeEqual(keyBuffer, derivedKey as Buffer);
  } catch (error) {
    throw new Error(
      `Erreur lors de la vérification du mot de passe: ${
        (error as Error).message
      }`
    );
  }
}

export { hash, verify };
