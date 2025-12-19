
// ============================================
// 2. src/components/InfoSection.jsx - COMPLETO
// ============================================
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ConfigContext } from '../contexts/ConfigContext';
import '../styles/InfoSection.css';

import gardenImage from '../assets/images/pousada-garden.jpg';
import roomInteriorImage from '../assets/images/pousada-room-interior.jpg';
import beachViewImage from '../assets/images/pousada-beach-view.jpg';

function InfoSection() {
  const { config } = useContext(ConfigContext);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.querySelector('.info-section');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  }, []);

  const getImageUrl = (configKey, fallback) => {
    if (config[configKey]) {
      return config[configKey].startsWith('http') 
        ? config[configKey] 
        : `http://localhost:3001${config[configKey]}`;
    }
    return fallback;
  };

  const getText = (key, defaultText) => config[key] || defaultText;

  const infoCards = [
    {
      image: getImageUrl('home_info_pousada', gardenImage),
      alt: "Área externa da pousada",
      title: getText('home_info_pousada_title', 'A POUSADA'),
      text: getText('home_info_pousada_text', 'Oferece conforto e um conceito rústico/contemporâneo, é decorada com arte e artesanato brasileiro, possui um belo jardim e um excelente café da manhã.'),
      link: "/a-pousada"
    },
    {
      image: getImageUrl('home_info_quartos', roomInteriorImage),
      alt: "Quarto da pousada",
      title: getText('home_info_quartos_title', 'QUARTOS'),
      text: getText('home_info_quartos_text', 'São 11 quartos equipados com ar condicionado, frigobar, cama BOX, TV a cabo, banheiro privativo com banho quente, secador de cabelo e amenities Natura. O enxoval é em algodão egípcio 100%.'),
      link: "/quartos"
    },
    {
      image: getImageUrl('home_info_localizacao', beachViewImage),
      alt: "Praia de Fernando de Noronha",
      title: getText('home_info_localizacao_title', 'LOCALIZAÇÃO'),
      text: getText('home_info_localizacao_text', 'A pousada está localizada na Ilha de Fernando de Noronha, na Villa do Trinta, próxima a restaurantes, mercados e outras conveniências.'),
      link: "/localizacao"
    }
  ];

  // Estilos dinâmicos
  const sectionStyles = {
    '--info-section-bg': config.info_section_bg || '#f8f9fa',
    '--info-card-hover-transform': config.info_card_hover_transform || 'translateY(-10px)',
    '--card-bg-color': config.card_bg_color || '#ffffff',
    '--card-border-radius': config.card_border_radius || '12px',
    '--card-shadow': config.card_shadow || '0 10px 30px rgba(0,0,0,0.08)',
    '--card-hover-shadow': config.card_hover_shadow || '0 20px 40px rgba(0,0,0,0.15)',
    '--card-title-color': config.card_title_color || '#138676'
  };

  return (
    <section 
      className={`info-section ${isVisible ? 'visible' : ''}`}
      style={sectionStyles}
    >
      <div className="info-heading">
        <h2>{getText('home_info_heading', 'Conheça Nossa Pousada')}</h2>
        <div className="info-description">
          <p>{getText('home_info_description', 'Uma experiência única em Fernando de Noronha')}</p>
        </div>
      </div>
      
      <div className="info-container">
        {infoCards.map((card, index) => (
          <div 
            className="info-card" 
            key={index}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="info-image-wrapper">
              <div className="info-image-container">
                <img src={card.image} alt={card.alt} className="info-image" />
              </div>
            </div>
            <div className="info-content">
              <h2 className="info-title">{card.title}</h2>
              <div className="title-underline"></div>
              <p className="info-text">{card.text}</p>
              <div className="info-button">
                <Link to={card.link} className="learn-more">
                  {getText('home_info_button', 'Saiba mais')}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InfoSection;