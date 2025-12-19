
// ======================================
// src/pages/admin/AdminLayout.jsx - ATUALIZADO
// ======================================
import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Image, Type, Palette, Settings, LogOut, 
  Home, Menu, X, FileText, Layout as LayoutIcon 
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const closeSidebar = () => setIsSidebarOpen(false);
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="admin-body admin-layout">
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'show' : ''}`} 
        onClick={closeSidebar}
      ></div>

      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
           <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
             <Home color="#0d9488" />
             <span style={{fontWeight: 'bold', fontSize: '1.1rem'}}>Painel Admin</span>
           </div>
           <button className="close-sidebar-btn" onClick={closeSidebar}>
             <X size={24} />
           </button>
        </div>
        
        <nav className="sidebar-menu">
          <Link to="/admin/customize" onClick={closeSidebar} className={`menu-item ${isActive('/admin/customize')}`}>
            <Palette /> Aparência
          </Link>
          <Link to="/admin/texts" onClick={closeSidebar} className={`menu-item ${isActive('/admin/texts')}`}>
            <FileText /> Textos do Site
          </Link>
          <Link to="/admin/images" onClick={closeSidebar} className={`menu-item ${isActive('/admin/images')}`}>
            <Image /> Imagens do Site
          </Link>
          <Link to="/admin/gallery" onClick={closeSidebar} className={`menu-item ${isActive('/admin/gallery')}`}>
            <Image /> Galeria
          </Link>
          <Link to="/admin/pages" onClick={closeSidebar} className={`menu-item ${isActive('/admin/pages')}`}>
            <LayoutIcon /> Páginas
          </Link>

        </nav>

        <div style={{padding: '1rem'}}>
          <button onClick={handleLogout} className="menu-item" style={{background: 'none', border: 'none', width: '100%', cursor: 'pointer', color: '#ef4444'}}>
            <LogOut /> Sair
          </button>
        </div>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
          <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
            <button className="mobile-toggle" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h3 style={{margin:0}}>Área Administrativa</h3>
          </div>
          <div className="user-profile">
            <span style={{display: window.innerWidth < 768 ? 'none' : 'block'}}>Admin</span>
            <div className="avatar">A</div>
          </div>
        </header>
        
        <div className="admin-main">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;