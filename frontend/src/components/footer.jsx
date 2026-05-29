const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>
              🌱 Sistema de Alertas Comunitarias
            </h3>

            <p>
              Comunicación rápida y segura
              para comunidades rurales y
              urbanas.
            </p>
          </div>

          <div className="footer-divider"></div>

          <p className="footer-copy">
            © 2026 Universidad de la Amazonía
            · Todos los derechos reservados
          </p>
        </div>
      </footer>

      <style jsx>{`
        .footer {
          width: 100%;

          margin-top: auto;

          background:
            linear-gradient(
              135deg,
              #163921 0%,
              #1b4332 45%,
              #2d6a4f 100%
            );

          color: #eef7ed;

          padding:
            2.5rem
            1.5rem;

          position: relative;

          overflow: hidden;
        }

        .footer::before {
          content: '';

          position: absolute;

          top: -120px;
          right: -120px;

          width: 260px;
          height: 260px;

          border-radius: 50%;

          background:
            rgba(255,255,255,0.05);

          filter: blur(10px);
        }

        .footer-content {
          position: relative;
          z-index: 1;

          max-width: 1200px;

          margin: 0 auto;

          display: flex;
          flex-direction: column;
          align-items: center;

          text-align: center;
        }

        .footer-brand h3 {
          margin-bottom: 0.8rem;

          font-size: 1.5rem;

          color: #f1fff3;

          font-weight: 800;
        }

        .footer-brand p {
          color: #cfe8d1;

          max-width: 620px;

          line-height: 1.8;

          font-size: 1rem;
        }

        .footer-divider {
          width: 100%;
          max-width: 500px;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.25),
              transparent
            );

          margin:
            1.8rem
            0;
        }

        .footer-copy {
          color: #b7d7bb;

          font-size: 0.95rem;

          letter-spacing: 0.3px;
        }

        @media (max-width: 768px) {
          .footer {
            padding:
              2rem
              1rem;
          }

          .footer-brand h3 {
            font-size: 1.25rem;
          }

          .footer-brand p {
            font-size: 0.95rem;
          }

          .footer-copy {
            font-size: 0.88rem;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;