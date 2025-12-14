import React from 'react';
import { Save } from 'lucide-react';

const Settings = () => {
  return (
    <div>
      <h2 style={{marginBottom: '2rem', color: '#1e293b'}}>Configurações Gerais</h2>

      <div className="config-section">
        <h3>Informações de Contato</h3>
        <p style={{marginBottom: '1.5rem', color:'#64748b'}}>Essas informações aparecerão no rodapé e na página de contato.</p>
        
        <div style={{display:'grid', gap:'1.5rem'}}>
          <div className="form-group">
            <label>E-mail de Contato</label>
            <input type="email" className="form-input" defaultValue="contato@pousadadavilla.com" />
          </div>
          
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
             <div className="form-group">
                <label>Telefone</label>
                <input type="text" className="form-input" defaultValue="(81) 3224-4476" />
             </div>
             <div className="form-group">
                <label>WhatsApp</label>
                <input type="text" className="form-input" defaultValue="(81) 98230-7332" />
             </div>
          </div>
          
          <div className="form-group">
            <label>Endereço Completo</label>
            <input type="text" className="form-input" defaultValue="Rua Pinto Branco 206, Vila do Trinta" />
          </div>
        </div>
      </div>

      <div className="config-section">
        <h3>SEO & Google</h3>
        <div className="form-group">
            <label>Título do Site (Meta Title)</label>
            <input type="text" className="form-input" defaultValue="Pousada da Villa - Fernando de Noronha" />
        </div>
        <div className="form-group">
            <label>Descrição (Meta Description)</label>
            <textarea className="form-input" rows="3" defaultValue="Conheça a Pousada da Villa em Fernando de Noronha. Conforto, tranquilidade e ótima localização."></textarea>
        </div>
      </div>

      <div className="save-bar">
        <button className="admin-btn" style={{width: 'auto', display:'flex', alignItems:'center', gap:'8px'}}>
            <Save size={18} /> Salvar Configurações
        </button>
      </div>
    </div>
  );
};

export default Settings;