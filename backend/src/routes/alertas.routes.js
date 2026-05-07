import { Router } from 'express';
import {
  createAlerta,
  getAlertasByUsuario,
  getAllAlertas,
  getAlertaById,
  updateAlerta,
  deleteAlerta
} from '../controllers/alertas.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// ⚠️ IMPORTANTE: Las rutas específicas deben ir ANTES que las parametrizadas

// Rutas protegidas (requieren autenticación) - Específicas primero
router.get('/mis-alertas', authMiddleware, getAlertasByUsuario);
router.post('/', authMiddleware, createAlerta);
router.put('/:id', authMiddleware, updateAlerta);
router.delete('/:id', authMiddleware, deleteAlerta);

// Rutas públicas (sin autenticación) - Genéricas después
router.get('/', getAllAlertas);
router.get('/:id', getAlertaById);

export default router;
