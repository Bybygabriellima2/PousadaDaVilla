import React from 'react';
import { Edit, Eye } from 'lucide-react';

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
        <button className="admin-btn" style={{width:'auto'}}> - ocultar pagina</button>
      </div>

      <div className="config-section" style={{padding: '0'}}>
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse', minWidth: '600px'}}>
            <thead>
              <tr style={{background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left'}}>
                <th style={{padding: '1rem'}}>Título da Página</th>
                <th style={{padding: '1rem'}}>Última Edição</th>
                <th style={{padding: '1rem'}}>Status</th>
                <th style={{padding: '1rem', textAlign:'right'}}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pages.map(page => (
                <tr key={page.id} style={{borderBottom: '1px solid #f1f5f9'}}>
                  <td style={{padding: '1rem', fontWeight:'500'}}>{page.title}</td>
                  <td style={{padding: '1rem', color:'#64748b'}}>{page.lastEdit}</td>
                  <td style={{padding: '1rem'}}>
                    <span style={{
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '20px', 
                      fontSize: '0.8rem',
                      background: page.status === 'Publicado' ? '#dcfce7' : '#f1f5f9',
                      color: page.status === 'Publicado' ? '#166534' : '#475569'
                    }}>
                      {page.status}
                    </span>
                  </td>
                  <td style={{padding: '1rem', textAlign:'right'}}>
                    <button className="btn-sm btn-edit" style={{marginRight:'5px'}} title="Editar"><Edit size={16}/></button>
                    <button className="btn-sm" style={{background:'#f1f5f9', color:'#475569'}} title="Ver"><Eye size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Content;