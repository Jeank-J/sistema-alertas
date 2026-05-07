import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.config';
import { isTokenValid } from '../utils/auth';

const TypeCard = ({ type, icon, label, desc, isSelected, onChange }) => (
  <div className="type-card">
    <input 
      type="radio" 
      name="alert-type" 
      value={type} 
      id={type}
      checked={isSelected}
      onChange={onChange}
    />
    <label htmlFor={type}>
      <span className="icon">{icon}</span>
      <span className="label">{label}</span>
      <span className="desc">{desc}</span>
    </label>
  </div>
);

const CrearAlerta = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImageIds, setUploadedImageIds] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    setFormData(prev => ({
      ...prev,
      categoria: e.target.value
    }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(files);
  };

  const uploadImages = async () => {
    if (selectedImages.length === 0) return { success: true, ids: [] };

    setUploadingImage(true);
    try {
      const imageIds = [];
      
      for (const file of selectedImages) {
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        const response = await api.post('/imagenes', formDataUpload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        imageIds.push(response.data.id);
      }

      setUploadedImageIds(imageIds);
      setSelectedImages([]);
      setUploadingImage(false);
      return { success: true, ids: imageIds };
    } catch (err) {
      setError(`Error al subir imágenes: ${err.response?.data?.error || err.message}`);
      setUploadingImage(false);
      return { success: false, ids: [] };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.titulo || !formData.descripcion || !formData.ubicacion) {
        setError('Por favor completa todos los campos');
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('user_token');
      if (!token) {
        setError('Debes iniciar sesión para crear alertas');
        navigate('/login');
        return;
      }

      let imageIds = [];
      if (selectedImages.length > 0) {
        const uploadResult = await uploadImages();
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
      console.log('Enviando alerta con datos:', alertaData);
      const response = await api.post('/alertas', alertaData);
      
      setFormData({
        titulo: '',
        descripcion: '',
        ubicacion: '',
        categoria: 'emergencia',
        severidad: 'media'
      });
      setUploadedImageIds([]);

      alert('¡Alerta creada exitosamente!');
      navigate('/mis-alertas');
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Error al crear la alerta';
      setError(errorMsg);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h2>Crear Nueva Alerta</h2>
      {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px', padding: '10px', backgroundColor: '#ffe0e0', borderRadius: '4px' }}>{error}</div>}
      
      <form className="alert-form" onSubmit={handleSubmit}>
        <label>¿Qué tipo de evento es?</label>
        <div className="alert-type-selector" style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <TypeCard 
            type="emergencia" 
            icon="🚨" 
            label="Emergencia" 
            desc="Atención inmediata"
            isSelected={formData.categoria === 'emergencia'}
            onChange={handleCategoryChange}
          />
          <TypeCard 
            type="advertencia" 
            icon="⚠️" 
            label="Advertencia" 
            desc="Prevención"
            isSelected={formData.categoria === 'advertencia'}
            onChange={handleCategoryChange}
          />
          <TypeCard 
            type="informacion" 
            icon="ℹ️" 
            label="Información" 
            desc="Aviso general"
            isSelected={formData.categoria === 'informacion'}
            onChange={handleCategoryChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Título del evento</label>
          <input 
            type="text" 
            name="titulo"
            placeholder="Ej: Corte de energía en el sector norte" 
            value={formData.titulo}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            required 
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Descripción detallada</label>
          <textarea 
            rows="4" 
            name="descripcion"
            placeholder="Explica brevemente lo que sucede..." 
            value={formData.descripcion}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'inherit', boxSizing: 'border-box' }}
            required 
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Ubicación</label>
          <input 
            type="text" 
            name="ubicacion"
            placeholder="Ej: Calle Principal, Barrio Centro" 
            value={formData.ubicacion}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            required 
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Severidad</label>
          <select 
            name="severidad"
            value={formData.severidad}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
            <option value="critica">Crítica</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>📷 Adjuntar Fotos (máx. 5MB cada una)</label>
          <input 
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageSelect}
            style={{ display: 'block', marginBottom: '10px', cursor: 'pointer' }}
          />
          {selectedImages.length > 0 && (
            <div style={{ padding: '10px', backgroundColor: '#e8f5e9', borderRadius: '4px', marginBottom: '10px' }}>
              <p style={{ margin: '0 0 10px 0', color: '#2e7d32', fontWeight: 'bold' }}>
                ✓ {selectedImages.length} imagen(es) seleccionada(s)
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {selectedImages.map((img, idx) => (
                  <div key={idx} style={{ fontSize: '12px', color: '#555' }}>
                    {img.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          {uploadedImageIds.length > 0 && (
            <div style={{ padding: '10px', backgroundColor: '#c8e6c9', borderRadius: '4px' }}>
              <p style={{ margin: '0', color: '#1b5e20', fontWeight: 'bold' }}>
                ✓ {uploadedImageIds.length} imagen(es) subida(s) correctamente
              </p>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading || uploadingImage}
          style={{
            width: '100%',
            padding: '12px',
            background: loading || uploadingImage ? '#ccc' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading || uploadingImage ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            opacity: loading || uploadingImage ? 0.6 : 1
          }}
        >
          {uploadingImage ? 'Subiendo imágenes...' : loading ? 'Publicando...' : 'Publicar Alerta'}
        </button>
      </form>
    </div>
  );
};

export default CrearAlerta;