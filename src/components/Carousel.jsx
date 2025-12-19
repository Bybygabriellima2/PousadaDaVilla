// ============================================
// 1. src/components/Carousel.jsx - COMPLETO
// ============================================
import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ConfigContext } from '../contexts/ConfigContext';
import '../styles/carousel-styles.css';

import exteriorImage from '../assets/images/pousada-exterior.jpg';
import roomImage from '../assets/images/pousada-room.jpg';
import beachImage from '../assets/images/pousada-beach.jpg';

function Carousel() {
  const { config } = useContext(ConfigContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const getImageUrl = (configKey, fallback) => {
    if (config[configKey]) {
      return config[configKey].startsWith('http') 
        ? config[configKey] 
        : `http://localhost:3001${config[configKey]}`;
    }
    return fallback;
  };

  const getText = (key, defaultText) => config[key] || defaultText;

  const slides = [
    {
      image: getImageUrl('home_slide_1', exteriorImage),
      title: getText('home_slide1_title', 'POUSADA DA VILLA'),
      subtitle: getText('home_slide1_subtitle', 'Seu refúgio de tranquilidade'),
      buttonText: getText('home_slide1_button', 'Conheça'),
      link: '/a-pousada'
    },
    {
      image: getImageUrl('home_slide_2', roomImage),
      title: getText('home_slide2_title', 'QUARTOS CONFORTÁVEIS'),
      subtitle: getText('home_slide2_subtitle', 'Conforto e elegância para sua estadia'),
      buttonText: getText('home_slide2_button', 'Reservar'),
      link: '/contato'
    },
    {
      image: getImageUrl('home_slide_3', beachImage),
      title: getText('home_slide3_title', 'LOCALIZAÇÃO PRIVILEGIADA'),
      subtitle: getText('home_slide3_subtitle', 'Uma experiência única'),
      buttonText: getText('home_slide3_button', 'Explorar'),
      link: '/localizacao'
    }
  ];

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      nextSlide();
    } else if (touchEndX.current - touchStartX.current > 75) {
      prevSlide();
    }
  };

  const slideProgress = ((currentSlide + 1) / slides.length) * 100;

  // Estilos dinâmicos do carousel
  const carouselStyles = {
    '--carousel-overlay-opacity': config.carousel_overlay_opacity || '0.7',
    '--carousel-title-size': config.carousel_title_size || '3.5rem',
    '--carousel-subtitle-color': config.carousel_subtitle_color || '#daa520',
    '--carousel-button-border-color': config.carousel_button_border_color || '#daa520'
  };

  return (
    <div 
      className="carousel"
      style={carouselStyles}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-progress">
        <motion.div 
          className="carousel-progress-bar"
          animate={{ width: `${slideProgress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <div className="carousel-container">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            index === currentSlide && (
              <motion.div 
                key={index}
                className="carousel-slide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="carousel-overlay"></div>
                <div className="carousel-content">
                  <motion.div 
                    className="carousel-caption"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <span className="carousel-subtitle">{slide.subtitle}</span>
                    <h2>{slide.title}</h2>
                    <Link to={slide.link} className="carousel-button">
                      <span>{slide.buttonText}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
      
      <div className="carousel-counter">
        <span className="current">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="separator">/</span>
        <span className="total">{String(slides.length).padStart(2, '0')}</span>
      </div>
      
      
    </div>
  );
}

export default Carousel;