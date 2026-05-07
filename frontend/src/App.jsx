import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/inicio';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CrearAlerta from './pages/CrearAlerta';
import MisAlertas from './pages/MisAlertas';
import './App.css'; // Importamos tus estilos originales

function App() {
  return (
    <Router>
      <Navbar />      
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crear-alerta" element={<CrearAlerta />} />
        <Route path="/mis-alertas" element={<MisAlertas />} />        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;