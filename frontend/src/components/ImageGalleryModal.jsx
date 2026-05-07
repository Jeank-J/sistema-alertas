import { useEffect, useState } from 'react';

const ImageGalleryModal = ({ imageIds = [], label = 'Ver imágenes' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (selectedImageIndex !== null) {
          setSelectedImageIndex(null);
          setZoom(100);
        } else {
          setIsOpen(false);
        }
      } else if (event.key === 'ArrowRight' && selectedImageIndex !== null) {
        setSelectedImageIndex((prev) => (prev + 1) % imageIds.length);
        setZoom(100);
      } else if (event.key === 'ArrowLeft' && selectedImageIndex !== null) {
        setSelectedImageIndex((prev) => (prev - 1 + imageIds.length) % imageIds.length);
        setZoom(100);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, selectedImageIndex, imageIds.length]);

  if (!imageIds || imageIds.length === 0) {
    return null;
  }

  // Vista expandida de imagen individual con zoom
  if (selectedImageIndex !== null) {
    const currentImageId = imageIds[selectedImageIndex];
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Vista expandida de imagen"
        onClick={() => {
          setSelectedImageIndex(null);
          setZoom(100);
        }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.92)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 10000,
        }}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '95vw',
            maxHeight: '95vh',
          }}
        >
          {/* Controles de zoom */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            gap: '12px',
          }}>
            <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>
              Imagen {selectedImageIndex + 1} de {imageIds.length} • Zoom: {zoom}%
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setZoom(Math.max(50, zoom - 20))}
                style={{
                  padding: '8px 12px',
                  background: '#1e293b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
                title="Reducir zoom (−)"
              >
                − Zoom
              </button>
              <button
                type="button"
                onClick={() => setZoom(100)}
                style={{
                  padding: '8px 12px',
                  background: '#1e293b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
                title="Ajustar a pantalla"
              >
                Ajustar
              </button>
              <button
                type="button"
                onClick={() => setZoom(Math.min(300, zoom + 20))}
                style={{
                  padding: '8px 12px',
                  background: '#1e293b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
                title="Aumentar zoom (+)"
              >
                + Zoom
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedImageIndex(null);
                  setZoom(100);
                }}
                style={{
                  padding: '8px 12px',
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
                title="Cerrar (ESC)"
              >
                Cerrar
              </button>
            </div>
          </div>

          {/* Contenedor de imagen con scroll */}
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0f172a',
              borderRadius: '12px',
            }}
          >
            <img
              src={`/api/imagenes/${currentImageId}`}
              alt={`Imagen ${selectedImageIndex + 1}`}
              style={{
                width: `${zoom}%`,
                height: 'auto',
                maxWidth: 'none',
                cursor: zoom > 100 ? 'grab' : 'default',
              }}
            />
          </div>

          {/* Navegación entre imágenes */}
          {imageIds.length > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '12px',
              gap: '8px',
            }}>
              <button
                type="button"
                onClick={() => {
                  setSelectedImageIndex((prev) => (prev - 1 + imageIds.length) % imageIds.length);
                  setZoom(100);
                }}
                style={{
                  padding: '10px 16px',
                  background: '#1e293b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
                title="Anterior (←)"
              >
                ← Anterior
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedImageIndex((prev) => (prev + 1) % imageIds.length);
                  setZoom(100);
                }}
                style={{
                  padding: '10px 16px',
                  background: '#1e293b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
                title="Siguiente (→)"
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vista de grilla de miniaturas
  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          marginTop: '10px',
          padding: '8px 12px',
          border: 'none',
          borderRadius: '6px',
          background: '#0f766e',
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        {label} ({imageIds.length})
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vista de imágenes"
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.72)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 9999,
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: 'min(900px, 100%)',
              maxHeight: '85vh',
              overflow: 'auto',
              background: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0 }}>Imágenes adjuntas</h3>
                <p style={{ margin: '4px 0 0', color: '#64748b' }}>{imageIds.length} archivo(s)</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  border: 'none',
                  background: '#e2e8f0',
                  color: '#0f172a',
                  borderRadius: '999px',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  lineHeight: 1,
                }}
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {imageIds.map((imageId, index) => (
                <figure
                  key={imageId}
                  style={{
                    margin: 0,
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    background: '#f8fafc',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setZoom(100);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <img
                    src={`/api/imagenes/${imageId}`}
                    alt={`Imagen adjunta ${index + 1}`}
                    style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGalleryModal;