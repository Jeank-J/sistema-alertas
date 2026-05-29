import './AlertaCard.css';
import ImageGalleryModal from './ImageGalleryModal';

const AlertaCard = ({ alerta }) => {
  const getIcon = (categoria) => {
    switch (categoria?.toLowerCase()) {
      case 'emergencia':
        return '🚨';

      case 'advertencia':
        return '⚠️';

      case 'informacion':
        return '🌱';

      default:
        return '📢';
    }
  };

  const getCategoryClass = (categoria) => {
    switch (categoria?.toLowerCase()) {
      case 'emergencia':
        return 'emergencia';

      case 'advertencia':
        return 'advertencia';

      case 'informacion':
        return 'informacion';

      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div
      className={`alerta-card ${getCategoryClass(
        alerta.categoria
      )}`}
    >
      <div className="card-glow"></div>

      <div className="alerta-header">
        <span
          className={`alert-badge ${getCategoryClass(
            alerta.categoria
          )}`}
        >
          {getIcon(alerta.categoria)}
          {alerta.categoria}
        </span>

        {alerta.severidad && (
          <span className="severity-pill">
            {alerta.severidad}
          </span>
        )}
      </div>

      <div className="alerta-body">
        <h2>{alerta.titulo}</h2>

        <p>
          {alerta.descripcion || alerta.desc}
        </p>
      </div>

      <div className="alerta-footer">
        <div className="alerta-info">
          {alerta.ubicacion && (
            <div className="info-box">
              <span className="info-icon">
                📍
              </span>

              <small>
                {alerta.ubicacion}
              </small>
            </div>
          )}

          {alerta.created_at && (
            <div className="info-box">
              <span className="info-icon">
                🕒
              </span>

              <small>
                {formatDate(
                  alerta.created_at
                )}
              </small>
            </div>
          )}
        </div>

        <div className="alerta-button">
          <ImageGalleryModal
            imageIds={alerta.imagenes_ids}
            label="Ver imágenes"
          />
        </div>
      </div>
    </div>
  );
};

export default AlertaCard;