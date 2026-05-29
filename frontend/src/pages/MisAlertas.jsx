import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Trash2,
  Plus,
  Image as ImageIcon
} from 'lucide-react';

import api from '../services/api.config';
import ImageGalleryModal from '../components/ImageGalleryModal';

const AlertaItem = ({ alerta, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString(
      'es-ES',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    );
  };

  return (
    <div className="alert-card">
      <div className="alert-top">
        <span
          className={`alert-badge ${alerta.categoria}`}
        >
          {alerta.categoria}
        </span>
      </div>

      <div className="alert-content">
        <h3>{alerta.titulo}</h3>

        <p className="alert-description">
          {alerta.descripcion}
        </p>

        <div className="alert-meta">
          <div className="meta-item">
            <MapPin size={16} />
            <span>
              {alerta.ubicacion}
            </span>
          </div>

          <div className="meta-item">
            <Calendar size={16} />
            <span>
              {formatDate(
                alerta.created_at
              )}
            </span>
          </div>
        </div>

        {alerta.imagenes_ids &&
          alerta.imagenes_ids.length >
            0 && (
            <div className="gallery-wrapper">
              <ImageGalleryModal
                imageIds={
                  alerta.imagenes_ids
                }
                label="Ver imágenes"
              />
            </div>
          )}
      </div>

      <button
        className="delete-button"
        onClick={() =>
          onDelete(alerta.id)
        }
      >
        <Trash2 size={18} />
        Eliminar alerta
      </button>
    </div>
  );
};

const MisAlertas = () => {
  const navigate = useNavigate();

  const [alertas, setAlertas] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const token =
          localStorage.getItem(
            'user_token'
          );

        if (!token) {
          navigate('/login');
          return;
        }

        const response =
          await api.get(
            '/alertas/mis-alertas'
          );

        setAlertas(
          response.data || []
        );
      } catch (err) {
        const errorMsg =
          err.response?.data?.error ||
          'Error al cargar las alertas';

        setError(errorMsg);

        console.error(
          'Error:',
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAlertas();
  }, [navigate]);

  const handleDelete = async (
    id
  ) => {
    if (
      window.confirm(
        '¿Seguro que deseas eliminar esta alerta?'
      )
    ) {
      try {
        await api.delete(
          `/alertas/${id}`
        );

        setAlertas(
          alertas.filter(
            (a) => a.id !== id
          )
        );

        alert(
          'Alerta eliminada correctamente'
        );
      } catch (err) {
        alert(
          'Error al eliminar: ' +
            (err.response?.data
              ?.error ||
              err.message)
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="mis-alertas-page">
        <div className="loading-box">
          Cargando alertas...
        </div>

        <Styles />
      </div>
    );
  }

  return (
    <>
      <div className="mis-alertas-page">
        <div className="page-header">
          <div>
            <span className="eyebrow">
              🌱 Gestión comunitaria
            </span>

            <h1>
              Mis publicaciones
            </h1>

            <p>
              Administra las alertas
              que has compartido con
              tu comunidad.
            </p>
          </div>

          <button
            className="new-alert-button"
            onClick={() =>
              navigate(
                '/crear-alerta'
              )
            }
          >
            <Plus size={18} />
            Nueva alerta
          </button>
        </div>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {alertas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              🌿
            </div>

            <h2>
              No tienes alertas
              publicadas
            </h2>

            <p>
              Cuando publiques una
              alerta aparecerá aquí
              para que puedas
              administrarla.
            </p>

            <button
              onClick={() =>
                navigate(
                  '/crear-alerta'
                )
              }
              className="create-button"
            >
              <Plus size={18} />
              Crear alerta
            </button>
          </div>
        ) : (
          <div className="alerts-grid">
            {alertas.map(
              (alerta) => (
                <AlertaItem
                  key={alerta.id}
                  alerta={alerta}
                  onDelete={
                    handleDelete
                  }
                />
              )
            )}
          </div>
        )}
      </div>

      <Styles />
    </>
  );
};

