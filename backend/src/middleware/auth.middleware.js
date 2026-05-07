import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, falta token' });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded; // Inyectamos el usuario en la petición
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido o expirado' });
  }
};

// Alias para compatibilidad
export const protect = authMiddleware;