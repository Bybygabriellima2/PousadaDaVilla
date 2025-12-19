// src/pages/admin/PagesManager.jsx
import React, { useState, useEffect, useContext } from 'react';
import { ConfigContext } from '../../contexts/ConfigContext';
import axios from 'axios';
import { 
  Save, Check, Loader, Eye, EyeOff, Menu as MenuIcon, 
  Layout, ChevronDown, ChevronRight, ToggleLeft, ToggleRight
} from 'lucide-react';

const PagesManager = () => {
  const { API_URL } = useContext(ConfigContext);
  const [pages, setPages] = useState([]);
  const [components, setComponents] = useState([]);
  const [expandedPage, setExpandedPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadData();
  }, [API_URL]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pagesRes, componentsRes] = await Promise.all([
        axios.get(`${API_URL}/pages`),
        axios.get(`${API_URL}/components`)
      ]);
      setPages(pagesRes.data);
      setComponents(componentsRes.data);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const togglePageActive = (pageId) => {
    setPages(prev => prev.map(page => 
      page.id === pageId ? { ...page, is_active: !page.is_active } : page
    ));
    setHasChanges(true);
  };

  const togglePageMenu = (pageId) => {
    setPages(prev => prev.map(page => 
      page.id === pageId ? { ...page, show_in_menu: !page.show_in_menu } : page
    ));
    setHasChanges(true);
  };

  const toggleComponentActive = (componentId) => {
    setComponents(prev => prev.map(comp => 
      comp.id === componentId ? { ...comp, is_active: !comp.is_active } : comp
    ));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Salvar páginas
      const pagePromises = pages.map(page =>
        axios.put(`${API_URL}/pages/${page.id}`, {
          is_active: page.is_active,
          show_in_menu: page.show_in_menu,
          menu_order: page.menu_order
        })
      );

      // Salvar componentes
      const componentUpdates = components.map(comp => ({
        id: comp.id,
        is_active: comp.is_active,
        display_order: comp.display_order
      }));

      await Promise.all([
        ...pagePromises,
        axios.post(`${API_URL}/components/batch-update`, { updates: componentUpdates })
      ]);

      setShowToast(true);
      setHasChanges(false);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      alert('Erro ao salvar: ' + (err.response?.data?.error || err.message));
    } finally {
      setSaving(false);
    }
  };

  const getPageComponents = (pageKey) => {
    return components.filter(comp => comp.page_key === pageKey);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Loader className="spin" size={32} color="#0d9488" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Layout size={28} color="#0d9488" />
          <h2 style={{ margin: 0, color: '#1e293b', fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>
            Gerenciar Páginas e Componentes
          </h2>
        </div>

        {hasChanges && (
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.75rem 2rem',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              opacity: saving ? 0.6 : 1,
              width: '100%',
              justifyContent: 'center',
              maxWidth: '300px'
            }}
          >
            {saving ? (
              <><Loader className="spin" size={18} /> Salvando...</>
            ) : (
              <><Save size={18} /> Salvar Alterações</>
            )}
          </button>
        )}
      </div>

      <div style={{
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        {/* Header - oculto em mobile */}
        <div style={{
          background: '#f8fafc',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'none',
          gap: '2rem',
          fontSize: '0.875rem',
          color: '#64748b',
          fontWeight: '500'
        }} className="desktop-header">
          <div style={{ flex: 1 }}>Página / Componente</div>
          <div style={{ width: '120px', textAlign: 'center' }}>Visível</div>
          <div style={{ width: '120px', textAlign: 'center' }}>No Menu</div>
        </div>

        {pages.map(page => {
          const pageComponents = getPageComponents(page.page_key);
          const isExpanded = expandedPage === page.id;

          return (
            <div key={page.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              {/* Linha da Página */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem',
                background: isExpanded ? '#f8fafc' : 'white',
                transition: 'all 0.2s',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => setExpandedPage(isExpanded ? null : page.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#64748b',
                    flexShrink: 0
                  }}
                >
                  {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>

                <div style={{ 
                  flex: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  minWidth: '150px'
                }}>
                  <MenuIcon size={18} color="#0d9488" style={{ flexShrink: 0 }} />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ 
                      fontWeight: '600', 
                      color: '#1e293b',
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {page.page_name}
                    </div>
                    <div style={{ 
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.8rem)', 
                      color: '#64748b',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {page.page_path}
                    </div>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  gap: '1rem',
                  alignItems: 'center',
                  flexShrink: 0
                }}>
                  <button
                    onClick={() => togglePageActive(page.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title={page.is_active ? 'Ocultar página' : 'Mostrar página'}
                  >
                    {page.is_active ? (
                      <Eye size={22} color="#10b981" />
                    ) : (
                      <EyeOff size={22} color="#94a3b8" />
                    )}
                  </button>

                  <button
                    onClick={() => togglePageMenu(page.id)}
                    disabled={!page.is_active}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: page.is_active ? 'pointer' : 'not-allowed',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      opacity: page.is_active ? 1 : 0.3
                    }}
                    title={page.show_in_menu ? 'Remover do menu' : 'Adicionar ao menu'}
                  >
                    {page.show_in_menu ? (
                      <ToggleRight size={28} color="#0d9488" />
                    ) : (
                      <ToggleLeft size={28} color="#94a3b8" />
                    )}
                  </button>
                </div>
              </div>

              {/* Componentes da Página */}
              {isExpanded && pageComponents.length > 0 && (
                <div style={{
                  background: '#fafbfc',
                  borderTop: '1px solid #e2e8f0'
                }}>
                  {pageComponents.map((component, idx) => (
                    <div
                      key={component.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1rem 0.75rem 2.5rem',
                        borderBottom: idx < pageComponents.length - 1 ? '1px solid #e2e8f0' : 'none',
                        flexWrap: 'wrap'
                      }}
                    >
                      <div style={{ 
                        flex: 1, 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        minWidth: '150px',
                        overflow: 'hidden'
                      }}>
                        <div style={{ 
                          width: '4px', 
                          height: '4px', 
                          borderRadius: '50%', 
                          background: '#cbd5e1',
                          flexShrink: 0
                        }}></div>
                        <span style={{ 
                          fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)', 
                          color: '#475569',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {component.component_name}
                        </span>
                      </div>

                      <div style={{ 
                        display: 'flex',
                        gap: '1rem',
                        flexShrink: 0
                      }}>
                        <button
                          onClick={() => toggleComponentActive(component.id)}
                          disabled={!page.is_active}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: page.is_active ? 'pointer' : 'not-allowed',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            opacity: page.is_active ? 1 : 0.3
                          }}
                          title={component.is_active ? 'Ocultar componente' : 'Mostrar componente'}
                        >
                          {component.is_active ? (
                            <Eye size={20} color="#10b981" />
                          ) : (
                            <EyeOff size={20} color="#94a3b8" />
                          )}
                        </button>
                        <div style={{ width: '28px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legenda */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ 
          marginBottom: '1rem', 
          color: '#1e293b', 
          fontSize: 'clamp(0.9rem, 2vw, 1rem)' 
        }}>
          Legenda:
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '0.75rem', 
          fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', 
          color: '#64748b' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Eye size={18} color="#10b981" style={{ flexShrink: 0 }} />
            <span>Página/componente visível no site</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <EyeOff size={18} color="#94a3b8" style={{ flexShrink: 0 }} />
            <span>Página/componente oculto</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ToggleRight size={22} color="#0d9488" style={{ flexShrink: 0 }} />
            <span>Página aparece no menu</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ToggleLeft size={22} color="#94a3b8" style={{ flexShrink: 0 }} />
            <span>Página não aparece no menu</span>
          </div>
        </div>
        <p style={{ 
          marginTop: '1rem', 
          fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', 
          fontStyle: 'italic', 
          color: '#64748b' 
        }}>
          * Ao ocultar uma página, todos seus componentes também serão ocultados automaticamente.
        </p>
      </div>

      {/* Toast */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          left: '1rem',
          background: '#10b981',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <Check size={20} style={{ flexShrink: 0 }} />
          <span style={{ fontWeight: '500', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
            Alterações salvas com sucesso!
          </span>
        </div>
      )}

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @media (min-width: 768px) {
          .desktop-header {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PagesManager;