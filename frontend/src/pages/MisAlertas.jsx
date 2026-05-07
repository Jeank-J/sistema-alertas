import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.config';
import ImageGalleryModal from '../components/ImageGalleryModal';

const AlertaItem = ({ alerta, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="my-alert-item">
      <div className="info">
        <span className={`badge ${alerta.categoria}`}>{alerta.categoria}</span>
        <h3>{alerta.titulo}</h3>
        <p>{alerta.descripcion}</p>
        <small>📍 {alerta.ubicacion}</small>
        <small>Publicado: {formatDate(alerta.created_at)}</small>
          <ImageGalleryModal imageIds={alerta.imagenes_ids} label="Ver imágenes" />
      </div>
      <button 
        className="btn btn-danger" 
        onClick={() => onDelete(alerta.id)}
      >
        Eliminar
      </button>
    </div>
  );
};

const MisAlertas = () => {
  const navigate = useNavigate();
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const token = localStorage.getItem('user_token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await api.get('/alertas/mis-alertas');
        setAlertas(response.data || []);
      } catch (err) {
        const errorMsg = err.response?.data?.error || 'Error al cargar las alertas';
        setError(errorMsg);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlertas();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta alerta?')) {
      try {
        await api.delete(`/alertas/${id}`);
        setAlertas(alertas.filter(a => a.id !== id));
        alert('Alerta eliminada correctamente');
      } catch (err) {
        alert('Error al eliminar la alerta: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  if (loading) {
    return <div className="main-content"><h2>Cargando alertas...</h2></div>;
  }

  return (
    <div className="main-content">
      <h2>Gestión de mis publicaciones</h2>
      <p className="subtitle">Aquí puedes eliminar alertas que ya hayan sido resueltas.</p>
      
      {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      {alertas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>No tienes alertas publicadas aún.</p>
          <button onClick={() => navigate('/crear-alerta')} className="btn btn-primary">
            Crear nueva alerta
          </button>
        </div>
      ) : (
        <div className="my-alerts-list">
          {alertas.map(alerta => (
            <AlertaItem 
              key={alerta.id} 
              alerta={alerta}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MisAlertas;