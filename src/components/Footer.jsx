import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <div className="footer-address">
            <h3>Localização</h3>
            <p>Rua Pinto Branco 206, Vila do Trinta</p>
            <p>Fernando de Noronha, CEP 53990-000, Brasil</p>
          </div>
          
          <div className="footer-contact">
            <h3>Contato</h3>
            <p>Fone: (81) 3224-4476</p>
            <p>WhatsApp: (81) 98230-7332</p>
          </div>
          
          <div className="footer-links">
            <h3>Links Rápidos</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/a-pousada">A Pousada</Link></li>
              <li><Link to="/quartos">Quartos</Link></li>
              <li><Link to="/localizacao">Localização</Link></li>
              <li><Link to="/tarifas">Tarifas</Link></li>
              <li><Link to="/contato">Contato</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Pousada da Villa. Todos os direitos reservados.</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;