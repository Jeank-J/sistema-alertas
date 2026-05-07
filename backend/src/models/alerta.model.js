import { query } from '../config/postgres.js';

export const AlertaModel = {
  create: async ({ usuario_id, titulo, descripcion, ubicacion, categoria, severidad = 'media', imagenes_ids = [] }) => {
    const text = `
      INSERT INTO alertas (usuario_id, titulo, descripcion, ubicacion, categoria, severidad, estado, imagenes_ids)
      VALUES ($1, $2, $3, $4, $5, $6, 'activa', $7::TEXT[])
      RETURNING *
    `;
    // Convertir array a formato que PostgreSQL entiende
    const imagenes_array = Array.isArray(imagenes_ids) && imagenes_ids.length > 0 ? imagenes_ids : [];
    const values = [usuario_id, titulo, descripcion, ubicacion, categoria, severidad, imagenes_array];
    const { rows } = await query(text, values);
    return rows[0];
  },

  findById: async (id) => {
    const { rows } = await query('SELECT * FROM alertas WHERE id = $1', [id]);
    return rows[0];
  },

  findByUsuarioId: async (usuario_id) => {
    const { rows } = await query(
      'SELECT * FROM alertas WHERE usuario_id = $1 ORDER BY created_at DESC',
      [usuario_id]
    );
    return rows;
  },

  findAll: async (limit = 50, offset = 0) => {
    const { rows } = await query(
      'SELECT * FROM alertas WHERE estado = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      ['activa', limit, offset]
    );
    return rows;
  },

  updateById: async (id, { titulo, descripcion, ubicacion, categoria, severidad, estado, imagenes_ids }) => {
    const text = `
      UPDATE alertas 
      SET titulo = COALESCE($1, titulo),
          descripcion = COALESCE($2, descripcion),
          ubicacion = COALESCE($3, ubicacion),
          categoria = COALESCE($4, categoria),
          severidad = COALESCE($5, severidad),
          estado = COALESCE($6, estado),
          imagenes_ids = COALESCE($7::TEXT[], imagenes_ids),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
      RETURNING *
    `;
    const imagenes_array = imagenes_ids && Array.isArray(imagenes_ids) ? imagenes_ids : null;
    const values = [titulo, descripcion, ubicacion, categoria, severidad, estado, imagenes_array, id];
    const { rows } = await query(text, values);
    return rows[0];
  },

  deleteById: async (id) => {
    const { rows } = await query('DELETE FROM alertas WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }
};
