import React, { useState } from 'react';
import { XCircle, ChevronLeft, ChevronRight, Map, Navigation, Car, Phone } from 'lucide-react';
import '../styles/localizacao-styles.css';

// Import das imagens (mantenha os mesmos imports que você já tem)
import panoramaImg from '../assets/images/noronha-panorama.jpg';
import praia1Img from '../assets/images/noronha-praia1.jpg';
import praia2Img from '../assets/images/noronha-praia2.jpg';
import vilaImg from '../assets/images/noronha-vila.jpg';
import mergulhoImg from '../assets/images/noronha-mergulho.jpg';

const Localizacao = () => {
  // Estados para controlar o modal e a imagem atual
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentImageTitle, setCurrentImageTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Dados das imagens para facilitar a navegação no modal
  const imageData = [
    { src: praia1Img, title: 'Praia do Sancho - 15 min de carro' },
    { src: praia2Img, title: 'Mirante Dois Irmãos - 10 min de carro' },
    { src: vilaImg, title: 'Vila dos Remédios - 5 min de carro' },
    { src: mergulhoImg, title: 'Pontos de mergulho - 12 min de carro' }
  ];
  
  // Função para abrir o modal com a imagem clicada
  const openModal = (image, title, index) => {
    setCurrentImage(image);
    setCurrentImageTitle(title);
    setCurrentIndex(index);
    setModalOpen(true);
    // Desabilita o scroll quando o modal está aberto
    document.body.style.overflow = 'hidden';
  };
  
  // Função para fechar o modal
  const closeModal = () => {
    setModalOpen(false);
    // Reabilita o scroll quando o modal é fechado
    document.body.style.overflow = 'auto';
  };
  
  // Funções para navegar entre as imagens no modal
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
    <div className="localizacao-container">
      {/* Hero Section com Paralax */}
      <div className="hero-section" style={{ backgroundImage: `url(${panoramaImg})` }}>
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Localização</h1>
          <p>Descubra o paraíso em Fernando de Noronha</p>
        </div>
      </div>

      {/* Seção de Introdução */}
      <div className="intro-section">
        <h2>Nossa Localização Privilegiada</h2>
        <div className="divider"></div>
        <p>
          A Pousada da Villa está estrategicamente localizada na encantadora Ilha de Fernando de Noronha, 
          na região da Villa do Trinta. Nossa localização oferece fácil acesso aos principais atrativos naturais 
          da ilha, combinando tranquilidade e conveniência.
        </p>
      </div>

      {/* Grid de Conteúdo Principal */}
      <div className="content-grid">
        {/* Informações de Localização */}
        <div className="location-info">
          <div className="info-card address">
            <div className="card-icon">
              <Map size={28} />
            </div>
            <div className="card-content">
              <h3>Endereço</h3>
              <p>Rua Pinto Branco 206, Vila do Trinta</p>
              <p>Fernando de Noronha, CEP 53990-000, Brasil</p>
            </div>
          </div>
          
          <div className="info-card contact">
            <div className="card-icon">
              <Phone size={28} />
            </div>
            <div className="card-content">
              <h3>Contato</h3>
              <p><strong>Telefone:</strong> (81) 3224-4476</p>
              <p><strong>WhatsApp:</strong> (81) 98230-7332</p>
            </div>
          </div>
          
          <div className="location-text">
            <p>
              Nossa pousada está próxima a restaurantes, mercados e outras conveniências, 
              permitindo que você aproveite ao máximo sua estadia sem preocupações.
            </p>
            <p>
              As mais belas praias e pontos turísticos da ilha estão a poucos minutos, 
              facilitando suas aventuras em um dos destinos mais deslumbrantes do Brasil.
            </p>
          </div>
        </div>
        
        {/* Mapa */}
        <div className="map-container">
          <div className="map-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15881.851362516608!2d-32.42287225!3d-3.8546122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNTEnMTYuNiJTIDMywrAyNScyMi4zIlc!5e0!3m2!1spt-BR!2sbr!4v1621436488888!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              title="Mapa da localização da Pousada da Villa"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Seção de Fotos Interativas */}
      <div className="photos-section">
        <h2>Conheça Os Arredores</h2>
        <div className="divider"></div>
        
        <div className="photos-grid">
          {imageData.map((image, index) => (
            <div className="photo-card" key={index} onClick={() => openModal(image.src, image.title, index)}>
              <div className="photo-overlay">
                <span>Clique para ampliar</span>
              </div>
              <img src={image.src} alt={`Foto ${index + 1} de Fernando de Noronha`} />
              <div className="photo-caption">
                <p>{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Como Chegar */}
      <div className="transportation-section">
        <h2>Como Chegar</h2>
        <div className="divider"></div>
        
        <div className="transport-cards">
          <div className="transport-card">
            <div className="transport-icon">
              <Navigation size={32} />
            </div>
            <h3>Do Aeroporto</h3>
            <p>
              O Aeroporto de Fernando de Noronha (FEN) está a aproximadamente 8 minutos de carro da nossa pousada. 
              Oferecemos serviço de traslado mediante solicitação prévia durante sua reserva.
            </p>
          </div>
          
          <div className="transport-card">
            <div className="transport-icon">
              <Car size={32} />
            </div>
            <h3>Locomoção na Ilha</h3>
            <p>
              Recomendamos o aluguel de buggy ou táxi para se locomover pela ilha. Nossa equipe pode ajudar 
              a organizar o aluguel de veículos durante sua estadia para total comodidade.
            </p>
          </div>
        </div>
      </div>

      {/* Modal para visualização ampliada das imagens */}
      {modalOpen && (
        <div className="image-modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              <XCircle size={32} />
            </button>
            
            <div className="modal-image-container">
              <img src={currentImage} alt={currentImageTitle} />
              <div className="modal-caption">
                <p>{currentImageTitle}</p>
              </div>
            </div>
            
            <div className="modal-nav">
              <button className="nav-button prev" onClick={prevImage}>
                <ChevronLeft size={36} />
              </button>
              <button className="nav-button next" onClick={nextImage}>
                <ChevronRight size={36} />
              </button>
            </div>
          </div>
          <div className="modal-overlay" onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
};

export default Localizacao;