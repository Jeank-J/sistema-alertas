import mongoose from 'mongoose';
import { env } from './env.js';

export const connectMongo = async () => {
  try {
    await mongoose.connect(env.mongo.uri);
    console.log('🍃 MongoDB conectado exitosamente');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};