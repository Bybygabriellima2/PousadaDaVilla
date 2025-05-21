// Carousel.jsx
import React, { useState, useEffect } from 'react';
// Importando as imagens diretamente
import exteriorImage from '../assets/images/pousada-exterior.jpg';
import roomImage from '../assets/images/pousada-room.jpg';
import beachImage from '../assets/images/pousada-beach.jpg';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides usando as imagens importadas
  const slides = [
    {
      image: exteriorImage,
      title: 'POUSADA DA VILLA'
    },
    {
      image: roomImage,
      title: 'QUARTOS CONFORTÁVEIS'
    },
    {
      image: beachImage,
      title: 'LOCALIZAÇÃO PRIVILEGIADA'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="carousel-caption">
              <h2>{slide.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button 
            key={index} 
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
      <div className="carousel-social">
        <a href="#" className="social-icon">
          <i className="fab fa-facebook-f"></i>
        </a>
      </div>
    </div>
  );
}

export default Carousel;