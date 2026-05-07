import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isTokenValid, clearAuth } from '../utils/auth';
import { Bell, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const valid = isTokenValid();
    if (!valid) {
      clearAuth();
      setUserInfo(null);
      setIsLoggedIn(false);
      return;
    }

    const userStr = localStorage.getItem('user_info');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserInfo(user);
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Error parsing user info:', e);
        setIsLoggedIn(false);
      }
    }
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_info');
    setUserInfo(null);
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-brand">
          <Bell size={24} />
          <h2>Alertas Comunitarias</h2>
        </Link>

        <div className="nav-menu">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Inicio
          </Link>
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Todas las Alertas
          </Link>
          {isLoggedIn && (
            <>
              <Link 
                to="/crear-alerta" 
                className={`nav-link ${isActive('/crear-alerta') ? 'active' : ''}`}
              >
                + Crear Alerta
              </Link>
              <Link 
                to="/mis-alertas" 
                className={`nav-link ${isActive('/mis-alertas') ? 'active' : ''}`}
              >
                Mis Alertas
              </Link>
            </>
          )}
        </div>

        <div className="user-section">
          {isLoggedIn && userInfo ? (
            <div className="user-info">
              <User size={20} />
              <span>{userInfo.nombre || userInfo.email}</span>
              <button 
                className="btn-logout"
                onClick={handleLogout}
                title="Cerrar sesión"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn-link">Entrar</Link>
              <Link to="/register" className="btn-link btn-secondary">Registrarse</Link>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: white;
          white-space: nowrap;
        }

        .nav-brand h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .nav-menu {
          display: flex;
          gap: 1rem;
          flex: 1;
        }

        .nav-link {
          padding: 0.75rem 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s;
          font-weight: 500;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .nav-link.active {
          background: rgba(255, 255, 255, 0.3);
          color: white;
        }

        .user-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          font-weight: 500;
        }

        .btn-logout {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 0.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-logout:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .auth-links {
          display: flex;
          gap: 0.75rem;
        }

        .btn-link {
          padding: 0.75rem 1.25rem;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s;
          font-weight: 500;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .btn-link:hover {
          border-color: white;
          background: rgba(255, 255, 255, 0.1);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;