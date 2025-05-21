// Carousel.jsx
import React, { useState, useEffect, useCallback } from 'react';
// Importando as imagens diretamente
import exteriorImage from '../assets/images/pousada-exterior.jpg';
import roomImage from '../assets/images/pousada-room.jpg';
import beachImage from '../assets/images/pousada-beach.jpg';
import '../styles/carousel-styles.css';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Slides usando as imagens importadas
  const slides = [
    {
      image: exteriorImage,
      title: 'POUSADA DA VILLA',
      subtitle: 'Seu paraíso à beira-mar'
    },
    {
      image: roomImage,
      title: 'QUARTOS CONFORTÁVEIS',
      subtitle: 'Conforto e elegância para sua estadia'
    },
    {
      image: beachImage,
      title: 'LOCALIZAÇÃO PRIVILEGIADA',
      subtitle: 'A poucos passos da praia'
    }
  ];

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match this with your CSS transition time
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match this with your CSS transition time
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
    }, 1000);
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${slide.image})`,
            }}
          >
            <div className="carousel-content">
              <div className="carousel-caption">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
        <span>&#10094;</span>
      </button>
      <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
        <span>&#10095;</span>
      </button>
      
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button 
            key={index} 
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
      
      <div className="carousel-social">
        <a href="#" className="social-icon" aria-label="Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="social-icon" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="social-icon" aria-label="WhatsApp">
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </div>
  );
}

export default Carousel;