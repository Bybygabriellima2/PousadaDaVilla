// ============================================
// 6. src/pages/Pousada.jsx - COMPLETO
// ============================================
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ConfigContext } from '../contexts/ConfigContext';
import { PagesContext } from '../contexts/PagesContext';
import axios from 'axios';
import '../styles/pousada-styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  FaWifi,
  FaCoffee,
  FaConciergeBell,
  FaUmbrellaBeach,
  FaLeaf,
  FaMapMarkedAlt
} from 'react-icons/fa';


import pousadaExterior from '../assets/images/pousada-exterior.jpg';

function Pousada() {
  const { config, API_URL } = useContext(ConfigContext);
  const { isComponentActive, fetchPageComponents } = useContext(PagesContext);
  const [modalImage, setModalImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  
  const getText = (key, defaultText) => config[key] || defaultText;
  
  useEffect(() => {
    fetchPageComponents('pousada');
    
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${API_URL}/gallery`);
        const pousadaImages = res.data.filter(item => item.category === 'pousada');
        setGalleryImages(pousadaImages);
      } catch (err) {
        console.error('Erro ao carregar galeria:', err);
      }
    };
    fetchGallery();
  }, [API_URL]);

  const getImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `http://localhost:3001${path}`;
  };

  const openModal = (img) => {
    setModalImage(img);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setModalImage(null);
    document.body.classList.remove('modal-open');
  };

  const features = [
  { icon: <FaWifi />, title: getText('pousada_feature1', 'Wi-Fi Grátis') },
  { icon: <FaCoffee />, title: getText('pousada_feature2', 'Café da manhã') },
  { icon: <FaConciergeBell />, title: getText('pousada_feature3', 'Serviço de Quarto') },
  { icon: <FaUmbrellaBeach />, title: getText('pousada_feature4', 'Próximo à praia') },
  { icon: <FaLeaf />, title: getText('pousada_feature5', 'Jardim') },
  { icon: <FaMapMarkedAlt />, title: getText('pousada_feature6', 'Localização Central') }
];


  const bannerImage = config.pousada_banner 
    ? getImageUrl(config.pousada_banner) 
    : pousadaExterior;

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
    <div className="pousada-page" style={pageStyles}>
      {isComponentActive('pousada', 'hero_banner') && (
        <div 
          className="page-header" 
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '400px'
          }}
        >
          <div className="header-content">
            <h1>{getText('pousada_page_title', 'A POUSADA')}</h1>
            <div className="header-decoration"></div>
          </div>
        </div>
      )}

      <div className="pousada-content">
        {isComponentActive('pousada', 'description') && (
          <section className="pousada-description">
            <div className="container">
              <p>
                {getText('pousada_description_p1', 'Oferece conforto e um conceito rústico/contemporâneo, é decorada com arte e artesanato brasileiro e possui um belo jardim.')}
              </p>
              <p>
                {getText('pousada_description_p2', 'O café da manhã é servido todas as manhãs com frutas da estação, sucos, bolos, pães, queijos, tapiocas, iogurte, entre outras delícias. A pousada da Villa oferece uma ótima relação custo/benefício pra quem quer curtir Noronha mas não abre mão de conforto para a horas de descanso.')}
              </p>
            </div>
          </section>
        )}

        {isComponentActive('pousada', 'gallery') && (
          <section className="pousada-gallery">
            <div className="container">
              <h2>{getText('pousada_gallery_title', 'Nossa Galeria')}</h2>
              
              {galleryImages.length === 0 ? (
                <p style={{textAlign: 'center', color: '#666', padding: '2rem'}}>
                  {getText('pousada_gallery_empty', 'Nenhuma foto adicionada ainda. Adicione fotos pelo painel admin!')}
                </p>
              ) : (
                <div className="gallery-grid">
                  {galleryImages.map((img) => (
                    <div 
                      className="gallery-item" 
                      key={img.id} 
                      onClick={() => openModal({ src: getImageUrl(img.image_url), alt: img.title })}
                    >
                      <div className="gallery-image-wrapper">
                        <img src={getImageUrl(img.image_url)} alt={img.title} />
                        <div className="gallery-overlay">
                          <i className="fas fa-search-plus"></i>
                        </div>
                      </div>
                      <p className="image-caption">{img.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {isComponentActive('pousada', 'features') && (
          <section className="pousada-features">
            <div className="container">
              <h2>{getText('pousada_features_title', 'Nossas Comodidades')}</h2>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div className="feature-item" key={index}>
                    <div className="feature-icon">
                      {feature.icon}
                    </div>
                    <h3>{feature.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {isComponentActive('pousada', 'cta') && (
          <section className="pousada-cta">
            <div className="container">
              <h2>{getText('pousada_cta_title', 'Venha conhecer nossa pousada')}</h2>
              <p>{getText('pousada_cta_description', 'Oferecemos a melhor experiência em Fernando de Noronha com conforto e autenticidade.')}</p>
              <Link to="/contato" className="cta-button">
                {getText('pousada_cta_button', 'Faça sua Reserva')}
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </section>
        )}
      </div>

      {modalImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </span>
            <img src={modalImage.src} alt={modalImage.alt} />
            <p className="modal-caption">{modalImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pousada;