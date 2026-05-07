import pkg from 'pg';
const { Pool } = pkg;
import { env } from './env.js';

const pool = new Pool(env.pg);

pool.on('connect', () => {
  console.log('🐘 PostgreSQL conectado exitosamente');
});

pool.on('error', (err) => {
  console.error('❌ Error inesperado en PostgreSQL', err);
  process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);