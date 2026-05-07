import express from 'express';
import cors from 'cors';
import { env } from './src/config/env.js';
import { connectMongo } from './src/config/mongodb.js';

// Importar rutas
import authRoutes from './src/routes/auth.routes.js';
import alertasRoutes from './src/routes/alertas.routes.js';
import imagenesRoutes from './src/routes/imagenes.routes.js';

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Conectar Bases de Datos
connectMongo();

// ==========================================
// Registro de Rutas
// ==========================================
app.use('/api/auth', authRoutes);
app.use('/api/alertas', alertasRoutes);
app.use('/api/imagenes', imagenesRoutes);

// Ruta de salud del servidor
app.get('/health', (req, res) => {
  res.json({ status: 'server up', node: process.version });
});

app.listen(env.port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${env.port}`);
});