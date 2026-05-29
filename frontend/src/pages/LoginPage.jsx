import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../ui/Input';
import api from '../services/api.config';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      // Guardar token
      localStorage.setItem('user_token', data.token);
      
      // Guardar info del usuario
      if (data.user) {
        localStorage.setItem('user_info', JSON.stringify(data.user));
      }
      
      alert('¡Login exitoso!');
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || 'No se pudo conectar al servidor';
      setError(errorMsg);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Iniciar Sesión</h2>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Contraseña"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} className="button button-primary">
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p className="auth-footer">
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
};

export default LoginPage;