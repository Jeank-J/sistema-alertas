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
    <main className="main-content" style={{ padding: '20px' }}>
      <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Todas las Alertas</h1>
        {isLoggedIn ? (
          <Link to="/crear-alerta" className="btn btn-primary" style={{ background: '#2563eb', color: 'white', padding: '10px 15px', textDecoration: 'none', borderRadius: '5px', whiteSpace: 'nowrap' }}>
            + Crear Alerta
          </Link>
        ) : (
          <Link to="/login" className="btn btn-secondary" style={{ background: '#6b7280', color: 'white', padding: '10px 15px', textDecoration: 'none', borderRadius: '5px', whiteSpace: 'nowrap' }}>
            Inicia Sesión para Crear
          </Link>
        )}
      </div>

      {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Cargando alertas...</p>
        </div>
      ) : alertas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
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