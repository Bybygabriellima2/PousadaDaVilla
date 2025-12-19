// src/contexts/PagesContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ConfigContext } from './ConfigContext';

export const PagesContext = createContext();

export const PagesProvider = ({ children }) => {
  const { API_URL } = useContext(ConfigContext);
  const [pages, setPages] = useState([]);
  const [components, setComponents] = useState({});
  const [loading, setLoading] = useState(true);

  // Buscar páginas ativas
  const fetchPages = async () => {
    try {
      const res = await axios.get(`${API_URL}/pages/active`);
      setPages(res.data);
    } catch (err) {
      console.error('Erro ao buscar páginas:', err);
    }
  };

  // Buscar componentes ativos de uma página
  const fetchPageComponents = async (pageKey) => {
    try {
      const res = await axios.get(`${API_URL}/components/${pageKey}/active`);
      setComponents(prev => ({
        ...prev,
        [pageKey]: res.data
      }));
    } catch (err) {
      console.error(`Erro ao buscar componentes de ${pageKey}:`, err);
    }
  };

  // Verificar se um componente está ativo
  const isComponentActive = (pageKey, componentKey) => {
    return components[pageKey]?.[componentKey] === true;
  };

  // Verificar se uma página está ativa
  const isPageActive = (pageKey) => {
    return pages.some(page => page.page_key === pageKey && page.is_active);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchPages();
      setLoading(false);
    };
    loadData();
  }, [API_URL]);

  return (
    <PagesContext.Provider value={{
      pages,
      components,
      loading,
      isComponentActive,
      isPageActive,
      fetchPages,
      fetchPageComponents
    }}>
      {children}
    </PagesContext.Provider>
  );
};