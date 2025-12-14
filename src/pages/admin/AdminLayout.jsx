import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image, Type, Palette, Settings, LogOut, Home, Menu, X } from 'lucide-react';

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
      {/* Overlay para Mobile */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'show' : ''}`} 
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
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
          <Link to="/admin/dashboard" onClick={closeSidebar} className={`menu-item ${isActive('/admin/dashboard')}`}>
            <LayoutDashboard /> Dashboard
          </Link>
          <Link to="/admin/customize" onClick={closeSidebar} className={`menu-item ${isActive('/admin/customize')}`}>
            <Palette /> Aparência
          </Link>
          <Link to="/admin/content" onClick={closeSidebar} className={`menu-item ${isActive('/admin/content')}`}>
            <Type /> Conteúdo
          </Link>
          <Link to="/admin/gallery" onClick={closeSidebar} className={`menu-item ${isActive('/admin/gallery')}`}>
            <Image /> Galeria
          </Link>
          <Link to="/admin/settings" onClick={closeSidebar} className={`menu-item ${isActive('/admin/settings')}`}>
            <Settings /> Configurações
          </Link>
        </nav>

        <div style={{padding: '1rem'}}>
          <button onClick={handleLogout} className="menu-item" style={{background: 'none', border: 'none', width: '100%', cursor: 'pointer', color: '#ef4444'}}>
            <LogOut /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
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