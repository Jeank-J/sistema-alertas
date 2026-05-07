-- Agregar soporte de imágenes en la tabla alertas
ALTER TABLE alertas 
ADD COLUMN IF NOT EXISTS imagenes_ids TEXT[] DEFAULT '{}';

-- Índice para búsquedas
CREATE INDEX IF NOT EXISTS idx_alertas_imagenes_ids ON alertas USING GIN(imagenes_ids);
