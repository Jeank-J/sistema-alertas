import { ImageModel } from '../models/imagen.model.js';

export const uploadImage = async (req, res) => {
  try {
    const usuario_id = req.user.id; // Del token JWT
    
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó archivo' });
    }

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ 
        error: 'Solo se permiten imágenes (JPEG, PNG, GIF, WebP)' 
      });
    }

    // Validar tamaño (máx 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (req.file.size > maxSize) {
      return res.status(400).json({ 
        error: 'Imagen muy grande (máximo 5MB)' 
      });
    }

    const newImage = await ImageModel.create({
      usuario_id,
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer,
      size: req.file.size,
      alerta_id: req.body.alerta_id || null
    });

    // Retornar solo los metadatos (sin el buffer de datos)
    res.status(201).json({
      id: newImage._id.toString(),
      filename: newImage.filename,
      size: newImage.size,
      contentType: newImage.contentType,
      uploadedAt: newImage.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await ImageModel.findById(id);

    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    // Servir la imagen con headers correctos
    res.set('Content-Type', image.contentType);
    res.set('Content-Length', image.data.length);
    res.set('Cache-Control', 'public, max-age=86400'); // Cache por 1 día
    res.send(image.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getImageMetadata = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await ImageModel.findById(id).select('-data'); // Excluir el buffer

    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    const image = await ImageModel.findById(id);
    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    // Verificar que la imagen pertenezca al usuario
    if (image.usuario_id !== usuario_id) {
      return res.status(403).json({ error: 'No tienes permisos para eliminar esta imagen' });
    }

    await ImageModel.findByIdAndDelete(id);
    res.json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getImagesByAlerta = async (req, res) => {
  try {
    const { alertaId } = req.params;
    const images = await ImageModel.find({ alerta_id: alertaId }).select('-data');

    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
