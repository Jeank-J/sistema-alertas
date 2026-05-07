const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          © 2026 Sistema de Alertas Comunitarias - Universidad de la Amazonía
        </p>
      </div>

      <style jsx>{`
        .footer {
          background: #1e293b;
          color: white;
          padding: 2rem;
          margin-top: auto;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .footer-logos {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .footer-logo {
          height: 60px;
          object-fit: contain;
        }

        .footer-text {
          color: #94a3b8;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .footer-logos {
            gap: 1.5rem;
          }

          .footer-logo {
            height: 50px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;