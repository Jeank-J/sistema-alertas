import {
  AlertCircle,
  Users,
  Shield,
  Trees,
  BellRing,
  MapPinned
} from 'lucide-react';

import Footer from '../components/footer';

const Inicio = () => {
  return (
    <div className="inicio-container">
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="eyebrow">
            🌱 Comunidad en acción
          </span>

          <h1>
            Sistema de Alertas
            Comunitarias
          </h1>

          <p className="subtitle">
            Mantén conectada tu vereda,
            barrio o comunidad rural con
            alertas rápidas, reportes
            claros y comunicación local.
          </p>

          <p className="instruction">
            Usa el menú para iniciar
            sesión, crear alertas o
            consultar información de tu
            zona.
          </p>

          <div className="hero-highlight-row">
            <span className="highlight-pill">
              🚨 Respuesta rápida
            </span>

            <span className="highlight-pill">
              🌿 Enfoque comunitario
            </span>

            <span className="highlight-pill">
              📍 Información local
            </span>
          </div>
        </div>

        <div className="floating-card card-one">
          <BellRing size={24} />
          <span>
            Alertas
          </span>
        </div>

        <div className="floating-card card-two">
          <Trees size={24} />
          <span>
            Rural
          </span>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <h2>24/7</h2>
          <p>Comunicación activa</p>
        </div>

        <div className="stat-card">
          <h2>+100</h2>
          <p>Reportes compartidos</p>
        </div>

        <div className="stat-card">
          <h2>100%</h2>
          <p>Enfoque comunitario</p>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon-wrap">
            <AlertCircle
              size={42}
              className="feature-icon"
            />
          </div>

          <h3>
            Alertas inmediatas
          </h3>

          <p>
            Comparte emergencias,
            accidentes o situaciones
            importantes para mantener a
            todos informados.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrap">
            <Users
              size={42}
              className="feature-icon"
            />
          </div>

          <h3>
            Red comunitaria
          </h3>

          <p>
            Fortalece la comunicación
            entre vecinos, líderes y
            habitantes de tu zona.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrap">
            <Shield
              size={42}
              className="feature-icon"
            />
          </div>

          <h3>
            Mayor seguridad
          </h3>

          <p>
            Un sistema pensado para
            reaccionar rápido y generar
            confianza local.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrap">
            <MapPinned
              size={42}
              className="feature-icon"
            />
          </div>

          <h3>
            Ubicación precisa
          </h3>

          <p>
            Reporta eventos indicando
            sectores, barrios o veredas
            específicas.
          </p>
        </div>
      </section>

      <section className="community-banner">
        <div className="community-content">
          <h2>
            Una plataforma hecha para la
            comunidad
          </h2>

          <p>
            Diseñada para zonas rurales,
            barrios y sectores que
            necesitan comunicación rápida
            y sencilla.
          </p>
        </div>
      </section>
      

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .inicio-container {
          min-height: 100vh;

          background:
            linear-gradient(
              180deg,
              #eef6ee,
              #f8fff8
            );

          display: flex;
          flex-direction: column;

          overflow-x: hidden;
        }

        /* HERO */

        .hero-section {
          position: relative;

          min-height: 78vh;

          display: flex;
          align-items: center;
          justify-content: center;

          text-align: center;

          padding:
            5rem
            2rem;

          overflow: hidden;

          background:
            linear-gradient(
              135deg,
              #1b4332 0%,
              #2d6a4f 30%,
              #40916c 65%,
              #74c69d 100%
            );
        }

        .hero-overlay {
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              circle at top left,
              rgba(255,255,255,0.14),
              transparent 30%
            ),
            radial-gradient(
              circle at bottom right,
              rgba(255,255,255,0.12),
              transparent 25%
            );

          pointer-events: none;
        }

        .hero-section::before {
          content: '';

          position: absolute;

          top: -120px;
          left: -120px;

          width: 320px;
          height: 320px;

          border-radius: 50%;

          background:
            rgba(255,255,255,0.08);

          filter: blur(12px);
        }

        .hero-section::after {
          content: '';

          position: absolute;

          bottom: -120px;
          right: -120px;

          width: 320px;
          height: 320px;

          border-radius: 50%;

          background:
            rgba(255,255,255,0.08);

          filter: blur(12px);
        }

        .hero-content {
          position: relative;
          z-index: 2;

          max-width: 900px;
        }

        .eyebrow {
          display: inline-flex;

          padding:
            0.8rem
            1.2rem;

          border-radius: 999px;

          background:
            rgba(255,255,255,0.14);

          color: #f1fff3;

          font-weight: 800;

          letter-spacing: 1px;

          backdrop-filter: blur(8px);

          margin-bottom: 1.4rem;
        }

        .hero-content h1 {
          font-size:
            clamp(
              3rem,
              6vw,
              5rem
            );

          line-height: 1.02;

          margin: 0;

          color: white;

          font-weight: 900;

          text-shadow:
            0 10px 30px rgba(
              0,
              0,
              0,
              0.18
            );
        }

        .subtitle {
          margin:
            1.8rem auto 0;

          max-width: 760px;

          font-size: 1.25rem;

          line-height: 1.9;

          color:
            rgba(
              255,
              255,
              255,
              0.94
            );
        }

        .instruction {
          display: inline-flex;

          margin-top: 2rem;

          padding:
            1rem
            1.4rem;

          border-radius: 18px;

          background:
            rgba(255,255,255,0.12);

          border:
            1px solid
            rgba(255,255,255,0.18);

          color: white;

          font-weight: 600;

          backdrop-filter: blur(8px);
        }

        .hero-highlight-row {
          display: flex;

          justify-content: center;
          flex-wrap: wrap;

          gap: 1rem;

          margin-top: 2rem;
        }

        .highlight-pill {
          background:
            rgba(255,255,255,0.12);

          border:
            1px solid
            rgba(255,255,255,0.18);

          color: white;

          padding:
            0.9rem
            1.2rem;

          border-radius: 999px;

          font-size: 0.95rem;
          font-weight: 700;

          backdrop-filter: blur(10px);

          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }

        .highlight-pill:hover {
          transform: translateY(-3px);

          background:
            rgba(255,255,255,0.18);
        }

        /* FLOATING CARDS */

        .floating-card {
          position: absolute;

          display: flex;
          align-items: center;
          gap: 0.8rem;

          padding:
            1rem
            1.2rem;

          border-radius: 20px;

          background:
            rgba(255,255,255,0.14);

          border:
            1px solid
            rgba(255,255,255,0.18);

          backdrop-filter: blur(10px);

          color: white;

          font-weight: 700;

          z-index: 2;

          box-shadow:
            0 16px 32px rgba(
              0,
              0,
              0,
              0.12
            );
        }

        .card-one {
          top: 18%;
          left: 6%;
        }

        .card-two {
          bottom: 14%;
          right: 6%;
        }

        /* STATS */

        .stats-section {
          width: 100%;

          max-width: 1180px;

          margin:
            -50px auto 0;

          padding:
            0 2rem;

          display: grid;

          grid-template-columns:
            repeat(
              auto-fit,
              minmax(220px, 1fr)
            );

          gap: 1.5rem;

          position: relative;
          z-index: 5;
        }

        .stat-card {
          background: white;

          padding: 2rem;

          border-radius: 28px;

          text-align: center;

          border:
            1px solid #dcecdc;

          box-shadow:
            0 18px 40px rgba(
              34,
              84,
              61,
              0.08
            );
        }

        .stat-card h2 {
          margin: 0;

          font-size: 2.6rem;

          color: #1b4332;
        }

        .stat-card p {
          margin-top: 0.5rem;

          color: #52796f;

          font-weight: 600;
        }

        /* FEATURES */

        .features-section {
          width: 100%;

          max-width: 1250px;

          margin: 4rem auto;

          padding:
            0 2rem;

          display: grid;

          grid-template-columns:
            repeat(
              auto-fit,
              minmax(260px, 1fr)
            );

          gap: 2rem;
        }

        .feature-card {
          background:
            linear-gradient(
              135deg,
              #ffffff,
              #f7fbf5
            );

          padding: 2.2rem;

          border-radius: 30px;

          border:
            1px solid #dcecdc;

          box-shadow:
            0 16px 36px rgba(
              34,
              84,
              61,
              0.08
            );

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .feature-card:hover {
          transform:
            translateY(-8px);

          box-shadow:
            0 24px 48px rgba(
              34,
              84,
              61,
              0.12
            );
        }

        .feature-icon-wrap {
          width: 76px;
          height: 76px;

          border-radius: 22px;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              135deg,
              #d8f3dc,
              #b7e4c7
            );

          margin-bottom: 1.4rem;
        }

        .feature-icon {
          color: #2d6a4f;
        }

        .feature-card h3 {
          margin-bottom: 1rem;

          font-size: 1.5rem;

          color: #1b4332;
        }

        .feature-card p {
          color: #52796f;

          line-height: 1.9;

          font-size: 1rem;
        }

        /* COMMUNITY BANNER */

        .community-banner {
          margin:
            1rem auto 4rem;

          width: calc(100% - 4rem);

          max-width: 1200px;

          background:
            linear-gradient(
              135deg,
              #2d6a4f,
              #1b4332
            );

          border-radius: 36px;

          padding:
            4rem
            2rem;

          text-align: center;

          color: white;

          position: relative;

          overflow: hidden;
        }

        .community-banner::before {
          content: '';

          position: absolute;

          top: -80px;
          right: -80px;

          width: 220px;
          height: 220px;

          border-radius: 50%;

          background:
            rgba(255,255,255,0.08);
        }

        .community-content {
          position: relative;
          z-index: 1;
        }

        .community-content h2 {
          font-size:
            clamp(
              2rem,
              4vw,
              3rem
            );

          margin-bottom: 1rem;
        }

        .community-content p {
          max-width: 760px;

          margin: 0 auto;

          line-height: 1.9;

          color:
            rgba(
              255,
              255,
              255,
              0.92
            );

          font-size: 1.1rem;
        }

        /* RESPONSIVE */

        @media (max-width: 900px) {
          .floating-card {
            display: none;
          }

          .stats-section {
            margin-top: -30px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding:
              4rem
              1.2rem;
          }

          .features-section,
          .stats-section {
            padding:
              0 1.2rem;
          }

          .community-banner {
            width:
              calc(100% - 2.4rem);

            padding:
              3rem
              1.5rem;
          }

          .instruction {
            border-radius: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default Inicio;