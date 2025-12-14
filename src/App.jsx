// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pousada from './pages/Pousada';
import Quartos from './pages/Quartos';
import Localizacao from './pages/Localizacao';
import Contato from './pages/Contato';
import ScrollToTop from './components/ScrollToTop';

// Admin Imports - ATENÇÃO AOS CAMINHOS
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Customize from './pages/admin/Customize';
import Content from './pages/admin/Content'; // Novo
import Gallery from './pages/admin/Gallery'; // Novo
import Settings from './pages/admin/Settings'; // Novo

// Se você manteve o layout na pasta pages, use este import:
import AdminLayout from './pages/admin/AdminLayout';
// Se você moveu para components, use este:
// import AdminLayout from './components/admin/AdminLayout';

import './styles/main.css';
import './styles/footer-styles.css';
import './styles/pousada-styles.css';
import './styles/quartos-styles.css';
import './styles/localizacao-styles.css';
import './styles/contato-styles.css';
import './styles/admin-styles.css';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin" />;
};

const SiteLayout = ({ children }) => (
  <div className="app">
    <Header />
    {children}
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Site Público */}
        <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
        <Route path="/a-pousada" element={<SiteLayout><Pousada /></SiteLayout>} />
        <Route path="/quartos" element={<SiteLayout><Quartos /></SiteLayout>} />
        <Route path="/localizacao" element={<SiteLayout><Localizacao /></SiteLayout>} />
        <Route path="/contato" element={<SiteLayout><Contato /></SiteLayout>} />

        {/* Admin Login */}
        <Route path="/admin" element={<Login />} />
        
        {/* Painel Administrativo */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customize" element={<Customize />} />
          <Route path="content" element={<Content />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;