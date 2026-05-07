import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../ui/Input';
import api from '../services/api.config';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      await api.post('/auth/register', { nombre: formData.nombre, email: formData.email, password: formData.password });
      alert('¡Registro exitoso! Ahora inicia sesión.');
      navigate('/');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.response?.data?.error || 'No se pudo conectar'));
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Registrar Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        <Input label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} required />
        <Input label="Confirmar Contraseña" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', marginTop: '10px' }}>
          Registrar
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        ¿Ya tienes cuenta? <Link to="/">Inicia Sesión</Link>
      </p>
    </div>
  );
};

export default RegisterPage;