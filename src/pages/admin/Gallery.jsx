// src/pages/admin/Gallery.jsx
import React from 'react';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';

const Gallery = () => {
  const photos = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem'}}>
        <h2 style={{color: '#1e293b', margin:0}}>Galeria de Fotos</h2>
        <button className="admin-btn" style={{width:'auto', display:'flex', alignItems:'center', gap:'5px'}}>
          <Plus size={18} /> <span style={{display: 'inline-block'}}>Adicionar Foto</span>
        </button>
      </div>

      <div className="content-grid">
        {photos.map((item) => (
          <div key={item} className="content-card">
            <div className="card-img">
               {/* Simulação de imagem */}
               <div style={{textAlign:'center', color:'#94a3b8'}}>
                 <ImageIcon size={40} style={{opacity:0.5}} />
               </div>
            </div>
            <div className="card-body">
              <span style={{fontSize:'0.85rem', color:'#64748b'}}>img_{item}.jpg</span>
              <div className="card-actions">
                <button className="btn-sm btn-delete" title="Excluir"><Trash2 size={16}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;