// InfoSection.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Importe o componente Link
import '../styles/InfoSection.css';
// Importando imagens
import gardenImage from '../assets/images/pousada-garden.jpg';
import roomInteriorImage from '../assets/images/pousada-room-interior.jpg';
import beachViewImage from '../assets/images/pousada-beach-view.jpg';

function InfoSection() {
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

  const infoCards = [
    {
      image: gardenImage,
      alt: "Área externa da pousada",
      title: "A POUSADA",
      text: "Oferece conforto e um conceito rústico/contemporâneo, é decorada com arte e artesanato brasileiro, possui um belo jardim e um excelente café da manhã.",
      link: "/a-pousada" // 2. Adicione a propriedade 'link' para cada card
    },
    {
      image: roomInteriorImage,
      alt: "Quarto da pousada",
      title: "QUARTOS",
      text: "São 11 quartos equipados com ar condicionado, frigobar, cama BOX, TV a cabo, banheiro privativo com banho quente, secador de cabelo e amenities Natura. O enxoval é em algodão egípcio 100%.",
      link: "/quartos" // 2. Adicione a propriedade 'link' para cada card
    },
    {
      image: beachViewImage,
      alt: "Praia de Fernando de Noronha",
      title: "LOCALIZAÇÃO",
      text: "A pousada está localizada na Ilha de Fernando de Noronha, na Villa do Trinta, próxima a restaurantes, mercados e outras conveniências.",
      link: "/localizacao" // 2. Adicione a propriedade 'link' para cada card
    }
  ];

  return (
    <section className={`info-section ${isVisible ? 'visible' : ''}`}>
      <div className="info-heading">
        <h2>Conheça Nossa Pousada</h2>
        <div className="info-description">
          <p>Uma experiência única em Fernando de Noronha</p>
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
                {/* 3. Substitua o <button> por <Link> */}
                <Link to={card.link} className="learn-more">
                  Saiba mais
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