const Styles = () => (
  <style>{`
    * {
      box-sizing: border-box;
    }

    .mis-alertas-page {
      width: 100%;
      min-height: 100vh;

      display: flex;
      flex-direction: column;
      align-items: center;

      padding: 40px 20px;

      background:
        linear-gradient(
          180deg,
          #eef7ee,
          #f8fff8
        );
    }

    .page-header {
      width: 100%;
      max-width: 1200px;

      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;

      margin-bottom: 40px;

      flex-wrap: wrap;
    }

    .eyebrow {
      display: inline-flex;

      padding:
        0.7rem
        1rem;

      border-radius: 999px;

      background: #d8f3dc;

      color: #1b4332;

      font-size: 0.9rem;
      font-weight: 800;

      margin-bottom: 1rem;
    }

    .page-header h1 {
      font-size:
        clamp(
          2.5rem,
          5vw,
          4rem
        );

      color: #1b4332;

      margin-bottom: 0.8rem;
    }

    .page-header p {
      color: #52796f;

      font-size: 1.05rem;

      line-height: 1.7;

      max-width: 650px;
    }

    .new-alert-button,
    .create-button {
      border: none;

      display: inline-flex;
      align-items: center;
      gap: 0.7rem;

      background:
        linear-gradient(
          135deg,
          #2d6a4f,
          #1b4332
        );

      color: white;

      padding:
        1rem
        1.4rem;

      border-radius: 18px;

      font-weight: 700;

      cursor: pointer;

      transition: 0.25s ease;

      box-shadow:
        0 16px 30px rgba(
          45,
          106,
          79,
          0.18
        );
    }

    .new-alert-button:hover,
    .create-button:hover {
      transform:
        translateY(-4px);

      box-shadow:
        0 22px 38px rgba(
          45,
          106,
          79,
          0.24
        );
    }

    .alerts-grid {
      width: 100%;
      max-width: 1200px;

      display: grid;

      grid-template-columns:
        repeat(
          auto-fit,
          minmax(330px, 1fr)
        );

      gap: 26px;
    }

    .alert-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      background: white;

      border-radius: 30px;

      padding: 1.7rem;

      border:
        1px solid #dcecdc;

      box-shadow:
        0 18px 36px rgba(
          34,
          84,
          61,
          0.08
        );

      transition: 0.25s ease;
    }

    .alert-card:hover {
      transform:
        translateY(-6px);

      box-shadow:
        0 26px 44px rgba(
          34,
          84,
          61,
          0.12
        );
    }

    .alert-top {
      margin-bottom: 1rem;
    }

    .alert-badge {
      display: inline-flex;

      padding:
        0.55rem
        1rem;

      border-radius: 999px;

      font-size: 0.8rem;
      font-weight: 800;

      text-transform: capitalize;
    }

    .alert-badge.emergencia {
      background: #dcfce7;
      color: #166534;
    }

    .alert-badge.advertencia {
      background: #fef3c7;
      color: #92400e;
    }

    .alert-badge.informacion {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .alert-content h3 {
      color: #1b4332;

      font-size: 1.5rem;

      margin-bottom: 1rem;

      line-height: 1.3;
    }

    .alert-description {
      color: #52796f;

      line-height: 1.8;

      margin-bottom: 1.4rem;
    }

    .alert-meta {
      display: flex;
      flex-direction: column;
      gap: 0.9rem;

      margin-bottom: 1.3rem;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.7rem;

      color: #3d5a40;

      font-size: 0.95rem;

      background: #f4fbf4;

      padding:
        0.85rem
        1rem;

      border-radius: 14px;
    }

    .gallery-wrapper {
      margin-top: 1rem;
    }

    .delete-button {
      margin-top: 1.5rem;

      width: 100%;

      border: none;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.7rem;

      padding: 1rem;

      border-radius: 18px;

      background:
        linear-gradient(
          135deg,
          #ef4444,
          #b91c1c
        );

      color: white;

      font-weight: 700;

      cursor: pointer;

      transition: 0.25s ease;
    }

    .delete-button:hover {
      transform:
        translateY(-3px);

      box-shadow:
        0 18px 32px rgba(
          185,
          28,
          28,
          0.22
        );
    }

    .empty-state {
      width: 100%;
      max-width: 700px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      text-align: center;

      background: white;

      border-radius: 34px;

      padding: 4rem 2rem;

      border:
        1px solid #dcecdc;

      box-shadow:
        0 18px 36px rgba(
          34,
          84,
          61,
          0.08
        );
    }

    .empty-icon {
      font-size: 4rem;

      margin-bottom: 1rem;
    }

    .empty-state h2 {
      color: #1b4332;

      margin-bottom: 1rem;

      font-size: 2rem;
    }

    .empty-state p {
      color: #52796f;

      line-height: 1.8;

      margin-bottom: 2rem;

      max-width: 520px;
    }

    .loading-box,
    .error-box {
      background: white;

      padding:
        1.3rem
        1.5rem;

      border-radius: 20px;

      color: #1b4332;

      font-weight: 700;

      margin-top: 3rem;
    }

    .error-box {
      margin-bottom: 25px;

      background: #fee2e2;

      color: #991b1b;

      width: 100%;
      max-width: 1200px;
    }

    @media (max-width: 768px) {
      .mis-alertas-page {
        padding: 24px 16px;
      }

      .page-header h1 {
        font-size: 2.3rem;
      }

      .alerts-grid {
        grid-template-columns: 1fr;
      }

      .alert-card {
        padding: 1.4rem;
      }

      .empty-state {
        padding: 3rem 1.5rem;
      }
    }
  `}</style>
);

export default MisAlertas;