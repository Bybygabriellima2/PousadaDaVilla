// Carousel.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
// Importando as imagens diretamente
import exteriorImage from '../assets/images/pousada-exterior.jpg';
import roomImage from '../assets/images/pousada-room.jpg';
import beachImage from '../assets/images/pousada-beach.jpg';
import '../styles/carousel-styles.css';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Slides com descrições corrigidas e links
  const slides = [
    {
      image: exteriorImage,
      title: 'POUSADA DA VILLA',
      subtitle: 'Seu refúgio de tranquilidade',
      buttonText: 'Conheça',
      link: '/a-pousada'
    },
    {
      image: roomImage,
      title: 'QUARTOS CONFORTÁVEIS',
      subtitle: 'Conforto e elegância para sua estadia',
      buttonText: 'Reservar',
      link: '/contato'
    },
    {
      image: beachImage,
      title: 'LOCALIZAÇÃO PRIVILEGIADA',
      subtitle: 'Uma experiência única',
      buttonText: 'Explorar',
      link: '/localizacao'
    }
  ];

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
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
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  // Touch handlers for mobile swipe
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

  // Calculate progress for the progress bar
  const slideProgress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div 
      className="carousel"
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
      
      <div className="carousel-social">
     
        <a href="#" className="social-icon" aria-label="WhatsApp">
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </div>
  );
}

export default Carousel;