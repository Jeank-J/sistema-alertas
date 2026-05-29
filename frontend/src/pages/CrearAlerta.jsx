import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ShieldAlert,
  Info,
  MapPin,
  Image as ImageIcon,
  Send,
  Trees
} from 'lucide-react';

import api from '../services/api.config';
import { isTokenValid } from '../utils/auth';

const TypeCard = ({
  type,
  icon,
  label,
  desc,
  isSelected,
  onChange
}) => (
  <div
    className={`type-card ${
      isSelected ? 'selected' : ''
    }`}
  >
    <input
      type="radio"
      name="alert-type"
      value={type}
      id={type}
      checked={isSelected}
      onChange={onChange}
    />

    <label htmlFor={type}>
      <div className="type-icon">
        {icon}
      </div>

      <div className="type-info">
        <span className="type-label">
          {label}
        </span>

        <span className="type-desc">
          {desc}
        </span>
      </div>
    </label>
  </div>
);

const CrearAlerta = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const [selectedImages, setSelectedImages] =
    useState([]);

  const [uploadedImageIds, setUploadedImageIds] =
    useState([]);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [formData, setFormData] =
    useState({
      titulo: '',
      descripcion: '',
      ubicacion: '',
      categoria: 'emergencia',
      severidad: 'media'
    });

  useEffect(() => {
    if (!isTokenValid()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      categoria: e.target.value
    }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    setSelectedImages(files);
  };

  const uploadImages = async () => {
    if (selectedImages.length === 0) {
      return {
        success: true,
        ids: []
      };
    }

    setUploadingImage(true);

    try {
      const imageIds = [];

      for (const file of selectedImages) {
        const formDataUpload =
          new FormData();

        formDataUpload.append(
          'file',
          file
        );

        const response = await api.post(
          '/imagenes',
          formDataUpload,
          {
            headers: {
              'Content-Type':
                'multipart/form-data'
            }
          }
        );

        imageIds.push(response.data.id);
      }

      setUploadedImageIds(imageIds);

      setSelectedImages([]);

      setUploadingImage(false);

      return {
        success: true,
        ids: imageIds
      };
    } catch (err) {
      setError(
        `Error al subir imágenes: ${
          err.response?.data?.error ||
          err.message
        }`
      );

      setUploadingImage(false);

      return {
        success: false,
        ids: []
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      if (
        !formData.titulo ||
        !formData.descripcion ||
        !formData.ubicacion
      ) {
        setError(
          'Por favor completa todos los campos'
        );

        setLoading(false);

        return;
      }

      const token =
        localStorage.getItem(
          'user_token'
        );

      if (!token) {
        setError(
          'Debes iniciar sesión para crear alertas'
        );

        navigate('/login');

        return;
      }

      let imageIds = [];

      if (selectedImages.length > 0) {
        const uploadResult =
          await uploadImages();

        if (!uploadResult.success) {
          setLoading(false);

          return;
        }

        imageIds = uploadResult.ids;
      }

      const alertaData = {
        ...formData,
        imagenes_ids: imageIds
      };

      await api.post(
        '/alertas',
        alertaData
      );

      setFormData({
        titulo: '',
        descripcion: '',
        ubicacion: '',
        categoria: 'emergencia',
        severidad: 'media'
      });

      setUploadedImageIds([]);

      alert(
        '¡Alerta creada exitosamente!'
      );

      navigate('/mis-alertas');
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Error al crear la alerta';

      setError(errorMsg);

      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .page-shell {
          min-height: 100vh;

          padding: 40px;

          background:
            linear-gradient(
              180deg,
              #eef7ee,
              #f8fff8
            );
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;

          margin-bottom: 40px;

          flex-wrap: wrap;
        }

        .header-content {
          max-width: 760px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;

          background: #d8f3dc;

          color: #1b4332;

          padding:
            0.8rem
            1.2rem;

          border-radius: 999px;

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

          line-height: 1.05;

          color: #1b4332;

          margin-bottom: 1rem;
        }

        .page-header p {
          color: #52796f;

          font-size: 1.1rem;

          line-height: 1.9;
        }

        .header-badge {
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

          border-radius: 24px;

          font-weight: 700;

          box-shadow:
            0 18px 36px rgba(
              45,
              106,
              79,
              0.18
            );
        }

        .form-layout {
          display: grid;

          grid-template-columns:
            320px
            1fr;

          gap: 28px;
        }

        .side-panel {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-card {
          background: white;

          border-radius: 28px;

          padding: 1.8rem;

          border:
            1px solid #dcecdc;

          box-shadow:
            0 14px 30px rgba(
              34,
              84,
              61,
              0.06
            );
        }

        .info-card h3,
        .info-card h4 {
          color: #1b4332;

          margin-bottom: 1rem;
        }

        .info-card p,
        .info-card li {
          color: #52796f;

          line-height: 1.8;
        }

        .info-card ul {
          padding-left: 1.2rem;
        }

        .form-panel {
          background: white;

          border-radius: 34px;

          padding: 2.5rem;

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

        .form-error {
          background: #dcfce7;

          color: #166534;

          border:
            1px solid #bbf7d0;

          padding: 1rem 1.2rem;

          border-radius: 18px;

          margin-bottom: 24px;

          font-weight: 700;
        }

        .form-group {
          margin-bottom: 28px;
        }

        .form-group label {
          display: block;

          margin-bottom: 12px;

          color: #1b4332;

          font-weight: 800;

          font-size: 1rem;
        }

        .alert-type-selector {
          display: grid;

          grid-template-columns:
            repeat(
              auto-fit,
              minmax(200px, 1fr)
            );

          gap: 18px;
        }

        .type-card input {
          display: none;
        }

        .type-card label {
          display: flex;
          align-items: center;
          gap: 1rem;

          background: #f8fff8;

          border:
            2px solid #dcecdc;

          border-radius: 24px;

          padding: 1.3rem;

          cursor: pointer;

          transition: all 0.25s ease;
        }

        .type-card label:hover {
          transform: translateY(-4px);

          border-color: #74c69d;

          box-shadow:
            0 12px 24px rgba(
              45,
              106,
              79,
              0.08
            );
        }

        .type-card.selected label {
          background:
            linear-gradient(
              135deg,
              #2d6a4f,
              #40916c
            );

          color: white;

          border-color: #2d6a4f;

          box-shadow:
            0 16px 30px rgba(
              45,
              106,
              79,
              0.2
            );
        }

        .type-icon {
          width: 62px;
          height: 62px;

          border-radius: 18px;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            rgba(255,255,255,0.12);

          font-size: 1.7rem;
        }

        .type-info {
          display: flex;
          flex-direction: column;
        }

        .type-label {
          font-size: 1rem;
          font-weight: 800;
        }

        .type-desc {
          font-size: 0.92rem;

          opacity: 0.9;

          margin-top: 4px;
        }

        .form-grid {
          display: grid;

          grid-template-columns:
            repeat(
              auto-fit,
              minmax(280px, 1fr)
            );

          gap: 22px;
        }

        .form-grid-full {
          grid-column: 1 / -1;
        }

        .form-input,
        .form-textarea,
        .form-select {
          width: 100%;

          background: #f8fff8;

          border:
            1px solid #dcecdc;

          border-radius: 20px;

          padding:
            1rem
            1.1rem;

          font-size: 1rem;

          color: #1b4332;

          transition: all 0.2s ease;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          outline: none;

          border-color: #40916c;

          background: white;

          box-shadow:
            0 0 0 4px rgba(
              116,
              198,
              157,
              0.2
            );
        }

        .form-textarea {
          min-height: 160px;

          resize: vertical;
        }

        .images-preview {
          margin-top: 12px;

          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .image-name {
          background: #f3fbf4;

          padding:
            0.9rem
            1rem;

          border-radius: 14px;

          color: #2d6a4f;

          font-weight: 600;
        }

        .submit-button {
          width: 100%;

          border: none;

          background:
            linear-gradient(
              135deg,
              #2d6a4f,
              #1b4332
            );

          color: white;

          padding: 1.2rem;

          border-radius: 22px;

          font-size: 1rem;
          font-weight: 800;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;

          cursor: pointer;

          transition: all 0.25s ease;

          box-shadow:
            0 18px 36px rgba(
              45,
              106,
              79,
              0.2
            );
        }

        .submit-button:hover {
          transform:
            translateY(-4px)
            scale(1.01);

          box-shadow:
            0 24px 40px rgba(
              45,
              106,
              79,
              0.28
            );
        }

        .submit-button:disabled {
          opacity: 0.7;

          cursor: not-allowed;

          transform: none;
        }

        @media (max-width: 980px) {
          .form-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .page-shell {
            padding: 20px;
          }

          .form-panel {
            padding: 1.5rem;
          }

          .alert-type-selector {
            grid-template-columns: 1fr;
          }

          .page-header h1 {
            font-size: 2.3rem;
          }
        }
      `}</style>

      <div className="page-shell">
        <div className="page-header">
          <div className="header-content">
            <span className="eyebrow">
              <Trees size={18} />
              Formulario comunitario
            </span>

            <h1>
              Crear una nueva alerta
              comunitaria
            </h1>

            <p>
              Comparte información
              importante para mantener a
              tu comunidad conectada,
              segura y preparada ante
              cualquier situación.
            </p>
          </div>

          <div className="header-badge">
            🌱 Comunicación local activa
          </div>
        </div>

        <div className="form-layout">
          <aside className="side-panel">
            <div className="info-card">
              <h3>
                ¿Cómo hacer un buen
                reporte?
              </h3>

              <p>
                Explica claramente lo que
                sucede, indica la zona
                exacta y añade imágenes si
                es posible.
              </p>
            </div>

            <div className="info-card">
              <h4>
                Consejos rápidos
              </h4>

              <ul>
                <li>
                  Usa títulos claros.
                </li>

                <li>
                  Indica barrio, vereda o
                  sector.
                </li>

                <li>
                  Adjunta fotos para dar
                  contexto.
                </li>

                <li>
                  Selecciona la categoría
                  correcta.
                </li>
              </ul>
            </div>
          </aside>

          <section className="form-panel">
            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  Tipo de alerta
                </label>

                <div className="alert-type-selector">
                  <TypeCard
                    type="emergencia"
                    icon={
                      <ShieldAlert
                        size={28}
                      />
                    }
                    label="Emergencia"
                    desc="Atención inmediata"
                    isSelected={
                      formData.categoria ===
                      'emergencia'
                    }
                    onChange={
                      handleCategoryChange
                    }
                  />

                  <TypeCard
                    type="advertencia"
                    icon={
                      <AlertTriangle
                        size={28}
                      />
                    }
                    label="Advertencia"
                    desc="Prevención"
                    isSelected={
                      formData.categoria ===
                      'advertencia'
                    }
                    onChange={
                      handleCategoryChange
                    }
                  />

                  <TypeCard
                    type="informacion"
                    icon={<Info size={28} />}
                    label="Información"
                    desc="Aviso general"
                    isSelected={
                      formData.categoria ===
                      'informacion'
                    }
                    onChange={
                      handleCategoryChange
                    }
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>
                    Título
                  </label>

                  <input
                    className="form-input"
                    type="text"
                    name="titulo"
                    placeholder="Ej: Derrumbe en vía rural"
                    value={formData.titulo}
                    onChange={
                      handleInputChange
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Ubicación
                  </label>

                  <input
                    className="form-input"
                    type="text"
                    name="ubicacion"
                    placeholder="Ej: Vereda El Progreso"
                    value={formData.ubicacion}
                    onChange={
                      handleInputChange
                    }
                    required
                  />
                </div>

                <div className="form-group form-grid-full">
                  <label>
                    Descripción
                  </label>

                  <textarea
                    className="form-textarea"
                    rows="5"
                    name="descripcion"
                    placeholder="Describe lo ocurrido..."
                    value={
                      formData.descripcion
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Severidad
                  </label>

                  <select
                    className="form-select"
                    name="severidad"
                    value={
                      formData.severidad
                    }
                    onChange={
                      handleInputChange
                    }
                  >
                    <option value="baja">
                      Baja
                    </option>

                    <option value="media">
                      Media
                    </option>

                    <option value="alta">
                      Alta
                    </option>

                    <option value="critica">
                      Crítica
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Adjuntar imágenes
                  </label>

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={
                      handleImageSelect
                    }
                    className="form-input"
                  />
                </div>
              </div>

              {selectedImages.length >
                0 && (
                <div className="info-card">
                  <p>
                    <strong>
                      ✓{' '}
                      {
                        selectedImages.length
                      }
                    </strong>{' '}
                    imagen(es)
                    seleccionada(s)
                  </p>

                  <div className="images-preview">
                    {selectedImages.map(
                      (img, idx) => (
                        <div
                          key={idx}
                          className="image-name"
                        >
                          <ImageIcon
                            size={16}
                          />{' '}
                          {img.name}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {uploadedImageIds.length >
                0 && (
                <div className="info-card">
                  <p>
                    <strong>
                      ✓{' '}
                      {
                        uploadedImageIds.length
                      }
                    </strong>{' '}
                    imagen(es)
                    subida(s)
                    correctamente
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={
                  loading ||
                  uploadingImage
                }
              >
                <Send size={18} />

                {uploadingImage
                  ? 'Subiendo imágenes...'
                  : loading
                  ? 'Publicando alerta...'
                  : 'Publicar alerta'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default CrearAlerta;