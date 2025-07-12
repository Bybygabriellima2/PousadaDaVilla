import React, { useState } from 'react';
import { XCircle, ChevronLeft, ChevronRight, Navigation, Car } from 'lucide-react';
import '../styles/localizacao-styles.css';

// Importe suas imagens
import panoramaImg from '../assets/images/noronha-panorama.jpg';
import praia1Img from '../assets/images/noronha-praia1.jpg';
import praia2Img from '../assets/images/noronha-praia2.jpg';
import vilaImg from '../assets/images/noronha-vila.jpg';
import mergulhoImg from '../assets/images/noronha-mergulho.jpg';

const Localizacao = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentImageTitle, setCurrentImageTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageData = [
    { src: praia1Img, title: 'Praia do Sancho - 15 min de carro' },
    { src: praia2Img, title: 'Mirante Dois Irmãos - 10 min de carro' },
    { src: vilaImg, title: 'Vila dos Remédios - 5 min de carro' },
    { src: mergulhoImg, title: 'Pontos de mergulho - 12 min de carro' }
  ];

  // Funções do modal (mantidas)
  const openModal = (image, title, index) => {
    setCurrentImage(image);
    setCurrentImageTitle(title);
    setCurrentIndex(index);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % imageData.length;
    setCurrentIndex(newIndex);
    setCurrentImage(imageData[newIndex].src);
    setCurrentImageTitle(imageData[newIndex].title);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + imageData.length) % imageData.length;
    setCurrentIndex(newIndex);
    setCurrentImage(imageData[newIndex].src);
    setCurrentImageTitle(imageData[newIndex].title);
  };

  return (
    <div className="localizacao-page-container">
      <div className="hero-section" style={{ backgroundImage: `url(${panoramaImg})` }}>
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Localização</h1>
          <p>Descubra o paraíso em Fernando de Noronha</p>
        </div>
      </div>

      <div className="intro-section">
        <h2>Nossa Localização Privilegiada</h2>
        <div className="divider"></div>
        <p>
          A Pousada da Villa está estrategicamente localizada na encantadora Ilha de Fernando de Noronha, 
          na região da Villa do Trinta. Nossa localização oferece fácil acesso aos principais atrativos naturais 
          da ilha, combinando tranquilidade e conveniência.
        </p>
      </div>

      <div className="content-grid">
        {/* ===== ÁREA DE INFORMAÇÃO COM NOVO LAYOUT ===== */}
        <div className="location-info">
          
          {/* Novo Bloco de Endereço */}
          <div className="info-block">
            <div className="info-block-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
            </div>
            <h3 className="info-block-title">Endereço</h3>
            <p className="info-block-text">
              Rua Pinto Branco 206, Vila do Trinta
              <br />
              Fernando de Noronha, PE - 53990-000
            </p>
          </div>
          
          {/* Novo Bloco de Contato */}
          <div className="info-block">
             <div className="info-block-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </div>
            <h3 className="info-block-title">Contato</h3>
            <p className="info-block-text">
              <strong>Telefone:</strong> (81) 3224-4476
              <br />
              <strong>WhatsApp:</strong> (81) 98230-7332
            </p>
          </div>
          
        </div>
        
        {/* Mapa OpenStreetMap */}
        <div className="map-container">
          <div className="map-wrapper">
            <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-32.42448%2C-3.85172%2C-32.42031%2C-3.84966&amp;layer=mapnik&amp;marker=-3.85069%2C-32.42239"
                title="Mapa da localização da Pousada da Villa"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Seções restantes continuam iguais */}
      <div className="photos-section">
        <h2>Conheça Os Arredores</h2>
        <div className="divider"></div>
        <div className="photos-grid">
          {imageData.map((image, index) => (
            <div className="photo-card" key={index} onClick={() => openModal(image.src, image.title, index)}>
              <div className="photo-overlay"><span>Clique para ampliar</span></div>
              <img src={image.src} alt={`Foto ${index + 1} de Fernando de Noronha`} />
              <div className="photo-caption"><p>{image.title}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="transportation-section">
        <h2>Como Chegar</h2>
        <div className="divider"></div>
        <div className="transport-cards">
          <div className="transport-card">
            <div className="transport-icon"><Navigation size={32} /></div>
            <h3>Do Aeroporto</h3>
            <p>O Aeroporto de Fernando de Noronha (FEN) está a aproximadamente 8 minutos de carro da nossa pousada. Oferecemos serviço de traslado mediante solicitação prévia durante sua reserva.</p>
          </div>
          <div className="transport-card">
            <div className="transport-icon"><Car size={32} /></div>
            <h3>Locomoção na Ilha</h3>
            <p>Recomendamos o aluguel de buggy ou táxi para se locomover pela ilha. Nossa equipe pode ajudar a organizar o aluguel de veículos durante sua estadia para total comodidade.</p>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="image-modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}><XCircle size={32} /></button>
            <div className="modal-image-container"><img src={currentImage} alt={currentImageTitle} /><div className="modal-caption"><p>{currentImageTitle}</p></div></div>
            <div className="modal-nav">
              <button className="nav-button prev" onClick={prevImage}><ChevronLeft size={36} /></button>
              <button className="nav-button next" onClick={nextImage}><ChevronRight size={36} /></button>
            </div>
          </div>
          <div className="modal-overlay" onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
};

export default Localizacao;