import { query } from '../config/postgres.js';

export const UsuarioModel = {
  create: async ({ nombre, email, passwordHash }) => {
    const text = `
      INSERT INTO usuarios (nombre, email, password_hash)
      VALUES ($1, $2, $3) RETURNING id, nombre, email
    `;
    const values = [nombre, email, passwordHash];
    const { rows } = await query(text, values);
    return rows[0];
  },

  findByEmail: async (email) => {
    const { rows } = await query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return rows[0];
  }
};