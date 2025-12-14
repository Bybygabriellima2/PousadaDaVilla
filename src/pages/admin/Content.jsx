// src/pages/admin/Content.jsx
import React from 'react';
import { Edit, Eye, Plus } from 'lucide-react';

const Content = () => {
  const pages = [
    { id: 1, title: 'Página Inicial (Home)', lastEdit: 'Hoje, 10:30', status: 'Publicado' },
    { id: 2, title: 'A Pousada', lastEdit: 'Ontem', status: 'Publicado' },
    { id: 3, title: 'Nossos Quartos', lastEdit: '2 dias atrás', status: 'Publicado' },
    { id: 4, title: 'Localização', lastEdit: '1 semana atrás', status: 'Rascunho' },
    { id: 5, title: 'Contato', lastEdit: '1 semana atrás', status: 'Publicado' },
  ];

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem'}}>
        <h2 style={{color: '#1e293b', margin:0}}>Gerenciar Conteúdo</h2>
        <button className="admin-btn" style={{width:'auto', display:'flex', alignItems:'center', gap:'5px'}}>
            <Plus size={18}/> <span style={{display: 'inline-block'}}>Nova Página</span>
        </button>
      </div>

      <div className="config-section" style={{padding: '0', overflow: 'hidden'}}>
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Título da Página</th>
                <th>Última Edição</th>
                <th>Status</th>
                <th style={{textAlign:'right'}}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pages.map(page => (
                <tr key={page.id}>
                  <td data-label="Título" style={{fontWeight:'500'}}>{page.title}</td>
                  <td data-label="Última Edição" style={{color:'#64748b'}}>{page.lastEdit}</td>
                  <td data-label="Status">
                    <span style={{
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '20px', 
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      background: page.status === 'Publicado' ? '#dcfce7' : '#f1f5f9',
                      color: page.status === 'Publicado' ? '#166534' : '#475569',
                      display: 'inline-block'
                    }}>
                      {page.status}
                    </span>
                  </td>
                  <td data-label="Ações" style={{textAlign:'right'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '8px'}}>
                        <button className="btn-sm btn-edit" title="Editar"><Edit size={16}/></button>
                        <button className="btn-sm" style={{background:'#f1f5f9', color:'#475569'}} title="Ver"><Eye size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default Content;