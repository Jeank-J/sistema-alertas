CREATE TABLE IF NOT EXISTS alertas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    severidad VARCHAR(50) DEFAULT 'media',
    estado VARCHAR(50) DEFAULT 'activa',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Índices para búsquedas frecuentes
CREATE INDEX idx_alertas_usuario ON alertas(usuario_id);
CREATE INDEX idx_alertas_estado ON alertas(estado);
CREATE INDEX idx_alertas_categoria ON alertas(categoria);
CREATE INDEX idx_alertas_created_at ON alertas(created_at);
