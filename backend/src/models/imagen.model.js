import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    usuario_id: {
      type: Number,
      required: true
    },
    alerta_id: {
      type: Number,
      default: null // Puede estar asociada a una alerta
    },
    filename: {
      type: String,
      required: true
    },
    contentType: {
      type: String,
      required: true
    },
    data: {
      type: Buffer,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { collection: 'imagenes' }
);

// Índices para búsquedas frecuentes
imageSchema.index({ usuario_id: 1 });
imageSchema.index({ alerta_id: 1 });
imageSchema.index({ createdAt: 1 });

export const ImageModel = mongoose.model('Imagen', imageSchema);
