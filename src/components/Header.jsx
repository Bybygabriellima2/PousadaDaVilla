import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Ajuste o caminho se necessário
import '../styles/header-styles.css'; // Importamos o CSS em arquivo separado

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fechar o menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);
  
  // Bloquear rolagem quando o menu estiver aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    // Cleanup quando o componente for desmontado
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Pousada da Villa Logo" className="logo" />
          </Link>
        </div>
        
        <nav className="nav-desktop">
          <ul className="nav-list">
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/a-pousada">A POUSADA</Link></li>
            <li><Link to="/quartos">QUARTOS</Link></li>
            <li><Link to="/localizacao">LOCALIZAÇÃO</Link></li>
            <li><Link to="/tarifas">TARIFAS</Link></li>
            <li><Link to="/contato">CONTATO</Link></li>
          </ul>
        </nav>
        
        <Link to="/reservas" className="reservas-btn">RESERVAS</Link>
        
        <div 
          className={`hamburger-menu ${mobileMenuOpen ? 'open' : ''}`} 
          onClick={toggleMobileMenu}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
      </div>

      {/* Overlay para fechar o menu ao clicar fora */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={closeMobileMenu}
        ></div>
      )}
      
      {/* Menu Mobile */}
      <nav className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="nav-mobile-content">
          <ul className="nav-list-mobile">
            <li><Link to="/" onClick={closeMobileMenu}>HOME</Link></li>
            <li><Link to="/a-pousada" onClick={closeMobileMenu}>A POUSADA</Link></li>
            <li><Link to="/quartos" onClick={closeMobileMenu}>QUARTOS</Link></li>
            <li><Link to="/localizacao" onClick={closeMobileMenu}>LOCALIZAÇÃO</Link></li>
            <li><Link to="/tarifas" onClick={closeMobileMenu}>TARIFAS</Link></li>
            <li><Link to="/contato" onClick={closeMobileMenu}>CONTATO</Link></li>
          </ul>
          <Link to="/reservas" className="mobile-reservas-btn" onClick={closeMobileMenu}>
            RESERVAS
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;