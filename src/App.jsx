// ======================================
// src/App.jsx - COMPLETO E ATUALIZADO
// ======================================
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from './contexts/ConfigContext';
import { PagesProvider } from './contexts/PagesContext';
import ScrollToTop from './components/ScrollToTop';
import DynamicStyles from './components/DynamicStyles'; // 🔥 IMPORTAÇÃO CRÍTICA
import Header from './components/Header';
import Footer from './components/Footer';

// Páginas Públicas
import Home from './pages/Home';
import Pousada from './pages/Pousada';
import Quartos from './pages/Quartos';
import Localizacao from './pages/Localizacao';
import Contato from './pages/Contato';

// Páginas Admin
import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Customize from './pages/admin/Customize';
import TextEditor from './pages/admin/TextEditor';
import SiteImages from './pages/admin/SiteImages';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import PagesManager from './pages/admin/PagesManager';
import Settings from './pages/admin/Settings';

import './styles/main.css';
import './styles/admin-styles.css';

// Componente de Proteção de Rota
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin" />;
};

function App() {
  return (
    <ConfigProvider>
      <PagesProvider>
        {/* 🔥 DYNAMICSTYLES DEVE ESTAR AQUI - DENTRO DOS PROVIDERS */}
        <DynamicStyles />
        
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            } />
            
            <Route path="/a-pousada" element={
              <>
                <Header />
                <Pousada />
                <Footer />
              </>
            } />
            
            <Route path="/quartos" element={
              <>
                <Header />
                <Quartos />
                <Footer />
              </>
            } />
            
            <Route path="/localizacao" element={
              <>
                <Header />
                <Localizacao />
                <Footer />
              </>
            } />
            
            <Route path="/contato" element={
              <>
                <Header />
                <Contato />
                <Footer />
              </>
            } />

            {/* Login Admin */}
            <Route path="/admin" element={<Login />} />
            
            {/* Rotas Admin Protegidas */}
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="customize" element={<Customize />} />
              <Route path="texts" element={<TextEditor />} />
              <Route path="images" element={<SiteImages />} />
              <Route path="gallery" element={<GalleryAdmin />} />
              <Route path="pages" element={<PagesManager />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </PagesProvider>
    </ConfigProvider>
  );
}

export default App;