import ImageGalleryModal from './ImageGalleryModal';

const AlertaCard = ({ alerta }) => {
  const getIcon = (categoria) => {
    switch (categoria) {
      case 'emergencia':
        return '🚨';
      case 'advertencia':
        return '⚠️';
      case 'informacion':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="alerta-card" style={{
      border: '1px solid #ccc',
      padding: '15px',
      marginBottom: '10px',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ flex: 1 }}>
          <h3>{getIcon(alerta.categoria)} {alerta.titulo}</h3>
          <p>{alerta.descripcion || alerta.desc}</p>
          {alerta.ubicacion && <small>📍 Ubicación: {alerta.ubicacion}</small>}
          <br />
          {alerta.severidad && <small>Severidad: {alerta.severidad}</small>}
          <br />
          {alerta.created_at && <small>Publicado: {formatDate(alerta.created_at)}</small>}
        </div>
      </div>

      <ImageGalleryModal imageIds={alerta.imagenes_ids} label="Ver imágenes" />
    </div>
  );
};

export default AlertaCard;