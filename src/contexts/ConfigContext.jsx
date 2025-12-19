// src/contexts/ConfigContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({
    primary_color: '#0d9488', // Cor padrão
    secondary_color: '#f9f2e7',
    site_logo: null // Logo padrão será carregada se for null
  });

  // URL da API
  const API_URL = 'http://localhost:3001/api'; 

  const fetchConfig = () => {
    axios.get(`${API_URL}/config`)
      .then(response => {
        if (response.data) {
          const newConfig = { ...config, ...response.data };
          setConfig(newConfig);
          
          // Aplica as cores no CSS do navegador globalmente
          if (newConfig.primary_color) {
            document.documentElement.style.setProperty('--primary-color', newConfig.primary_color);
          }
          if (newConfig.secondary_color) {
            document.documentElement.style.setProperty('--secondary-color', newConfig.secondary_color);
          }
        }
      })
      .catch(err => console.error("Erro ao carregar config:", err));
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, fetchConfig, API_URL }}>
      {children}
    </ConfigContext.Provider>
  );
};