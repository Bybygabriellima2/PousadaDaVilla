// ============================================
// 8. src/pages/Localizacao.jsx - COMPLETO
// ============================================
import React, { useState, useEffect, useContext } from 'react';
import { XCircle, ChevronLeft, ChevronRight, Navigation, Car } from 'lucide-react';
import { ConfigContext } from '../contexts/ConfigContext';
import { PagesContext } from '../contexts/PagesContext';
import axios from 'axios';
import '../styles/localizacao-styles.css';
import panoramaImg from '../assets/images/noronha-panorama.jpg';

const Localizacao = () => {
  const { config, API_URL } = useContext(ConfigContext);
  const { isComponentActive, fetchPageComponents } = useContext(PagesContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentImageTitle, setCurrentImageTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [arredoresImages, setArredoresImages] = useState([]);

  const getText = (key, defaultText) => config[key] || defaultText;

  useEffect(() => {
    fetchPageComponents('localizacao');
    
    const fetchArredores = async () => {
      try {
        const res = await axios.get(`${API_URL}/gallery`);
        const arredores = res.data.filter(item => item.category === 'arredores');
        setArredoresImages(arredores);
      } catch (err) {
        console.error('Erro ao carregar arredores:', err);
      }
    };
    fetchArredores();
  }, [API_URL]);

  const getImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `http://localhost:3001${path}`;
  };

  const bannerImage = config.local_banner 
    ? getImageUrl(config.local_banner) 
    : panoramaImg;

  const openModal = (image, title, index) => {
    setCurrentImage(image);
    setCurrentImageTitle(title);
    setCurrentIndex(index);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % arredoresImages.length;
    setCurrentIndex(newIndex);
    setCurrentImage(getImageUrl(arredoresImages[newIndex].image_url));
    setCurrentImageTitle(arredoresImages[newIndex].title);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + arredoresImages.length) % arredoresImages.length;
    setCurrentIndex(newIndex);
    setCurrentImage(getImageUrl(arredoresImages[newIndex].image_url));
    setCurrentImageTitle(arredoresImages[newIndex].title);
  };

  // Estilos dinâmicos
  const pageStyles = {
    '--primary-color': config.primary_color || '#0d9488',
    '--card-bg-color': config.card_bg_color || '#ffffff',
    '--card-border-radius': config.card_border_radius || '12px',
    '--card-shadow': config.card_shadow || '0 10px 30px rgba(0,0,0,0.08)',
    '--card-hover-shadow': config.card_hover_shadow || '0 20px 40px rgba(0,0,0,0.15)',
    '--button-primary-bg': config.button_primary_bg || '#0d9488',
    '--button-primary-text': config.button_primary_text || '#ffffff'
  };

  return (
    <div className="localizacao-page-container" style={pageStyles}>
      {isComponentActive('localizacao', 'hero_banner') && (
        <div className="hero-section" style={{ backgroundImage: `url(${bannerImage})` }}>
          <div className="overlay"></div>
          <div className="hero-content">
            <h1>{getText('localizacao_page_title', 'Localização')}</h1>
            <p>{getText('localizacao_subtitle', 'Descubra o paraíso em Fernando de Noronha')}</p>
          </div>
        </div>
      )}

      {isComponentActive('localizacao', 'intro') && (
        <div className="intro-section">
          <h2>{getText('localizacao_intro_title', 'Nossa Localização Privilegiada')}</h2>
          <div className="divider"></div>
          <p>
            {getText('localizacao_intro_text', 'A Pousada da Villa está estrategicamente localizada na encantadora Ilha de Fernando de Noronha, na região da Villa do Trinta. Nossa localização oferece fácil acesso aos principais atrativos naturais da ilha, combinando tranquilidade e conveniência.')}
          </p>
        </div>
      )}

      {isComponentActive('localizacao', 'location_info') && (
        <div className="content-grid">
          <div className="location-info">
            <div className="info-block">
              <div className="info-block-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <h3 className="info-block-title">{getText('localizacao_endereco_title', 'Endereço')}</h3>
              <p className="info-block-text">
                {getText('localizacao_endereco_line1', 'Rua Pinto Branco 206, Vila do Trinta')}
                <br />
                {getText('localizacao_endereco_line2', 'Fernando de Noronha, PE - 53990-000')}
              </p>
            </div>
            
            <div className="info-block">
              <div className="info-block-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>
              <h3 className="info-block-title">{getText('localizacao_contato_title', 'Contato')}</h3>
              <p className="info-block-text">
                <strong>{getText('localizacao_contato_phone_label', 'Telefone:')}</strong> {getText('localizacao_contato_phone', '(81) 3224-4476')}
                <br />
                <strong>{getText('localizacao_contato_whatsapp_label', 'WhatsApp:')}</strong> {getText('localizacao_contato_whatsapp', '(81) 98230-7332')}
              </p>
            </div>
          </div>
          
          {isComponentActive('localizacao', 'map') && (
            <div className="map-container">
              <div className="map-wrapper">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-32.408847%2C-3.848428%2C-32.404847%2C-3.844428&amp;layer=mapnik&amp;marker=-3.846428%2C-32.406847"
                  title={getText('localizacao_map_title', 'Mapa da localização da Pousada da Villa')}
                ></iframe>
              </div>
            </div>
          )}
        </div>
      )}

      {isComponentActive('localizacao', 'arredores_gallery') && (
        <div className="photos-section">
          <h2>{getText('localizacao_arredores_title', 'Conheça Os Arredores')}</h2>
          <div className="divider"></div>
          
          {arredoresImages.length === 0 ? (
            <p style={{textAlign: 'center', color: '#666', padding: '2rem'}}>
              {getText('localizacao_arredores_empty', 'Nenhuma foto dos arredores adicionada ainda. Adicione fotos pelo painel admin!')}
            </p>
          ) : (
            <div className="photos-grid">
              {arredoresImages.map((image, index) => (
                <div 
                  className="photo-card" 
                  key={image.id} 
                  onClick={() => openModal(getImageUrl(image.image_url), image.title, index)}
                >
                  <div className="photo-overlay"><span>{getText('localizacao_click_to_zoom', 'Clique para ampliar')}</span></div>
                  <img src={getImageUrl(image.image_url)} alt={image.title} />
                  <div className="photo-caption"><p>{image.title}</p></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isComponentActive('localizacao', 'transportation') && (
        <div className="transportation-section">
          <h2>{getText('localizacao_transport_title', 'Como Chegar')}</h2>
          <div className="divider"></div>
          <div className="transport-cards">
            <div className="transport-card">
              <div className="transport-icon"><Navigation size={32} /></div>
              <h3>{getText('localizacao_transport_airport_title', 'Do Aeroporto')}</h3>
              <p>{getText('localizacao_transport_airport_text', 'O Aeroporto de Fernando de Noronha (FEN) está a aproximadamente 8 minutos de carro da nossa pousada. Oferecemos serviço de traslado mediante solicitação prévia durante sua reserva.')}</p>
            </div>
            <div className="transport-card">
              <div className="transport-icon"><Car size={32} /></div>
              <h3>{getText('localizacao_transport_island_title', 'Locomoção na Ilha')}</h3>
              <p>{getText('localizacao_transport_island_text', 'Recomendamos o aluguel de buggy ou táxi para se locomover pela ilha. Nossa equipe pode ajudar a organizar o aluguel de veículos durante sua estadia para total comodidade.')}</p>
            </div>
          </div>
        </div>
      )}

      {modalOpen && arredoresImages.length > 0 && (
        <div className="image-modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}><XCircle size={32} /></button>
            <div className="modal-image-container">
              <img src={currentImage} alt={currentImageTitle} />
              <div className="modal-caption"><p>{currentImageTitle}</p></div>
            </div>
            <div className="modal-nav">
              <button className="nav-button prev" onClick={prevImage}><ChevronLeft size={36} /></button>
              <button className="nav-button next" onClick={nextImage}><ChevronRight size={36} /></button>
            </div>
          </div>
          <div className="modal-overlay" onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
};

export default Localizacao;