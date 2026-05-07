import { Router } from 'express';
import multer from 'multer';
import {
  uploadImage,
  getImage,
  getImageMetadata,
  deleteImage,
  getImagesByAlerta
} from '../controllers/imagenes.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// Configurar multer para guardar en memoria
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Rutas públicas
router.get('/:id', getImage); // Obtener imagen binaria
router.get('/metadata/:id', getImageMetadata); // Obtener metadatos
router.get('/alerta/:alertaId', getImagesByAlerta); // Obtener imágenes de una alerta

// Rutas protegidas
router.post('/', authMiddleware, upload.single('file'), uploadImage); // Subir imagen
router.delete('/:id', authMiddleware, deleteImage); // Eliminar imagen

export default router;
