import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaCard from '../components/AlertaCard';
import api from '../services/api.config';
import { isTokenValid } from '../utils/auth';

const Dashboard = () => {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si hay sesión
    const valid = isTokenValid();
    setIsLoggedIn(!!valid);

    // Cargar alertas
    const fetchAlertas = async () => {
      try {
        const response = await api.get('/alertas');
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
  }, []);

  return (
    <main className="main-content">
      <div className="page-header">
        <div>
          <h1>Todas las Alertas</h1>
          <p>Explora los reportes recientes de la comunidad y mantente listo para actuar.</p>
        </div>
        <div>
          {isLoggedIn ? (
            <Link to="/crear-alerta" className="button button-primary">
              + Crear Alerta
            </Link>
          ) : (
            <Link to="/login" className="button button-secondary">
              Inicia Sesión para Crear
            </Link>
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="empty-state">
          <p>Cargando alertas...</p>
        </div>
      ) : alertas.length === 0 ? (
        <div className="empty-state">
          <p>No hay alertas disponibles en este momento.</p>
        </div>
      ) : (
        <div className="alerts-grid">
          {alertas.map(alerta => (
            <AlertaCard key={alerta.id} alerta={alerta} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Dashboard;