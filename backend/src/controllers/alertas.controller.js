import { AlertaModel } from '../models/alerta.model.js';

export const createAlerta = async (req, res) => {
  try {
    const { titulo, descripcion, ubicacion, categoria, severidad, imagenes_ids } = req.body;
    const usuario_id = req.user.id; // Del token JWT

    console.log('📝 Creando alerta con datos:', { titulo, categoria, imagenes_ids });

    if (!titulo || !descripcion || !ubicacion || !categoria) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: titulo, descripcion, ubicacion, categoria' 
      });
    }

    const newAlerta = await AlertaModel.create({
      usuario_id,
      titulo,
      descripcion,
      ubicacion,
      categoria,
      severidad: severidad || 'media',
      imagenes_ids: imagenes_ids || []
    });

    res.status(201).json(newAlerta);
  } catch (error) {
    console.error('❌ Error creando alerta:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAlertasByUsuario = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const alertas = await AlertaModel.findByUsuarioId(usuario_id);
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllAlertas = async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const alertas = await AlertaModel.findAll(parseInt(limit), parseInt(offset));
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAlertaById = async (req, res) => {
  try {
    const { id } = req.params;
    const alerta = await AlertaModel.findById(id);
    if (!alerta) {
      return res.status(404).json({ error: 'Alerta no encontrada' });
    }
    res.json(alerta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAlerta = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    // Verificar que la alerta pertenezca al usuario
    const alerta = await AlertaModel.findById(id);
    if (!alerta) {
      return res.status(404).json({ error: 'Alerta no encontrada' });
    }
    if (alerta.usuario_id !== usuario_id) {
      return res.status(403).json({ error: 'No tienes permisos para editar esta alerta' });
    }

    const updatedAlerta = await AlertaModel.updateById(id, req.body);
    res.json(updatedAlerta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAlerta = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    // Verificar que la alerta pertenezca al usuario
    const alerta = await AlertaModel.findById(id);
    if (!alerta) {
      return res.status(404).json({ error: 'Alerta no encontrada' });
    }
    if (alerta.usuario_id !== usuario_id) {
      return res.status(403).json({ error: 'No tienes permisos para eliminar esta alerta' });
    }

    const deletedAlerta = await AlertaModel.deleteById(id);
    res.json({ message: 'Alerta eliminada correctamente', alerta: deletedAlerta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
