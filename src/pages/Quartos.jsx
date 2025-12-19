// ============================================
// 7. src/pages/Quartos.jsx - COMPLETO
// ============================================
import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ConfigContext } from '../contexts/ConfigContext';
import { PagesContext } from '../contexts/PagesContext';
import axios from 'axios';
import '../styles/quartos-styles.css';

import quartoTriploBanner from '../assets/images/quarto-triplo-banner.jpg';
import quartoCasalBanner from '../assets/images/quarto-casal-banner.jpg';

function Quartos() {
  const { config, API_URL } = useContext(ConfigContext);
  const { isComponentActive, fetchPageComponents } = useContext(PagesContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState([]);

  const getText = (key, defaultText) => config[key] || defaultText;

  useEffect(() => {
    fetchPageComponents('quartos');
    
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${API_URL}/gallery`);
        const quartosImages = res.data.filter(item => item.category === 'quartos');
        setGalleryImages(quartosImages);
        setIsLoading(false);
      } catch (err) {
        console.error('Erro ao carregar galeria:', err);
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, [API_URL]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const getImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `http://localhost:3001${path}`;
  };

  const openModal = (imageSrc) => {
    setCurrentImage(imageSrc);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const standardAmenities = [
    getText('quartos_amenity1', 'Ar condicionado'),
    getText('quartos_amenity2', 'Frigobar'),
    getText('quartos_amenity3', 'TV a cabo'),
    getText('quartos_amenity4', 'Banheiro privativo'),
    getText('quartos_amenity5', 'Enxoval 100% algodão egípcio'),
    getText('quartos_amenity6', 'Secador de cabelo'),
    getText('quartos_amenity7', 'Amenities Natura')
  ];

  const triploImage = config.quartos_triplo_banner 
    ? getImageUrl(config.quartos_triplo_banner) 
    : quartoTriploBanner;
  
  const casalImage = config.quartos_casal_banner 
    ? getImageUrl(config.quartos_casal_banner) 
    : quartoCasalBanner;

  // Estilos dinâmicos
  const pageStyles = {
    '--primary-color': config.primary_color || '#0d9488',
    '--card-bg-color': config.card_bg_color || '#ffffff',
    '--card-border-radius': config.card_border_radius || '12px',
    '--card-shadow': config.card_shadow || '0 10px 30px rgba(0,0,0,0.08)',
    '--card-hover-shadow': config.card_hover_shadow || '0 20px 40px rgba(0,0,0,0.15)',
    '--button-primary-bg': config.button_primary_bg || '#0d9488',
    '--button-primary-text': config.button_primary_text || '#ffffff',
    '--button-primary-hover-bg': config.button_primary_hover_bg || '#0f766e'
  };

  return (
    <div className={`quartos-page ${isLoading ? 'loading' : ''}`} style={pageStyles}>
      <Helmet>
        <title>{getText('quartos_meta_title', 'Quartos - Pousada da Villa Fernando de Noronha')}</title>
        <meta name="description" content={getText('quartos_meta_desc', 'Conheça os quartos da Pousada da Villa em Fernando de Noronha, todos equipados com ar condicionado, frigobar, TV e banheiro privativo.')} />
      </Helmet>

      {isComponentActive('quartos', 'hero_banner') && (
        <div className="page-banner">
          <h1>{getText('quartos_page_title', 'NOSSOS QUARTOS')}</h1>
        </div>
      )}

      <section className="quartos-description">
        <div className="container">
          {isComponentActive('quartos', 'description') && (
            <p className="quartos-info">
              {getText('quartos_description', 'São 11 quartos projetados para oferecer o máximo de conforto durante sua estadia em Fernando de Noronha. Todos equipados com ar condicionado, frigobar, cama BOX, TV a cabo, banheiro privativo com banho quente, secador de cabelo e amenities Natura. O enxoval é algodão egípcio 100%, proporcionando uma experiência de descanso premium.')}
            </p>
          )}

          <div className="quartos-grid">
            {isComponentActive('quartos', 'quarto_misto') && (
              <div className="quarto-card">
                <img src={triploImage} alt={getText('quartos_misto_img_alt', 'Quarto Misto da Pousada da Villa')} />
                <div className="quarto-info">
                  <h2>{getText('quartos_misto_title', 'Quarto Misto')}</h2>
                  <p>{getText('quartos_misto_description', 'Quarto espaçoso com camas mistas, ideal para grupos de amigos ou famílias. Conta com todo o conforto e comodidades da pousada, com vista privilegiada para o jardim.')}</p>
                  <ul className="amenities-list">
                    {standardAmenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {isComponentActive('quartos', 'quarto_casal') && (
              <div className="quarto-card">
                <img src={casalImage} alt={getText('quartos_casal_img_alt', 'Quarto Casal da Pousada da Villa')} />
                <div className="quarto-info">
                  <h2>{getText('quartos_casal_title', 'Quarto Casal')}</h2>
                  <p>{getText('quartos_casal_description', 'Quarto confortável com cama de casal, decoração clean e agradável. Perfeito para casais que buscam conforto e privacidade, com ambientação que convida ao relaxamento.')}</p>
                  <ul className="amenities-list">
                    {standardAmenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {isComponentActive('quartos', 'gallery') && (
            <div className="quartos-gallery">
              <h2>{getText('quartos_gallery_title', 'Galeria de Fotos')}</h2>
              
              {galleryImages.length === 0 ? (
                <p style={{textAlign: 'center', color: '#666', padding: '2rem'}}>
                  {getText('quartos_gallery_empty', 'Nenhuma foto adicionada ainda. Adicione fotos pelo painel admin!')}
                </p>
              ) : (
                <div className="gallery-grid">
                  {galleryImages.map((image) => (
                    <div 
                      className="gallery-item" 
                      key={image.id} 
                      onClick={() => openModal(getImageUrl(image.image_url))}
                    >
                      <img src={getImageUrl(image.image_url)} alt={image.title} loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {isComponentActive('quartos', 'cta') && (
            <div className="book-now">
              <h3>{getText('quartos_cta_title', 'Venha se hospedar conosco!')}</h3>
              <p>{getText('quartos_cta_description', 'Reserve já seu quarto e desfrute de momentos inesquecíveis em Fernando de Noronha, com o conforto e a hospitalidade da Pousada da Villa.')}</p>
              <Link to="/contato" className="reservas-btn">{getText('quartos_cta_button', 'Fazer Reserva')}</Link>
            </div>
          )}
        </div>
      </section>

      <div className={`modal ${modalOpen ? 'open' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-modal" onClick={closeModal}>×</button>
          <img src={currentImage} alt={getText('quartos_modal_alt', 'Visualização ampliada')} className="modal-image" />
        </div>
      </div>
    </div>
  );
}

export default Quartos;