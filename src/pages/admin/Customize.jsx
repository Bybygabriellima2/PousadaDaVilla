// src/pages/admin/Customize.jsx
import React, { useState } from 'react';
import { Check } from 'lucide-react';

const Customize = () => {
  const [showToast, setShowToast] = useState(false);
  
  // Estados simulados para demonstração
  const [colors, setColors] = useState({
    primary: '#00857c',
    secondary: '#f9f2e7',
    header: '#006f72',
    footer: '#00857c'
  });

  const handleColorChange = (key, value) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div>
      <h2 style={{marginBottom: '2rem', color: '#1e293b'}}>Personalização Visual</h2>

      {/* Seção de Cores */}
      <div className="config-section">
        <h2>Paleta de Cores</h2>
        <p style={{marginBottom: '1.5rem', color: '#64748b'}}>Altere as cores principais do site em tempo real.</p>
        
        <div className="color-grid">
          <div className="color-input-group">
            <label>Cor Primária (Botões/Destaques)</label>
            <div className="color-preview">
              <input 
                type="color" 
                value={colors.primary} 
                onChange={(e) => handleColorChange('primary', e.target.value)} 
              />
              <input 
                type="text" 
                value={colors.primary} 
                readOnly
              />
            </div>
          </div>

          <div className="color-input-group">
            <label>Fundo Secundário</label>
            <div className="color-preview">
              <input 
                type="color" 
                value={colors.secondary} 
                onChange={(e) => handleColorChange('secondary', e.target.value)} 
              />
              <input type="text" value={colors.secondary} readOnly />
            </div>
          </div>

          <div className="color-input-group">
            <label>Cor do Cabeçalho (Header)</label>
            <div className="color-preview">
              <input 
                type="color" 
                value={colors.header} 
                onChange={(e) => handleColorChange('header', e.target.value)} 
              />
              <input type="text" value={colors.header} readOnly />
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Logo */}
      <div className="config-section">
        <h2>Identidade Visual (Logo)</h2>
        <div style={{display: 'flex', gap: '20px', alignItems: 'center', marginTop: '1rem'}}>
            <div style={{
                width: '150px', 
                height: '150px', 
                border: '2px dashed #cbd5e1', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8'
            }}>
                Preview Logo
            </div>
            <div>
                <p style={{marginBottom: '10px'}}>Carregue uma nova logo para o site (PNG ou SVG).</p>
                <button className="btn-secondary">Carregar Imagem</button>
            </div>
        </div>
      </div>

      {/* Barra de Ação */}
      <div className="save-bar">
        <button className="btn-secondary">Cancelar</button>
        <button className="admin-btn" style={{width: 'auto', padding: '0.75rem 2rem'}} onClick={handleSave}>
            Salvar Alterações
        </button>
      </div>

      {/* Notificação de Sucesso */}
      {showToast && (
        <div className="toast">
          <Check size={20} />
          <span>Alterações salvas com sucesso! (Modo Demo)</span>
        </div>
      )}
    </div>
  );
};

export default Customize;