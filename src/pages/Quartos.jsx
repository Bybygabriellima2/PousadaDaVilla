import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/quartos-styles.css';

// Importe imagens dos quartos
// Você precisará criar/adicionar estas imagens ao seu projeto
import quarto1 from '../assets/images/quarto-1.jpg';
import quarto2 from '../assets/images/quarto-2.jpg';
import quarto3 from '../assets/images/quarto-3.jpg';
import quartoTriploBanner from '../assets/images/quarto-triplo-banner.jpg';
import quartoCasalBanner from '../assets/images/quarto-casal-banner.jpg';
import banheiro from '../assets/images/banheiro.jpg';
import detalhes from '../assets/images/detalhes-quarto.jpg';

function Quartos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulando carregamento da página
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Fechar modal com tecla ESC
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Abrir modal com a imagem clicada
  const openModal = (imageSrc) => {
    setCurrentImage(imageSrc);
    setModalOpen(true);
    // Prevenir scroll quando modal estiver aberto
    document.body.style.overflow = 'hidden';
  };

  // Fechar modal
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Lista de comodidades para reutilização
  const standardAmenities = [
    'Ar condicionado',
    'Frigobar',
    'TV a cabo',
    'Banheiro privativo',
    'Enxoval 100% algodão egípcio',
    'Secador de cabelo',
    'Amenities Natura'
  ];

  // Lista de imagens da galeria para reutilização
  const galleryImages = [
    { src: quarto1, alt: 'Quarto da Pousada da Villa' },
    { src: quarto2, alt: 'Quarto da Pousada da Villa' },
    { src: quarto3, alt: 'Quarto da Pousada da Villa' },
    { src: banheiro, alt: 'Banheiro da Pousada da Villa' },
    { src: detalhes, alt: 'Detalhes do quarto da Pousada da Villa' },
    { src: quartoCasalBanner, alt: 'Vista panorâmica do quarto casal' }
  ];

  return (
    <div className={`quartos-page ${isLoading ? 'loading' : ''}`}>
      <Helmet>
        <title>Quartos - Pousada da Villa Fernando de Noronha</title>
        <meta name="description" content="Conheça os quartos da Pousada da Villa em Fernando de Noronha, todos equipados com ar condicionado, frigobar, TV e banheiro privativo." />
      </Helmet>

      <div className="page-banner">
        <h1>NOSSOS QUARTOS</h1>
      </div>

      <section className="quartos-description">
        <div className="container">
          <p className="quartos-info">
            São 11 quartos projetados para oferecer o máximo de conforto durante sua estadia em Fernando de Noronha.
            Todos equipados com ar condicionado, frigobar, cama BOX, TV a cabo, banheiro privativo com banho quente, secador
            de cabelo e amenities Natura. O enxoval é algodão egípcio 100%, proporcionando uma experiência de descanso premium.
          </p>

          <div className="quartos-grid">
            <div className="quarto-card">
              <img src={quartoTriploBanner} alt="Quarto Triplo da Pousada da Villa" />
              <div className="quarto-info">
                <h2>Quarto duplo</h2>
                <p>Quarto espaçoso com duas camas de solteiro, ideal para grupos de amigos ou famílias. Conta com todo o conforto e comodidades da pousada, com vista privilegiada para o jardim.</p>
                <ul className="amenities-list">
                  {standardAmenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="quarto-card">
              <img src={quartoCasalBanner} alt="Quarto Casal da Pousada da Villa" />
              <div className="quarto-info">
                <h2>Quarto Casal</h2>
                <p>Quarto confortável com cama de casal, decoração clean e agradável. Perfeito para casais que buscam conforto e privacidade, com ambientação que convida ao relaxamento.</p>
                <ul className="amenities-list">
                  {standardAmenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="quartos-gallery">
            <h2>Galeria de Fotos</h2>
            <div className="gallery-grid">
              {galleryImages.map((image, index) => (
                <div className="gallery-item" key={index} onClick={() => openModal(image.src)}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <div className="book-now">
            <h3>Venha se hospedar conosco!</h3>
            <p>Reserve já seu quarto e desfrute de momentos inesquecíveis em Fernando de Noronha, com o conforto e a hospitalidade da Pousada da Villa.</p>
            <a href="/reservas" className="reservas-btn">Fazer Reserva</a>
          </div>
        </div>
      </section>

      {/* Modal para visualização das imagens */}
      <div className={`modal ${modalOpen ? 'open' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-modal" onClick={closeModal}>×</button>
          <img src={currentImage} alt="Visualização ampliada" className="modal-image" />
        </div>
      </div>
    </div>
  );
}

export default Quartos;