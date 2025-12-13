import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pousada from './pages/Pousada';
import Quartos from './pages/Quartos';
import Localizacao from './pages/Localizacao';
import Contato from './pages/Contato';
import ScrollToTop from './components/ScrollToTop';

// Importando os estilos separados
import './styles/main.css';
import './styles/footer-styles.css';
import './styles/pousada-styles.css';
import './styles/quartos-styles.css';
import './styles/localizacao-styles.css';
import './styles/contato-styles.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-pousada" element={<Pousada />} />
          <Route path="/quartos" element={<Quartos />} />
          <Route path="/localizacao" element={<Localizacao />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;