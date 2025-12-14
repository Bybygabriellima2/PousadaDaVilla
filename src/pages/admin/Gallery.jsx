import React from 'react';
import { Trash2, Plus } from 'lucide-react';

const Gallery = () => {
  // Array simulando imagens carregadas
  const photos = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem'}}>
        <h2 style={{color: '#1e293b', margin:0}}>Galeria de Fotos</h2>
        <button className="admin-btn" style={{width:'auto', display:'flex', alignItems:'center', gap:'5px'}}>
          <Plus size={18} /> Adicionar Foto
        </button>
      </div>

      <div className="content-grid">
        {photos.map((item) => (
          <div key={item} className="content-card">
            <div className="card-img">
               {/* Placeholder de imagem */}
               <div style={{textAlign:'center', color:'#94a3b8'}}>
                 <span style={{fontSize:'2rem'}}>📷</span>
                 <p style={{fontSize:'0.8rem'}}>Foto {item}.jpg</p>
               </div>
            </div>
            <div className="card-body">
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