// src/pages/admin/SiteImages.jsx - VERSÃO PROFISSIONAL COMPLETA
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ConfigContext } from '../../contexts/ConfigContext';
import { Upload, Loader, Trash2, Image as ImageIcon, Plus, Check, X, Save, RotateCcw, Eye, RefreshCw } from 'lucide-react';

const SiteImages = () => {
  const { config, fetchConfig, API_URL } = useContext(ConfigContext);
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  
  const [localConfig, setLocalConfig] = useState({});
  const [galleries, setGalleries] = useState({ 
    pousada: [], 
    quartos: [], 
    arredores: [] 
  });
  
  const [pendingImages, setPendingImages] = useState({});
  const [pendingGalleries, setPendingGalleries] = useState({
    pousada: [],
    quartos: [],
    arredores: []
  });
  
  const [toDelete, setToDelete] = useState([]);
  const [previewModal, setPreviewModal] = useState({ open: false, src: '', title: '' });

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const fetchGalleries = async () => {
    try {
      const res = await axios.get(`${API_URL}/gallery`);
      const data = res.data;
      
      setGalleries({
        pousada: data.filter(item => item.category === 'pousada'),
        quartos: data.filter(item => item.category === 'quartos'),
        arredores: data.filter(item => item.category === 'arredores')
      });
    } catch (err) {
      console.error("Erro ao carregar galerias", err);
    }
  };

  useEffect(() => { 
    fetchGalleries(); 
  }, [API_URL]);

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('blob:')) return path;
    return path.startsWith('http') ? path : `http://localhost:3001${path}`;
  };

  const handleStaticUpload = (e, configKey) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const previewUrl = URL.createObjectURL(file);
    
    setLocalConfig(prev => ({
      ...prev,
      [configKey]: previewUrl
    }));
    
    setPendingImages(prev => ({
      ...prev,
      [configKey]: file
    }));
    
    setHasChanges(true);
  };

  const handleReplaceStatic = (configKey) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => handleStaticUpload(e, configKey);
    input.click();
  };

  const handleRemoveStatic = (configKey) => {
    setLocalConfig(prev => ({
      ...prev,
      [configKey]: ''
    }));
    
    setPendingImages(prev => {
      const newPending = { ...prev };
      delete newPending[configKey];
      return newPending;
    });
    
    setHasChanges(true);
  };

  const handleGalleryUpload = (e, category) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const previewUrl = URL.createObjectURL(file);
    const newImage = {
      id: `temp-${Date.now()}`,
      image_url: previewUrl,
      title: `Foto ${category}`,
      category: category,
      file: file,
      isNew: true
    };
    
    setPendingGalleries(prev => ({
      ...prev,
      [category]: [...prev[category], newImage]
    }));
    
    setHasChanges(true);
  };

  const markForDelete = (id, category) => {
    if (String(id).startsWith('temp-')) {
      setPendingGalleries(prev => ({
        ...prev,
        [category]: prev[category].filter(img => img.id !== id)
      }));
    } else {
      setToDelete(prev => [...prev, id]);
      setHasChanges(true);
    }
  };

  const handleCancel = () => {
    if (!window.confirm('Descartar todas as alterações?')) return;
    
    Object.values(pendingImages).forEach(file => {
      if (file instanceof File) {
        URL.revokeObjectURL(URL.createObjectURL(file));
      }
    });
    
    setLocalConfig(config);
    setPendingImages({});
    setPendingGalleries({ pousada: [], quartos: [], arredores: [] });
    setToDelete([]);
    setHasChanges(false);
  };

  const handleSaveAll = async () => {
    setLoading({ saving: true });
    
    try {
      for (const [key, file] of Object.entries(pendingImages)) {
        if (file instanceof File) {
          const formData = new FormData();
          formData.append('photo', file);
          formData.append('title', key);
          
          const res = await axios.post(`${API_URL}/upload`, formData);
          localConfig[key] = res.data.url;
        }
      }
      
      await axios.post(`${API_URL}/config`, localConfig);
      
      for (const [category, images] of Object.entries(pendingGalleries)) {
        for (const img of images) {
          if (img.isNew && img.file) {
            const formData = new FormData();
            formData.append('photo', img.file);
            formData.append('category', category);
            formData.append('title', img.title);
            
            await axios.post(`${API_URL}/upload-gallery`, formData);
          }
        }
      }
      
      for (const id of toDelete) {
        await axios.delete(`${API_URL}/gallery/${id}`);
      }
      
      await fetchConfig();
      await fetchGalleries();
      
      setPendingImages({});
      setPendingGalleries({ pousada: [], quartos: [], arredores: [] });
      setToDelete([]);
      setHasChanges(false);
      
      showSuccessToast('Todas as alterações foram salvas com sucesso!');
      
    } catch (err) {
      alert('Erro ao salvar: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading({});
    }
  };

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const openPreview = (src, title) => {
    setPreviewModal({ open: true, src: getImageUrl(src), title });
  };

  const closePreview = () => {
    setPreviewModal({ open: false, src: '', title: '' });
  };

  // Componente de Imagem Única
  const ImageInput = ({ label, configKey, description, fallbackSrc }) => {
    const currentImage = localConfig[configKey];
    const hasImage = currentImage && currentImage !== '';
    const isPending = pendingImages[configKey];
    
    return (
      <div className="image-input-card">
        <div className="image-input-header">
          <div>
            <h4 className="image-input-title">{label}</h4>
            {description && <p className="image-input-description">{description}</p>}
          </div>
          {isPending && <span className="pending-badge">Pendente</span>}
        </div>
        
        <div className="image-input-content">
          <div className="image-preview-container">
            {hasImage ? (
              <>
                <img 
                  src={getImageUrl(currentImage)} 
                  className="image-preview" 
                  alt={label}
                  onClick={() => openPreview(currentImage, label)}
                />
                <div className="image-overlay">
                  <button
                    onClick={() => openPreview(currentImage, label)}
                    className="overlay-btn preview-btn"
                    title="Visualizar"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleReplaceStatic(configKey)}
                    className="overlay-btn replace-btn"
                    title="Substituir"
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button
                    onClick={() => handleRemoveStatic(configKey)}
                    className="overlay-btn delete-btn"
                    title="Remover"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </>
            ) : fallbackSrc ? (
              <>
                <img 
                  src={fallbackSrc} 
                  className="image-preview fallback" 
                  alt="Imagem padrão"
                />
                <div className="fallback-overlay">
                  <span className="fallback-text">Imagem Padrão</span>
                </div>
              </>
            ) : (
              <div className="empty-image">
                <ImageIcon size={48} />
                <span>Nenhuma imagem</span>
              </div>
            )}
          </div>
          
          <label className="upload-button">
            <Upload size={18}/> {hasImage ? 'Substituir' : 'Adicionar'} Imagem
            <input 
              type="file" 
              hidden 
              accept="image/*"
              onChange={(e) => handleStaticUpload(e, configKey)}
            />
          </label>
        </div>
      </div>
    );
  };

  // Componente de Galeria
  const GalleryManager = ({ title, category, description }) => {
    const savedImages = galleries[category] || [];
    const newImages = pendingGalleries[category] || [];
    const allImages = [...savedImages, ...newImages].filter(img => !toDelete.includes(img.id));
    
    return (
      <div className="gallery-manager-card">
        <div className="gallery-header">
          <div>
            <h3 className="gallery-title">{title}</h3>
            {description && <p className="gallery-description">{description}</p>}
          </div>
          
          <label className="upload-button primary">
            <Plus size={20}/> Adicionar Foto
            <input 
              type="file" 
              hidden 
              accept="image/*"
              onChange={(e) => handleGalleryUpload(e, category)} 
            />
          </label>
        </div>
        
        {allImages.length === 0 ? (
          <div className="empty-gallery">
            <ImageIcon size={64} />
            <p>Nenhuma foto adicionada ainda</p>
            <span>Clique em "Adicionar Foto" para começar</span>
          </div>
        ) : (
          <div className="gallery-grid">
            {allImages.map(item => (
              <div key={item.id} className={`gallery-item ${item.isNew ? 'new-item' : ''}`}>
                <img 
                  src={getImageUrl(item.image_url)} 
                  alt={item.title}
                  onClick={() => openPreview(item.image_url, item.title)}
                />
                {item.isNew && <div className="new-badge">NOVA</div>}
                <div className="gallery-item-overlay">
                  <button
                    onClick={() => openPreview(item.image_url, item.title)}
                    className="gallery-btn preview-btn"
                    title="Visualizar"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => markForDelete(item.id, category)}
                    className="gallery-btn delete-btn"
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const tabs = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'pousada', label: 'Pousada', icon: '🏨' },
    { key: 'quartos', label: 'Quartos', icon: '🛏️' },
    { key: 'localizacao', label: 'Localização', icon: '📍' },
    { key: 'contato', label: 'Contato', icon: '📞' }
  ];

  return (
    <div className="site-images-container">
      {/* Header */}
      <div className="site-images-header">
        <div>
          <h2 className="page-title">Gerenciar Imagens do Site</h2>
          <p className="page-subtitle">Organize todas as imagens das páginas do site</p>
        </div>
        
        {hasChanges && (
          <div className="header-actions">
            <button onClick={handleCancel} className="btn-secondary">
              <X size={18}/> Cancelar
            </button>
            <button onClick={handleSaveAll} disabled={loading.saving} className="btn-primary">
              {loading.saving ? (
                <><Loader className="spin" size={18}/> Salvando...</>
              ) : (
                <><Save size={18}/> Salvar Tudo</>
              )}
            </button>
          </div>
        )}
      </div>
      
      {/* Tabs */}
      <div className="tabs-container">
        {tabs.map(tab => (
          <button 
            key={tab.key} 
            onClick={() => setActiveTab(tab.key)}
            className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="tab-content">
        {activeTab === 'home' && (
          <>
            <div className="section-header">
              <h3>Carrossel Principal</h3>
              <p>Imagens que aparecem no carrossel da página inicial</p>
            </div>
            <div className="images-grid">
              <ImageInput label="Slide 1" configKey="home_slide_1" description="Primeira imagem do carrossel" />
              <ImageInput label="Slide 2" configKey="home_slide_2" description="Segunda imagem do carrossel" />
              <ImageInput label="Slide 3" configKey="home_slide_3" description="Terceira imagem do carrossel" />
            </div>
            
            <div className="section-header">
              <h3>Seção de Informações</h3>
              <p>Cards informativos da página inicial</p>
            </div>
            <div className="images-grid">
              <ImageInput label="Card A Pousada" configKey="home_info_pousada" description="Imagem do card da pousada" />
              <ImageInput label="Card Quartos" configKey="home_info_quartos" description="Imagem do card de quartos" />
              <ImageInput label="Card Localização" configKey="home_info_localizacao" description="Imagem do card de localização" />
            </div>
          </>
        )}

        {activeTab === 'pousada' && (
          <>
            <div className="section-header">
              <h3>Banner da Página</h3>
            </div>
            <div className="images-grid single">
              <ImageInput label="Banner Principal" configKey="pousada_banner" description="Imagem de destaque da página A Pousada" />
            </div>
            
            <GalleryManager 
              title="Galeria da Pousada" 
              category="pousada" 
              description="Fotos do interior, jardim, café da manhã e áreas comuns"
            />
          </>
        )}

        {activeTab === 'quartos' && (
          <>
            <div className="section-header">
              <h3>Banners dos Quartos</h3>
            </div>
            <div className="images-grid">
              <ImageInput label="Banner Quarto Misto" configKey="quartos_triplo_banner" description="Imagem principal do quarto misto" />
              <ImageInput label="Banner Quarto Casal" configKey="quartos_casal_banner" description="Imagem principal do quarto de casal" />
            </div>
            
            <GalleryManager 
              title="Galeria dos Quartos" 
              category="quartos" 
              description="Detalhes dos quartos, banheiros e comodidades"
            />
          </>
        )}

        {activeTab === 'localizacao' && (
          <>
            <div className="section-header">
              <h3>Banner da Página</h3>
            </div>
            <div className="images-grid single">
              <ImageInput label="Banner Localização" configKey="local_banner" description="Imagem de destaque da página de localização" />
            </div>
            
            <GalleryManager 
              title="Fotos dos Arredores" 
              category="arredores" 
              description="Praias, mirantes, pontos turísticos e arredores de Noronha"
            />
          </>
        )}

        {activeTab === 'contato' && (
          <>
            <div className="section-header">
              <h3>Banner da Página</h3>
            </div>
            <div className="images-grid single">
              <ImageInput label="Banner Contato" configKey="contato_banner" description="Imagem de destaque da página de contato" />
            </div>
          </>
        )}
      </div>

      {/* Preview Modal */}
      {previewModal.open && (
        <div className="preview-modal" onClick={closePreview}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-preview" onClick={closePreview}>
              <X size={24} />
            </button>
            <img src={previewModal.src} alt={previewModal.title} />
            <div className="preview-title">{previewModal.title}</div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="toast-notification">
          <Check size={20} />
          <span>{toastMessage}</span>
        </div>
      )}

      <style>{`
        .site-images-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .site-images-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .page-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.5rem 0;
        }

        .page-subtitle {
          color: #64748b;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-primary, .btn-secondary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.95rem;
        }

        .btn-primary {
          background: #10b981;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #059669;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #64748b;
          color: white;
        }

        .btn-secondary:hover {
          background: #475569;
        }

        .tabs-container {
          display: flex;
          gap: 0.5rem;
          border-bottom: 2px solid #e2e8f0;
          margin-bottom: 2rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .tab-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          border: none;
          background: transparent;
          color: #64748b;
          cursor: pointer;
          border-radius: 8px 8px 0 0;
          font-weight: 600;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .tab-button:hover {
          background: #f8fafc;
          color: #0d9488;
        }

        .tab-button.active {
          background: #0d9488;
          color: white;
        }

        .tab-icon {
          font-size: 1.25rem;
        }

        .tab-content {
          min-height: 400px;
        }

        .section-header {
          margin: 2rem 0 1.5rem;
        }

        .section-header h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.5rem 0;
        }

        .section-header p {
          color: #64748b;
          margin: 0;
        }

        .images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .images-grid.single {
          grid-template-columns: 1fr;
          max-width: 600px;
        }

        .image-input-card {
          background: white;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          overflow: hidden;
          transition: all 0.3s;
        }

        .image-input-card:hover {
          border-color: #0d9488;
          box-shadow: 0 8px 24px rgba(13, 148, 136, 0.1);
        }

        .image-input-header {
          padding: 1.25rem;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }

        .image-input-title {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 0.25rem 0;
        }

        .image-input-description {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .pending-badge {
          padding: 0.25rem 0.75rem;
          background: #fef3c7;
          color: #92400e;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .image-input-content {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .image-preview-container {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          background: #f8fafc;
          border-radius: 8px;
          overflow: hidden;
          border: 2px dashed #cbd5e1;
        }

        .image-preview {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .image-preview:hover {
          transform: scale(1.05);
        }

        .image-preview.fallback {
          opacity: 0.5;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          gap: 0.5rem;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .image-preview-container:hover .image-overlay {
          opacity: 1;
        }

        .overlay-btn {
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .preview-btn {
          background: #3b82f6;
          color: white;
        }

        .preview-btn:hover {
          background: #2563eb;
        }

        .replace-btn {
          background: #0d9488;
          color: white;
        }

        .replace-btn:hover {
          background: #0f766e;
        }

        .delete-btn {
          background: #ef4444;
          color: white;
        }

        .delete-btn:hover {
          background: #dc2626;
        }

        .fallback-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .empty-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #cbd5e1;
          gap: 0.5rem;
        }

        .empty-image span {
          font-size: 0.875rem;
        }

        .upload-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          background: #0d9488;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .upload-button:hover {
          background: #0f766e;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
        }

        .upload-button.primary {
          padding: 0.875rem 1.75rem;
          font-size: 1rem;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .gallery-item:hover img {
          transform: scale(1.1);
        }

        .new-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #10b981;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          z-index: 2;
        }

        .gallery-item-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          gap: 0.5rem;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .gallery-item:hover .gallery-item-overlay {
          opacity: 1;
        }

        .gallery-btn {
          padding: 0.625rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .gallery-btn.preview-btn {
          background: #3b82f6;
          color: white;
        }

        .gallery-btn.preview-btn:hover {
          background: #2563eb;
        }

        .gallery-btn.delete-btn {
          background: #ef4444;
          color: white;
        }

        .gallery-btn.delete-btn:hover {
          background: #dc2626;
        }

        .preview-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 2rem;
        }

        .preview-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          background: white;
          border-radius: 12px;
          overflow: hidden;
        }

        .preview-content img {
          width: 100%;
          height: auto;
          max-height: calc(90vh - 4rem);
          object-fit: contain;
        }

        .close-preview {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          z-index: 10;
        }

        .close-preview:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: rotate(90deg);
        }

        .preview-title {
          padding: 1rem;
          background: #f8fafc;
          font-weight: 600;
          color: #1e293b;
          text-align: center;
        }

        .toast-notification {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: #10b981;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
          z-index: 9999;
          animation: slideIn 0.3s ease;
          font-weight: 600;
        }

        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .images-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }

          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .site-images-container {
            padding: 1rem;
          }

          .site-images-header {
            flex-direction: column;
            align-items: stretch;
          }

          .header-actions {
            width: 100%;
            justify-content: stretch;
          }

          .btn-primary, .btn-secondary {
            flex: 1;
            justify-content: center;
          }

          .tabs-container {
            gap: 0.25rem;
          }

          .tab-button {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
          }

          .tab-label {
            display: none;
          }

          .tab-icon {
            font-size: 1.5rem;
          }

          .images-grid {
            grid-template-columns: 1fr;
          }

          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          }

          .gallery-header {
            flex-direction: column;
            align-items: stretch;
          }

          .upload-button.primary {
            width: 100%;
          }

          .preview-modal {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.5rem;
          }

          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .tab-icon {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SiteImages
      