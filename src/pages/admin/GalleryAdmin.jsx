// src/pages/admin/GalleryAdmin.jsx - COMPLETO
import React, { useState, useEffect, useContext } from 'react';
import { ConfigContext } from '../../contexts/ConfigContext';
import axios from 'axios';
import { Trash2, Plus, Image as ImageIcon, Loader, Check } from 'lucide-react';

const GalleryAdmin = () => {
  const { API_URL } = useContext(ConfigContext);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadPhotos();
  }, [API_URL]);

  const loadPhotos = async () => {
    try {
      const res = await axios.get(`${API_URL}/gallery`);
      setPhotos(res.data);
    } catch (err) {
      console.error('Erro ao carregar fotos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e, category) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('category', category);
    formData.append('title', `Foto ${category}`);

    setUploading(true);
    try {
      await axios.post(`${API_URL}/upload-gallery`, formData);
      await loadPhotos();
      showSuccessToast('Foto adicionada com sucesso!');
    } catch (err) {
      alert('Erro ao fazer upload: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta foto?')) return;

    try {
      await axios.delete(`${API_URL}/gallery/${id}`);
      await loadPhotos();
      showSuccessToast('Foto excluída com sucesso!');
    } catch (err) {
      alert('Erro ao deletar: ' + (err.response?.data?.error || err.message));
    }
  };

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `http://localhost:3001${path}`;
  };

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(p => p.category === selectedCategory);

  const categories = [
    { key: 'all', label: 'Todas', count: photos.length },
    { key: 'pousada', label: 'Pousada', count: photos.filter(p => p.category === 'pousada').length },
    { key: 'quartos', label: 'Quartos', count: photos.filter(p => p.category === 'quartos').length },
    { key: 'arredores', label: 'Arredores', count: photos.filter(p => p.category === 'arredores').length }
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Loader className="spin" size={32} color="#0d9488" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{
        display:'flex', 
        justifyContent:'space-between', 
        alignItems:'center', 
        marginBottom:'2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2 style={{color: '#1e293b', margin:0}}>Galeria de Fotos</h2>
      </div>

      {/* Filtros de Categoria */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        padding: '1rem',
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: selectedCategory === cat.key ? '#0d9488' : '#f8fafc',
              color: selectedCategory === cat.key ? 'white' : '#475569',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            {cat.label}
            <span style={{
              background: selectedCategory === cat.key ? 'rgba(255,255,255,0.3)' : '#e2e8f0',
              padding: '0.25rem 0.5rem',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Botões de Upload por Categoria */}
      {selectedCategory !== 'all' && (
        <div style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'white',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>
            Adicionar foto em: {categories.find(c => c.key === selectedCategory)?.label}
          </h3>
          <label style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.75rem 1.5rem',
            background: '#0d9488',
            color: 'white',
            borderRadius: '6px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            fontWeight: '500',
            opacity: uploading ? 0.6 : 1
          }}>
            {uploading ? <Loader className="spin" size={18} /> : <Plus size={18} />}
            {uploading ? 'Enviando...' : 'Adicionar Foto'}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleUpload(e, selectedCategory)}
              disabled={uploading}
            />
          </label>
        </div>
      )}

      {/* Grid de Fotos */}
      {filteredPhotos.length === 0 ? (
        <div style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          background: 'white',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <ImageIcon size={64} style={{ margin: '0 auto 1rem', opacity: 0.3, color: '#cbd5e1' }} />
          <h3 style={{ color: '#64748b', marginBottom: '0.5rem' }}>Nenhuma foto encontrada</h3>
          <p style={{ color: '#94a3b8' }}>
            {selectedCategory === 'all' 
              ? 'Adicione fotos usando os botões acima'
              : `Adicione fotos na categoria ${categories.find(c => c.key === selectedCategory)?.label}`
            }
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              style={{
                background: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s',
                position: 'relative'
              }}
              className="photo-card-hover"
            >
              <div style={{
                position: 'relative',
                paddingBottom: '66.67%',
                background: '#f8fafc',
                overflow: 'hidden'
              }}>
                <img
                  src={getImageUrl(photo.image_url)}
                  alt={photo.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                
                {/* Badge da Categoria */}
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(13, 148, 136, 0.9)',
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}>
                  {photo.category}
                </div>

                {/* Botão Delete */}
                <button
                  onClick={() => handleDelete(photo.id)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '8px',
                    background: 'rgba(239, 68, 68, 0.9)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  className="delete-btn"
                  title="Excluir foto"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div style={{ padding: '1rem' }}>
                <p style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  color: '#64748b',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {photo.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: '#10b981',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}>
          <Check size={20} />
          <span style={{ fontWeight: '500' }}>{toastMessage}</span>
        </div>
      )}

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .photo-card-hover:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
        .delete-btn:hover {
          background: rgba(220, 38, 38, 0.9) !important;
        }
      `}</style>
    </div>
  );
};

export default GalleryAdmin;