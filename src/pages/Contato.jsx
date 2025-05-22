import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Star, CheckCircle, Calendar, CreditCard, Camera, Smartphone, Plane } from 'lucide-react';

function Contato() {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  return (
    <div className="contato-page">
      {/* Hero Section */}
      <section className="contato-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Entre em Contato
          </h1>
          <p className="hero-subtitle">
            Estamos aqui para tornar sua estadia em Fernando de Noronha inesquecível
          </p>
        </div>
        {/* Wave decoration */}
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" className="w-full h-16">
            <path d="M0,120 Q150,80 300,90 T600,70 T900,80 T1200,60 L1200,120 Z" fill="white"/>
          </svg>
        </div>
      </section>

      <div className="contato-container">
        {/* Contact Cards */}
        <section className="contact-cards">
          <div className="section-header">
            <h2>Como Falar Conosco</h2>
            <p>
              Escolha a forma mais conveniente para entrar em contato
            </p>
          </div>

          <div className="cards-grid">
            {/* WhatsApp Card */}
            <div 
              className={`contact-card whatsapp-card ${activeCard === 'whatsapp' ? 'active' : ''}`}
              onClick={() => handleCardClick('whatsapp')}
            >
              <div className="card-icon">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3>WhatsApp</h3>
              <p>Resposta rápida e direta</p>
              
              <div className={`card-content ${activeCard === 'whatsapp' ? 'active' : ''}`}>
                <p className="phone-number">(81) 98230-7332</p>
                <p className="description">
                  Fale conosco pelo WhatsApp para reservas, dúvidas ou informações sobre a pousada. 
                  Respondemos rapidamente!
                </p>
                <a 
                  href="https://wa.me/5581982307332" 
                  className="contact-btn whatsapp-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Conversar no WhatsApp
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div 
              className={`contact-card phone-card ${activeCard === 'phone' ? 'active' : ''}`}
              onClick={() => handleCardClick('phone')}
            >
              <div className="card-icon">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3>Telefone</h3>
              <p>Atendimento personalizado</p>
              
              <div className={`card-content ${activeCard === 'phone' ? 'active' : ''}`}>
                <p className="phone-number">(81) 3224-4476</p>
                <p className="description">
                  Ligue para falar diretamente com nossa equipe. Horário de atendimento: 
                  8h às 18h, todos os dias.
                </p>
                <a 
                  href="tel:+558132244476" 
                  className="contact-btn phone-btn"
                >
                  Ligar Agora
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div 
              className={`contact-card location-card ${activeCard === 'location' ? 'active' : ''}`}
              onClick={() => handleCardClick('location')}
            >
              <div className="card-icon">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3>Nossa Localização</h3>
              <p>Vila do Trinta, Noronha</p>
              
              <div className={`card-content ${activeCard === 'location' ? 'active' : ''}`}>
                <div className="address">
                  <p>Rua Pinto Branco 206</p>
                  <p>Vila do Trinta</p>
                  <p>Fernando de Noronha - PE</p>
                  <p>CEP: 53990-000</p>
                </div>
                <p className="description">
                  Localizada no coração da Vila do Trinta, próxima às principais atrações 
                  e praias de Fernando de Noronha.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="additional-info">
          <div className="info-grid">
            <div className="info-card">
              <div className="">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3>Reservas Garantidas</h3>
              <p>
                Confirmação imediata da sua reserva via WhatsApp ou telefone. 
                Sem complicações, sem demora.
              </p>
            </div>

            <div className="info-card">
              <div className="">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3>Atendimento Rápido</h3>
              <p>
                Nossa equipe responde rapidamente suas dúvidas e está sempre 
                pronta para ajudar no que precisar.
              </p>
            </div>

            <div className="info-card">
              <div className="">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3>Experiência Única</h3>
              <p>
                Mais de 10 anos oferecendo hospitalidade excepcional em 
                Fernando de Noronha. Sua satisfação é nossa prioridade.
              </p>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="tips-section">
          <div className="tips-header">
            <h2>Dicas para sua Visita</h2>
            <p>
              Informações importantes para aproveitar ao máximo Fernando de Noronha
            </p>
          </div>

          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="tip-number">1</div>
              <h3>Melhor Época</h3>
              <p>
                A temporada seca (agosto a janeiro) oferece melhores condições para mergulho. 
                A temporada chuvosa (março a julho) é ideal para surfe.
              </p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="tip-number">2</div>
              <h3>Taxa de Preservação</h3>
              <p>
                É obrigatório pagar a Taxa de Preservação Ambiental (TPA) de acordo 
                com os dias de permanência na ilha.
              </p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="tip-number">3</div>
              <h3>Reservas Antecipadas</h3>
              <p>
                Recomendamos reservar com antecedência, especialmente durante alta temporada 
                (dezembro a março) e feriados prolongados.
              </p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div className="tip-number">4</div>
              <h3>O que Levar</h3>
              <p>
                Protetor solar biodegradável, roupas leves, equipamento de snorkel 
                e câmera à prova d'água são essenciais.
              </p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div className="tip-number">5</div>
              <h3>Conectividade</h3>
              <p>
                O sinal de internet e celular pode ser limitado. Aproveite para se desconectar 
                e curtir a natureza ao máximo!
              </p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div className="tip-number">6</div>
              <h3>Chegada na Ilha</h3>
              <p>
                Chegue com antecedência no aeroporto. Os voos têm horários específicos 
                e é importante não perder sua viagem dos sonhos.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Pronto para sua Aventura em Noronha?</h2>
            <p>
              Entre em contato conosco agora e garante sua reserva na Pousada da Villa. 
              Estamos esperando por você!
            </p>
            <div className="cta-buttons">
              <a 
                href="https://wa.me/5581982307332" 
                className="cta-btn primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reservar pelo WhatsApp
              </a>
              <a 
                href="tel:+558132244476" 
                className="cta-btn secondary"
              >
                Ligar Agora
              </a>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-fade-in-up-delay {
          animation: fade-in-up 1s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
}

export default Contato;