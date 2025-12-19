// src/components/Header.jsx - VERSÃO MOBILE RESPONSIVA CORRIGIDA
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConfigContext } from '../contexts/ConfigContext';
import defaultLogo from '../assets/logo.png';
import '../styles/header-styles.css';

function Header() {
  const { config } = useContext(ConfigContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const location = useLocation();

  // Logo source com fallback
  const logoSrc = config.site_logo 
    ? (config.site_logo.startsWith('http') 
        ? config.site_logo 
        : `http://localhost:3001${config.site_logo}`) 
    : defaultLogo;

  // Detecta mudança de tamanho de tela
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Fecha menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);
  
  // Gerencia scroll do body quando menu está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      // Salva posição atual do scroll
      const scrollY = window.scrollY;
      document.body.classList.add('menu-open');
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Restaura posição do scroll
      const scrollY = document.body.style.top;
      document.body.classList.remove('menu-open');
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.classList.remove('menu-open');
      document.body.style.top = '';
    };
  }, [mobileMenuOpen]);

  // Fecha menu ao mudar de rota
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Previne scroll em dispositivos touch quando menu está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      const preventDefault = (e) => {
        if (e.target.closest('.nav-mobile')) return;
        e.preventDefault();
      };
      
      document.addEventListener('touchmove', preventDefault, { passive: false });
      return () => document.removeEventListener('touchmove', preventDefault);
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Estilos dinâmicos do header vindos do painel admin
  const headerStyles = {
    '--header-bg-color': config.header_bg_color || '#0d9488',
    '--header-text-color': config.header_text_color || '#ffffff',
    '--header-hover-color': config.header_hover_color || '#f1c40f',
    '--header-shadow': config.header_shadow || '0 4px 12px rgba(0,0,0,0.08)',
    '--logo-width': config.logo_width || '200px',
    '--logo-mobile-width': config.logo_mobile_width || '120px',
  };

  return (
    <header className="header" style={headerStyles}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/" onClick={closeMobileMenu}>
            <img 
              src={logoSrc} 
              alt="Logo Pousada" 
              className="logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultLogo;
              }}
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="nav-desktop" aria-label="Menu principal">
          <ul className="nav-list">
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/a-pousada">A POUSADA</Link></li>
            <li><Link to="/quartos">QUARTOS</Link></li>
            <li><Link to="/localizacao">LOCALIZAÇÃO</Link></li>
            <li><Link to="/contato">CONTATO</Link></li>
          </ul>
        </nav>
        
        {/* Desktop Reservas Button */}
        <Link to="/contato" className="reservas-btn">
          RESERVAS
        </Link>
        
        {/* Hamburger Menu - Só renderiza em mobile */}
        {isMobile && (
          <button 
            className={`hamburger-menu ${mobileMenuOpen ? 'open' : ''}`} 
            onClick={toggleMobileMenu}
            aria-label="Menu de navegação"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        )}
      </div>

      {/* Mobile Overlay - Só renderiza em mobile */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
      
      {/* Mobile Navigation - Só renderiza em mobile */}
      {isMobile && (
        <nav 
          id="mobile-menu"
          className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`}
          aria-label="Menu mobile"
        >
          <div className="nav-mobile-content">
            <ul className="nav-list-mobile">
              <li>
                <Link to="/" onClick={closeMobileMenu}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/a-pousada" onClick={closeMobileMenu}>
                  A POUSADA
                </Link>
              </li>
              <li>
                <Link to="/quartos" onClick={closeMobileMenu}>
                  QUARTOS
                </Link>
              </li>
              <li>
                <Link to="/localizacao" onClick={closeMobileMenu}>
                  LOCALIZAÇÃO
                </Link>
              </li>
              <li>
                <Link to="/contato" onClick={closeMobileMenu}>
                  CONTATO
                </Link>
              </li>
            </ul>
            
            <Link 
              to="/contato" 
              className="mobile-reservas-btn" 
              onClick={closeMobileMenu}
            >
              <span>FAZER RESERVA</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;