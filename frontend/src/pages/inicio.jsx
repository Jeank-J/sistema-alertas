import { AlertCircle, Users, Shield } from 'lucide-react';
import Footer from '../components/footer';

const Inicio = () => {
  return (
    <div className="inicio-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bienvenido al Sistema de Alertas</h1>
          <h1>Comunitarias</h1>
          <hr />
          <p className="subtitle">
            Conéctate a la red comunitaria y mantente informado de emergencias.
          </p>
          <p className="instruction">
            👉 Usa el menú para registrarte, iniciar sesión o ver alertas.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <AlertCircle size={48} className="feature-icon" />
          <h3>Alertas en Tiempo Real</h3>
          <p>Recibe notificaciones instantáneas sobre emergencias en tu comunidad</p>
        </div>
        
        <div className="feature-card">
          <Users size={48} className="feature-icon" />
          <h3>Red Comunitaria</h3>
          <p>Conecta con vecinos y mantente informado de lo que sucede cerca</p>
        </div>
        
        <div className="feature-card">
          <Shield size={48} className="feature-icon" />
          <h3>Seguridad Verificada</h3>
          <p>Información confiable y verificada por las autoridades locales</p>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .inicio-container {
          min-height: calc(100vh - 80px);
          display: flex;
          flex-direction: column;
        }

        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-content h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .subtitle {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          opacity: 0.95;
        }

        .instruction {
          font-size: 1.1rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 1rem;
          border-radius: 8px;
          display: inline-block;
        }

        .features-section {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .feature-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.2s;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
          color: #667eea;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          color: #1e293b;
          margin-bottom: 0.75rem;
          font-size: 1.5rem;
        }

        .feature-card p {
          color: #64748b;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1.1rem;
          }

          .features-section {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Inicio;