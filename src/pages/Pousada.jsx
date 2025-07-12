import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pousada-styles.css'; // Importe o CSS específico para a página da pousada

// FontAwesome será importado via CDN no index.html
// Importe as imagens - certifique-se de que estejam na pasta assets/images
import pousadaInterior1 from '../assets/images/pousada-interior1.jpg';
import pousadaInterior2 from '../assets/images/pousada-interior2.jpg';
import pousadaExterior from '../assets/images/pousada-exterior.jpg';
import pousadaBreakfast from '../assets/images/pousada-breakfast.jpg';
import pousadaGarden from '../assets/images/pousada-garden.jpg';
import pousadaRoom from '../assets/images/pousada-room.jpg';

function Pousada() {
  const [modalImage, setModalImage] = useState(null);
  
  const images = [
    { src: pousadaInterior1, alt: "Interior da Pousada" },
    { src: pousadaInterior2, alt: "Entrada da Pousada" },
    { src: pousadaRoom, alt: "Quarto da Pousada" },
    { src: pousadaBreakfast, alt: "Café da manhã" },
    { src: pousadaGarden, alt: "Jardim da Pousada" },
    { src: pousadaExterior, alt: "Exterior da Pousada" }
  ];

  const openModal = (img) => {
    setModalImage(img);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setModalImage(null);
    document.body.classList.remove('modal-open');
  };

  const features = [
    { icon: "fa-wifi", title: "Wi-Fi Grátis" },
    { icon: "fa-coffee", title: "Café da manhã" },
    { icon: "fa-concierge-bell", title: "Serviço de Quarto" },
    { icon: "fa-umbrella-beach", title: "Próximo à praia" },
    { icon: "fa-leaf", title: "Jardim" },
    { icon: "fa-map-marked-alt", title: "Localização Central" }
  ];

  return (
    <div className="pousada-page">
      <div className="page-header">
        <div className="header-content">
          <h1>A POUSADA</h1>
          <div className="header-decoration"></div>
        </div>
      </div>

      <div className="pousada-content">
        <section className="pousada-description">
          <div className="container">
            <p>
              Oferece conforto e um conceito rústico/contemporâneo, é decorada com arte e artesanato 
              brasileiro e possui um belo jardim.
            </p>
            <p>
              O café da manhã é servido todas as manhãs com frutas da estação, sucos, bolos, pães, 
              queijos, tapiocas, iogurte, entre outras delícias. A pousada da Villa oferece uma 
              ótima relação custo/benefício pra quem quer curtir Noronha mas não abre mão de
              conforto para a horas de descanso.
            </p>
          </div>
        </section>

        <section className="pousada-gallery">
          <div className="container">
            <h2>Nossa Galeria</h2>
            <div className="gallery-grid">
              {images.map((img, index) => (
                <div className="gallery-item" key={index} onClick={() => openModal(img)}>
                  <div className="gallery-image-wrapper">
                    <img src={img.src} alt={img.alt} />
                    <div className="gallery-overlay">
                      <i className="fas fa-search-plus"></i>
                    </div>
                  </div>
                  <p className="image-caption">{img.alt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pousada-features">
          <div className="container">
            <h2>Nossas Comodidades</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div className="feature-item" key={index}>
                  <div className="feature-icon">
                    <i className={`fas ${feature.icon}`}></i>
                  </div>
                  <h3>{feature.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pousada-cta">
          <div className="container">
            <h2>Venha conhecer nossa pousada</h2>
            <p>Oferecemos a melhor experiência em Fernando de Noronha com conforto e autenticidade.</p>
            <Link to="/contato" className="cta-button">
              Faça sua Reserva
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </section>
      </div>

      {/* Modal para exibir imagens ampliadas */}
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