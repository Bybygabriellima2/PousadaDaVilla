// ============================================
// 5. src/pages/Contato.jsx - COMPLETO
// ============================================
import React, { useState, useContext, useEffect } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';
import { PagesContext } from '../contexts/PagesContext';
import { Phone, MessageCircle, MapPin, Clock, Star, CheckCircle, Calendar, CreditCard, Camera, Smartphone, Plane } from 'lucide-react';
import '../styles/contato-styles.css';
function Contato() {
  const { config } = useContext(ConfigContext);
  const { isComponentActive, fetchPageComponents } = useContext(PagesContext);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    fetchPageComponents('contato');
  }, []);

  const getText = (key, defaultText) => config[key] || defaultText;

  const handleCardClick = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  // Estilos dinâmicos
  const pageStyles = {
    '--contact-hero-gradient-start': config.contact_hero_gradient_start || '#0d9488',
    '--contact-hero-gradient-end': config.contact_hero_gradient_end || '#14b8a6',
    '--contact-card-active-border': config.contact_card_active_border || '#000000',
    '--card-bg-color': config.card_bg_color || '#ffffff',
    '--card-border-radius': config.card_border_radius || '12px',
    '--card-shadow': config.card_shadow || '0 10px 30px rgba(0,0,0,0.08)',
    '--card-hover-shadow': config.card_hover_shadow || '0 20px 40px rgba(0,0,0,0.15)',
    '--primary-color': config.primary_color || '#0d9488',
    '--button-primary-bg': config.button_primary_bg || '#0d9488',
    '--button-primary-text': config.button_primary_text || '#ffffff',
    '--button-primary-hover-bg': config.button_primary_hover_bg || '#0f766e'
  };

  return (
    <div className="contato-page" style={pageStyles}>
      {isComponentActive('contato', 'hero_section') && (
        <section className="contato-hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">
              {getText('contato_hero_title', 'Entre em Contato')}
            </h1>
            <p className="hero-subtitle">
              {getText('contato_hero_subtitle', 'Estamos aqui para tornar sua estadia em Fernando de Noronha inesquecível')}
            </p>
          </div>
          <div className="hero-wave">
            <svg viewBox="0 0 1200 120" className="w-full h-16">
              <path d="M0,120 Q150,80 300,90 T600,70 T900,80 T1200,60 L1200,120 Z" fill="white"/>
            </svg>
          </div>
        </section>
      )}

      <div className="contato-container">
        {isComponentActive('contato', 'contact_cards') && (
          <section className="contact-cards">
            <div className="section-header">
              <h2>{getText('contato_section_title', 'Como Falar Conosco')}</h2>
              <p>
                {getText('contato_section_subtitle', 'Escolha a forma mais conveniente para entrar em contato')}
              </p>
            </div>

            <div className="cards-grid">
              <div 
                className={`contact-card whatsapp-card ${activeCard === 'whatsapp' ? 'active' : ''}`}
                onClick={() => handleCardClick('whatsapp')}
              >
                <div className="card-icon">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3>{getText('contato_whatsapp_title', 'WhatsApp')}</h3>
                <p>{getText('contato_whatsapp_subtitle', 'Resposta rápida e direta')}</p>
                
                <div className={`card-content ${activeCard === 'whatsapp' ? 'active' : ''}`}>
                  <p className="phone-number">{getText('contato_whatsapp_number', '(81) 98230-7332')}</p>
                  <p className="description">
                    {getText('contato_whatsapp_description', 'Fale conosco pelo WhatsApp para reservas, dúvidas ou informações sobre a pousada. Respondemos rapidamente!')}
                  </p>
                  <a 
                    href="https://wa.me/5581982307332" 
                    className="contact-btn whatsapp-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getText('contato_whatsapp_button', 'Conversar no WhatsApp')}
                  </a>
                </div>
              </div>

              <div 
                className={`contact-card phone-card ${activeCard === 'phone' ? 'active' : ''}`}
                onClick={() => handleCardClick('phone')}
              >
                <div className="card-icon">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3>{getText('contato_phone_title', 'Telefone')}</h3>
                <p>{getText('contato_phone_subtitle', 'Atendimento personalizado')}</p>
                
                <div className={`card-content ${activeCard === 'phone' ? 'active' : ''}`}>
                  <p className="phone-number">{getText('contato_phone_number', '(81) 3224-4476')}</p>
                  <p className="description">
                    {getText('contato_phone_description', 'Ligue para falar diretamente com nossa equipe. Horário de atendimento: 8h às 18h, todos os dias.')}
                  </p>
                  <a 
                    href="tel:+558132244476" 
                    className="contact-btn phone-btn"
                  >
                    {getText('contato_phone_button', 'Ligar Agora')}
                  </a>
                </div>
              </div>

              <div 
                className={`contact-card location-card ${activeCard === 'location' ? 'active' : ''}`}
                onClick={() => handleCardClick('location')}
              >
                <div className="card-icon">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3>{getText('contato_location_title', 'Nossa Localização')}</h3>
                <p>{getText('contato_location_subtitle', 'Vila do Trinta, Noronha')}</p>
                
                <div className={`card-content ${activeCard === 'location' ? 'active' : ''}`}>
                  <div className="address">
                    <p>{getText('contato_address_line1', 'Rua Pinto Branco 206')}</p>
                    <p>{getText('contato_address_line2', 'Vila do Trinta')}</p>
                    <p>{getText('contato_address_line3', 'Fernando de Noronha - PE')}</p>
                    <p>{getText('contato_address_line4', 'CEP: 53990-000')}</p>
                  </div>
                  <p className="description">
                    {getText('contato_location_description', 'Localizada no coração da Vila do Trinta, próxima às principais atrações e praias de Fernando de Noronha.')}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {isComponentActive('contato', 'additional_info') && (
          <section className="additional-info">
            <div className="info-grid">
              <div className="info-card">
                
                <h3>{getText('contato_info1_title', 'Reservas Garantidas')}</h3>
                <p>
                  {getText('contato_info1_text', 'Confirmação imediata da sua reserva via WhatsApp ou telefone. Sem complicações, sem demora.')}
                </p>
              </div>

              <div className="info-card">
                
                <h3>{getText('contato_info2_title', 'Atendimento Rápido')}</h3>
                <p>
                  {getText('contato_info2_text', 'Nossa equipe responde rapidamente suas dúvidas e está sempre pronta para ajudar no que precisar.')}
                </p>
              </div>

              <div className="info-card">
               
                <h3>{getText('contato_info3_title', 'Experiência Única')}</h3>
                <p>
                  {getText('contato_info3_text', 'Mais de 10 anos oferecendo hospitalidade excepcional em Fernando de Noronha. Sua satisfação é nossa prioridade.')}
                </p>
              </div>
            </div>
          </section>
        )}

        {isComponentActive('contato', 'tips_section') && (
          <section className="tips-section">
            <div className="tips-header">
              <h2>{getText('contato_tips_title', 'Dicas para sua Visita')}</h2>
              <p>
                {getText('contato_tips_subtitle', 'Informações importantes para aproveitar ao máximo Fernando de Noronha')}
              </p>
            </div>

            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                
                <h3>{getText('contato_tip1_title', 'Melhor Época')}</h3>
                <p>
                  {getText('contato_tip1_text', 'A temporada seca (agosto a janeiro) oferece melhores condições para mergulho. A temporada chuvosa (março a julho) é ideal para surfe.')}
                </p>
              </div>

              <div className="tip-card">
                <div className="tip-icon">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
              
                <h3>{getText('contato_tip2_title', 'Taxa de Preservação')}</h3>
                <p>
                  {getText('contato_tip2_text', 'É obrigatório pagar a Taxa de Preservação Ambiental (TPA) de acordo com os dias de permanência na ilha.')}
                </p>
              </div>

              <div className="tip-card">
                <div className="tip-icon">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              
                <h3>{getText('contato_tip3_title', 'Reservas Antecipadas')}</h3>
                <p>
                  {getText('contato_tip3_text', 'Recomendamos reservar com antecedência, especialmente durante alta temporada (dezembro a março) e feriados prolongados.')}
                </p>
              </div>

              <div className="tip-card">
                <div className="tip-icon">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                
                <h3>{getText('contato_tip4_title', 'O que Levar')}</h3>
                <p>
                  {getText('contato_tip4_text', 'Protetor solar biodegradável, roupas leves, equipamento de snorkel e câmera à prova d\'água são essenciais.')}
                </p>
              </div>

              <div className="tip-card">
                <div className="tip-icon">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                
                <h3>{getText('contato_tip5_title', 'Conectividade')}</h3>
                <p>
                  {getText('contato_tip5_text', 'O sinal de internet e celular pode ser limitado. Aproveite para se desconectar e curtir a natureza ao máximo!')}
                </p>
              </div>

              <div className="tip-card">
                <div className="tip-icon">
                  <Plane className="w-6 h-6 text-white" />
                </div>
               
                <h3>{getText('contato_tip6_title', 'Chegada na Ilha')}</h3>
                <p>
                  {getText('contato_tip6_text', 'Chegue com antecedência no aeroporto. Os voos têm horários específicos e é importante não perder sua viagem dos sonhos.')}
                </p>
              </div>
            </div>
          </section>
        )}

        {isComponentActive('contato', 'cta_section') && (
          <section className="cta-section">
            <div className="cta-content">
              <h2>{getText('contato_cta_title', 'Pronto para sua Aventura em Noronha?')}</h2>
              <p>
                {getText('contato_cta_description', 'Entre em contato conosco agora e garante sua reserva na Pousada da Villa. Estamos esperando por você!')}
              </p>
              <div className="cta-buttons">
                <a 
                  href="https://wa.me/5581982307332" 
                  className="cta-btn primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getText('contato_cta_button1', 'Reservar pelo WhatsApp')}
                </a>
                <a 
                  href="tel:+558132244476" 
                  className="cta-btn secondary"
                >
                  {getText('contato_cta_button2', 'Ligar Agora')}
                </a>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Contato;