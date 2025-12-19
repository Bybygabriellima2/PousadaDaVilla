// src/components/DynamicStyles.jsx - VERSÃO CORRIGIDA COMPLETA
import { useContext, useEffect } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';

function DynamicStyles() {
  const { config } = useContext(ConfigContext);

  useEffect(() => {
    if (!config) return;

    const existingStyle = document.getElementById('dynamic-custom-styles');
    if (existingStyle) {
      existingStyle.remove();
    }

    const styleElement = document.createElement('style');
    styleElement.id = 'dynamic-custom-styles';
    
    styleElement.textContent = `
      /* ========== VARIÁVEIS CUSTOMIZADAS ========== */
      :root {
        /* Cores Principais */
        --primary-color: ${config.primary_color || '#0d9488'};
        --secondary-color: ${config.secondary_color || '#f9f2e7'};
        --accent-color: ${config.accent_color || '#daa520'};
        --text-color: ${config.text_color || '#333333'};
        --text-light: ${config.text_light || '#666666'};
        --background-color: ${config.background_color || '#f5f0e4'};
        --white-color: ${config.white_color || '#ffffff'};
        
        /* Header */
        --header-bg-color: ${config.header_bg_color || '#0d9488'};
        --header-text-color: ${config.header_text_color || '#ffffff'};
        --header-hover-color: ${config.header_hover_color || '#f1c40f'};
        --header-shadow: ${config.header_shadow || '0 2px 5px rgba(0,0,0,0.2)'};
        
        /* Footer */
        --footer-bg-color: ${config.footer_bg_color || '#00857c'};
        --footer-text-color: ${config.footer_text_color || '#ffffff'};
        --footer-link-hover: ${config.footer_link_hover || '#f1c40f'};
        
        /* Botões */
        --button-primary-bg: ${config.button_primary_bg || '#0d9488'};
        --button-primary-text: ${config.button_primary_text || '#ffffff'};
        --button-primary-hover-bg: ${config.button_primary_hover_bg || '#0f766e'};
        --button-secondary-bg: ${config.button_secondary_bg || '#f9f2e7'};
        --button-secondary-text: ${config.button_secondary_text || '#333333'};
        --button-border-radius: ${config.button_border_radius || '4px'};
        
        /* Carousel */
        --carousel-overlay-opacity: ${config.carousel_overlay_opacity || '0.7'};
        --carousel-title-size: ${config.carousel_title_size || '3.5rem'};
        --carousel-subtitle-color: ${config.carousel_subtitle_color || '#daa520'};
        --carousel-button-border-color: ${config.carousel_button_border_color || '#daa520'};
        
        /* Cards */
        --card-bg-color: ${config.card_bg_color || '#ffffff'};
        --card-border-radius: ${config.card_border_radius || '12px'};
        --card-shadow: ${config.card_shadow || '0 10px 30px rgba(0,0,0,0.08)'};
        --card-hover-shadow: ${config.card_hover_shadow || '0 20px 40px rgba(0,0,0,0.15)'};
        --card-title-color: ${config.card_title_color || '#138676'};
        --card-hover-transform: ${config.card_hover_transform || 'translateY(-10px)'};
        
        /* Tipografia */
        --font-primary: ${config.font_primary || "'Montserrat', sans-serif"};
        --font-secondary: ${config.font_secondary || "'Playfair Display', serif"};
        --heading-weight: ${config.heading_weight || '700'};
        --body-weight: ${config.body_weight || '400'};
        
        /* Logo */
        --logo-width: ${config.logo_width || '200px'};
        --logo-mobile-width: ${config.logo_mobile_width || '160px'};
        
        /* Info Section */
        --info-section-bg: ${config.info_section_bg || '#f8f9fa'};
        --info-card-hover-transform: ${config.info_card_hover_transform || 'translateY(-10px)'};
        
        /* Contact Page */
        --contact-hero-gradient-start: ${config.contact_hero_gradient_start || '#0d9488'};
        --contact-hero-gradient-end: ${config.contact_hero_gradient_end || '#14b8a6'};
        --contact-card-active-border: ${config.contact_card_active_border || '#000000'};
      }

      /* ========== APLICAÇÕES GLOBAIS - MÁXIMA PRIORIDADE ========== */
      
      /* Body - FORÇAR TIPOGRAFIA */
      body,
      body * {
        font-family: var(--font-primary) !important;
        font-weight: var(--body-weight) !important;
      }
      
      body {
        color: var(--text-color) !important;
        background-color: var(--background-color) !important;
      }
      
      /* Headings - FORÇAR TIPOGRAFIA SECUNDÁRIA */
      h1, h2, h3, h4, h5, h6,
      .info-title,
      .section-header h2,
      .tips-header h2,
      .intro-section h2,
      .pousada-description h2,
      .quartos-description h2,
      .footer-logo {
        font-family: var(--font-secondary) !important;
        font-weight: var(--heading-weight) !important;
        color: var(--primary-color) !important;
      }
      
      /* Parágrafos e textos */
      p, span, a, li, div {
        color: var(--text-color) !important;
      }
      
      /* Header COMPLETO */
      .header {
        background-color: var(--header-bg-color) !important;
        box-shadow: var(--header-shadow) !important;
      }
      
      .header .nav-list li a,
      .header .nav-list-mobile li a {
        color: var(--header-text-color) !important;
        font-family: var(--font-primary) !important;
      }
      
      .header .nav-list li a:hover,
      .header .nav-list-mobile li a:hover {
        color: var(--header-hover-color) !important;
      }
      
      .header .reservas-btn {
        background-color: var(--white-color) !important;
        color: var(--header-bg-color) !important;
        border-radius: var(--button-border-radius) !important;
        font-family: var(--font-primary) !important;
        font-weight: 600 !important;
      }
      
      .header .reservas-btn:hover {
        background-color: var(--secondary-color) !important;
      }
      
      .header .nav-mobile {
        background-color: var(--header-bg-color) !important;
      }
      
      .header .logo {
        width: var(--logo-width) !important;
        max-width: var(--logo-width) !important;
      }
      
      .hamburger-line {
        background-color: var(--header-text-color) !important;
      }
      
      .mobile-reservas-btn {
        background-color: var(--button-primary-bg) !important;
        color: var(--button-primary-text) !important;
        border-radius: var(--button-border-radius) !important;
      }
      
      @media (max-width: 768px) {
        .header .logo {
          width: var(--logo-mobile-width) !important;
          max-width: var(--logo-mobile-width) !important;
        }
      }
      
      /* Footer COMPLETO */
      .footer {
        background-color: var(--footer-bg-color) !important;
        color: var(--footer-text-color) !important;
      }
      
      .footer .footer-wave svg {
        color: var(--background-color) !important;
      }
      
      .footer a {
        color: var(--footer-text-color) !important;
      }
      
      .footer a:hover {
        color: var(--footer-link-hover) !important;
      }
      
      .footer h2, 
      .footer h3,
      .footer .footer-logo,
      .footer .section-title h3 {
        color: var(--footer-text-color) !important;
        font-family: var(--font-secondary) !important;
      }
      
      .footer p,
      .footer span,
      .footer .footer-tagline,
      .footer .section-content,
      .footer .contact-item {
        color: var(--footer-text-color) !important;
      }
      
      /* Botões COMPLETOS */
      .btn-primary, 
      .cta-button, 
      .reservas-btn, 
      .carousel-button,
      .contact-btn, 
      .cta-btn.primary,
      .whatsapp-btn,
      .phone-btn,
      button[type="submit"] {
        background-color: var(--button-primary-bg) !important;
        color: var(--button-primary-text) !important;
        border-radius: var(--button-border-radius) !important;
        font-family: var(--font-primary) !important;
        font-weight: 600 !important;
        border: 2px solid var(--button-primary-bg) !important;
      }
      
      .btn-primary:hover, 
      .cta-button:hover, 
      .contact-btn:hover,
      .cta-btn.primary:hover,
      .whatsapp-btn:hover,
      .phone-btn:hover {
        background-color: var(--button-primary-hover-bg) !important;
        border-color: var(--button-primary-hover-bg) !important;
      }
      
      .btn-secondary, 
      .cta-btn.secondary {
        background-color: var(--button-secondary-bg) !important;
        color: var(--button-secondary-text) !important;
        border-radius: var(--button-border-radius) !important;
        font-family: var(--font-primary) !important;
        border: 2px solid var(--button-secondary-bg) !important;
      }
      
      .learn-more {
        color: var(--primary-color) !important;
        font-family: var(--font-primary) !important;
      }
      
      .learn-more:hover {
        color: var(--button-primary-hover-bg) !important;
      }
      
      /* Carousel COMPLETO */
      .carousel .carousel-overlay {
        opacity: var(--carousel-overlay-opacity) !important;
        background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)) !important;
      }
      
      .carousel .carousel-caption h2 {
        font-size: var(--carousel-title-size) !important;
        color: var(--white-color) !important;
        font-family: var(--font-secondary) !important;
        font-weight: var(--heading-weight) !important;
      }
      
      .carousel .carousel-subtitle {
        color: var(--carousel-subtitle-color) !important;
        font-family: var(--font-primary) !important;
      }
      
      .carousel .carousel-subtitle::before {
        background-color: var(--carousel-subtitle-color) !important;
      }
      
      .carousel .carousel-button {
        border-color: var(--carousel-button-border-color) !important;
        color: var(--white-color) !important;
        background-color: transparent !important;
        font-family: var(--font-primary) !important;
        border-radius: var(--button-border-radius) !important;
      }
      
      .carousel .carousel-button::after {
        background-color: var(--carousel-button-border-color) !important;
      }
      
      .carousel .carousel-button:hover {
        background-color: var(--carousel-button-border-color) !important;
        color: var(--white-color) !important;
      }
      
      .carousel .carousel-progress-bar {
        background-color: var(--carousel-subtitle-color) !important;
      }
      
      .carousel .carousel-counter {
        color: var(--white-color) !important;
        font-family: var(--font-primary) !important;
      }
      
      /* Cards COMPLETOS */
      .info-card, 
      .contact-card, 
      .tip-card, 
      .photo-card,
      .quarto-card, 
      .transport-card, 
      .feature-item,
      .gallery-item,
      .info-block {
        background-color: var(--card-bg-color) !important;
        border-radius: var(--card-border-radius) !important;
        box-shadow: var(--card-shadow) !important;
        transition: all 0.3s ease !important;
      }
      
      .info-card:hover, 
      .contact-card:hover, 
      .tip-card:hover,
      .photo-card:hover, 
      .transport-card:hover,
      .feature-item:hover {
        box-shadow: var(--card-hover-shadow) !important;
        transform: var(--card-hover-transform) !important;
      }
      
      .info-card .info-title, 
      .card-title, 
      .info-card h2,
      .contact-card h3,
      .tip-card h3,
      .transport-card h3 {
        color: var(--card-title-color) !important;
        font-family: var(--font-secondary) !important;
        font-weight: var(--heading-weight) !important;
      }
      
      .info-card p,
      .contact-card p,
      .tip-card p,
      .info-text {
        color: var(--text-color) !important;
        font-family: var(--font-primary) !important;
      }
      
      /* Info Section COMPLETO */
      .info-section {
        background-color: var(--info-section-bg) !important;
      }
      
      .info-section h2 {
        color: var(--primary-color) !important;
        font-family: var(--font-secondary) !important;
        font-weight: var(--heading-weight) !important;
      }
      
      .info-card:hover {
        transform: var(--info-card-hover-transform) scale(1.02) !important;
      }
      
      .title-underline {
        background: linear-gradient(to right, var(--primary-color), transparent) !important;
      }
      
      /* Contact Page COMPLETO */
      .contato-hero {
        background: linear-gradient(135deg, var(--contact-hero-gradient-start) 0%, var(--contact-hero-gradient-end) 100%) !important;
      }
      
      .contato-hero h1,
      .contato-hero .hero-title {
        color: var(--white-color) !important;
        font-family: var(--font-secondary) !important;
      }
      
      .contato-hero p,
      .contato-hero .hero-subtitle {
        color: var(--white-color) !important;
        font-family: var(--font-primary) !important;
      }
      
      .whatsapp-card.active,
      .phone-card.active,
      .location-card.active {
        border: 3px solid var(--contact-card-active-border) !important;
      }
      
      .card-icon,
      .tip-icon, 
      .info-icon {
        background-color: var(--primary-color) !important;
      }
      
      .tip-number {
        color: var(--primary-color) !important;
        font-family: var(--font-secondary) !important;
        font-weight: var(--heading-weight) !important;
      }
      
      /* Gallery */
      .gallery-overlay {
        background-color: rgba(0, 0, 0, 0.7) !important;
      }
      
      /* Page Banners */
      .page-banner, 
      .page-header,
      .hero-section {
        background-color: var(--primary-color) !important;
      }
      
      .page-banner h1, 
      .page-header h1,
      .hero-section h1 {
        color: var(--white-color) !important;
        font-family: var(--font-secondary) !important;
        font-weight: var(--heading-weight) !important;
      }
      
      /* Dividers */
      .divider, 
      .header-decoration {
        background: linear-gradient(to right, transparent, var(--primary-color), transparent) !important;
      }
      
      /* Links gerais */
      a:not(.header a):not(.footer a):not(.btn-primary):not(.cta-button) {
        color: var(--primary-color) !important;
      }
      
      a:not(.header a):not(.footer a):not(.btn-primary):not(.cta-button):hover {
        color: var(--accent-color) !important;
      }
      
      /* Sections Headers */
      .section-header h2, 
      .tips-header h2, 
      .intro-section h2,
      .pousada-description h2,
      .quartos-description h2,
      .pousada-features h2 {
        color: var(--primary-color) !important;
        font-family: var(--font-secondary) !important;
        font-weight: var(--heading-weight) !important;
      }
      
      /* Icons */
      .section-icon svg, 
      .info-block-icon svg, 
      .transport-icon svg {
        color: var(--primary-color) !important;
      }
      
      /* Info blocks */
      .info-block-title {
        color: var(--primary-color) !important;
        font-family: var(--font-secondary) !important;
      }
      
      /* Quartos */
      .amenities-list li {
        color: var(--text-color) !important;
        font-family: var(--font-primary) !important;
      }
      
      .book-now h3 {
        color: var(--primary-color) !important;
        font-family: var(--font-secondary) !important;
      }
      
      /* Pousada */
      .pousada-description p {
        color: var(--text-color) !important;
        font-family: var(--font-primary) !important;
      }
      
      .feature-item h3 {
        color: var(--card-title-color) !important;
        font-family: var(--font-secondary) !important;
      }
      
      /* Localização */
      .intro-section p,
      .info-block-text {
        color: var(--text-color) !important;
        font-family: var(--font-primary) !important;
      }
      
      /* CTA Sections */
      .pousada-cta,
      .cta-section {
        background-color: var(--secondary-color) !important;
      }
      
      .pousada-cta h2,
      .cta-section h2 {
        color: var(--primary-color) !important;
        font-family: var(--font-secondary) !important;
      }
      
      /* Responsive adjustments */
      @media (max-width: 768px) {
        .carousel .carousel-caption h2 {
          font-size: calc(var(--carousel-title-size) * 0.6) !important;
        }
      }
      
      @media (max-width: 480px) {
        .carousel .carousel-caption h2 {
          font-size: calc(var(--carousel-title-size) * 0.5) !important;
        }
      }
    `;

    document.head.appendChild(styleElement);

    return () => {
      const style = document.getElementById('dynamic-custom-styles');
      if (style) {
        style.remove();
      }
    };
  }, [config]);

  return null;
}

export default DynamicStyles;