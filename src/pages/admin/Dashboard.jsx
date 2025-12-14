// src/pages/admin/Dashboard.jsx
import React from 'react';
import { Users, Eye, Calendar, DollarSign } from 'lucide-react';

const Dashboard = () => {
  return (
    <div>
      <h2 style={{marginBottom: '2rem', color: '#1e293b'}}>Visão Geral</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h3>Visitas hoje</h3>
            <p>124</p>
          </div>
          <div className="stat-icon">
            <Eye />
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>Reservas (Mês)</h3>
            <p>38</p>
          </div>
          <div className="stat-icon">
            <Calendar />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Solicitações</h3>
            <p>12</p>
          </div>
          <div className="stat-icon">
            <Users />
          </div>
        </div>

        
      </div>

      <div className="config-section">
        <h2>Atalhos Rápidos</h2>
        <p>Bem-vindo ao painel de controle da Pousada da Villa. Utilize o menu lateral para gerenciar todo o conteúdo do seu site.</p>
      </div>
    </div>
  );
};

export default Dashboard;