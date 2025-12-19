// src/components/Footer.jsx - CORRIGIDO
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ConfigContext } from '../contexts/ConfigContext';
import '../styles/footer-styles.css'; // <--- ESTA LINHA É ESSENCIAL PARA O DESIGN FUNCIONAR

function Footer() {
  const { config } = useContext(ConfigContext);
  const currentYear = new Date().getFullYear();
  
  const getText = (key, defaultText) => config[key] || defaultText;

  // Estilos dinâmicos injetados via CSS Variables
  const footerStyles = {
    '--footer-bg-color': config.footer_bg_color || '#00857c',
    '--footer-text-color': config.footer_text_color || '#ffffff',
    '--footer-link-hover': config.footer_link_hover || '#f1c40f',
    '--background-color': config.background_color || '#f5f0e4'
  };

  return (
    <footer className="footer" style={footerStyles}>
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120 Q150,60 300,90 T600,80 T900,70 T1200,60 L1200,120 L0,120 Z" fill="currentColor"/>
        </svg>
      </div>
      
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">
            {getText('footer_brand_title', 'Pousada da Villa')}
          </h2>
          <p className="footer-tagline">
            {getText('footer_tagline', 'Sua experiência única em Fernando de Noronha')}
          </p>
        </div>

        <div className="footer-content">
          <div className="footer-section">
            <div className="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5-2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <h3>{getText('footer_location_title', 'Localização')}</h3>
            <div className="section-content">
              <p>{getText('footer_location_line1', 'Rua Pinto Branco 206, Vila do Trinta')}</p>
              <p>{getText('footer_location_line2', 'Fernando de Noronha, CEP 53990-000')}</p>
              <p>{getText('footer_location_line3', 'Brasil')}</p>
            </div>
          </div>

          <div className="footer-section">
            <div className="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <h3>{getText('footer_contact_title', 'Contato')}</h3>
            <div className="section-content">
              <p className="contact-item">
                <span className="contact-label">Fone:</span>
                <a href="tel:+558132244476">{getText('footer_phone', '(81) 3224-4476')}</a>
              </p>
              <p className="contact-item">
                <span className="contact-label">WhatsApp:</span>
                <a href="https://wa.me/5581982307332" target="_blank" rel="noopener noreferrer">
                  {getText('footer_whatsapp', '(81) 98230-7332')}
                </a>
              </p>
            </div>
          </div>

          <div className="footer-section">
            <div className="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </div>
            <h3>{getText('footer_navigation_title', 'Navegação')}</h3>
            <nav className="footer-nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/a-pousada" className="nav-link">A Pousada</Link>
              <Link to="/quartos" className="nav-link">Quartos</Link>
              <Link to="/localizacao" className="nav-link">Localização</Link>
              <Link to="/contato" className="nav-link">Contato</Link>
            </nav>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear} {getText('footer_brand_title', 'Pousada da Villa')}. {getText('footer_copyright', 'Todos os direitos reservados.')}</p>
            <p className="footer-subtitle">
              {getText('footer_subtitle', 'Desenvolvido com carinho para sua estadia perfeita')}
            </p>
          </div>
          
          <div className="footer-social">
            <a href="https://wa.me/5581982307332" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;