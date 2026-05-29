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
          background: linear-gradient(135deg, #2f7d3a 0%, #6fa169 100%);
          box-shadow: 0 16px 40px rgba(31, 63, 31, 0.16);
          position: sticky;
          top: 0;
          z-index: 30;
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: space-between;
          flex-wrap: wrap;
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
          font-size: 1.45rem;
          font-weight: 800;
        }

        .nav-menu {
          display: flex;
          gap: 0.8rem;
          flex: 1;
          flex-wrap: wrap;
          justify-content: center;
        }

        .nav-link {
          padding: 0.75rem 1.15rem;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          border-radius: 999px;
          transition: all 0.2s;
          font-weight: 600;
          border: 1px solid transparent;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.18);
          color: white;
        }

        .nav-link.active {
          background: rgba(255, 255, 255, 0.28);
          color: white;
        }

        .user-section {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          color: white;
          font-weight: 500;
        }

        .btn-logout {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 0.55rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-logout:hover {
          background: rgba(255, 255, 255, 0.32);
        }

        .auth-links {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-link {
          padding: 0.75rem 1.15rem;
          color: white;
          text-decoration: none;
          border-radius: 999px;
          transition: all 0.2s;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(255, 255, 255, 0.12);
        }

        .btn-link:hover {
          border-color: rgba(255, 255, 255, 0.45);
          background: rgba(255, 255, 255, 0.2);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.22);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 840px) {
          .navbar-container {
            justify-content: center;
            align-items: stretch;
          }

          .nav-menu {
            justify-content: center;
            gap: 0.5rem;
          }

          .user-section {
            justify-content: center;
            width: 100%;
            border-top: 1px solid rgba(255, 255, 255, 0.12);
            padding-top: 1rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;