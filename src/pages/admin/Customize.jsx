// src/pages/admin/Customize.jsx - SISTEMA COMPLETO DE CUSTOMIZAÇÃO
import React, { useState, useEffect, useContext } from 'react';
import { ConfigContext } from '../../contexts/ConfigContext';
import axios from 'axios';
import { 
  Check, Upload, Loader, RefreshCw, Trash2, Image as ImageIcon,
  Palette, Layout, Type, Eye, EyeOff, ChevronDown, ChevronUp,
  Settings, Save, X
} from 'lucide-react';
import './customize-styles.css';

const Customize = () => {
  const { config, fetchConfig, API_URL } = useContext(ConfigContext);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('colors');
  const [expandedSections, setExpandedSections] = useState({
    header: true,
    footer: true,
    buttons: true,
    carousel: true,
    cards: true
  });

  // Estado completo de customização
  const [customization, setCustomization] = useState({
    // Cores Principais
    primary_color: '#0d9488',
    secondary_color: '#f9f2e7',
    accent_color: '#daa520',
    text_color: '#333333',
    text_light: '#666666',
    background_color: '#f5f0e4',
    white_color: '#ffffff',
    
    // Header
    header_bg_color: '#0d9488',
    header_text_color: '#ffffff',
    header_hover_color: '#f1c40f',
    header_shadow: '0 2px 5px rgba(0,0,0,0.2)',
    
    // Footer
    footer_bg_color: '#00857c',
    footer_text_color: '#ffffff',
    footer_link_hover: '#f1c40f',
    
    // Botões
    button_primary_bg: '#0d9488',
    button_primary_text: '#ffffff',
    button_primary_hover_bg: '#0f766e',
    button_secondary_bg: '#f9f2e7',
    button_secondary_text: '#333333',
    button_border_radius: '4px',
    
    // Carousel
    carousel_overlay_opacity: '0.7',
    carousel_title_size: '3.5rem',
    carousel_subtitle_color: '#daa520',
    carousel_button_border_color: '#daa520',
    
    // Cards
    card_bg_color: '#ffffff',
    card_border_radius: '12px',
    card_shadow: '0 10px 30px rgba(0,0,0,0.08)',
    card_hover_shadow: '0 20px 40px rgba(0,0,0,0.15)',
    card_title_color: '#138676',
    
    // Tipografia
    font_primary: "'Montserrat', sans-serif",
    font_secondary: "'Playfair Display', serif",
    heading_weight: '700',
    body_weight: '400',
    
    // Logo
    site_logo: '',
    logo_width: '200px',
    logo_mobile_width: '160px',
    
    // Info Section
    info_section_bg: '#f8f9fa',
    info_card_hover_transform: 'translateY(-10px)',
    
    // Contact Page
    contact_hero_gradient_start: '#0d9488',
    contact_hero_gradient_end: '#14b8a6',
    contact_card_active_border: '#000000'
  });

  useEffect(() => {
    if (config) {
      setCustomization(prev => ({
        ...prev,
        ...config
      }));
    }
  }, [config]);

  const handleChange = (key, value) => {
    setCustomization(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/config`, customization);
      setToastMessage('Customização salva com sucesso!');
      setShowToast(true);
      fetchConfig();
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setToastMessage('Erro ao salvar customização');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Tem certeza? Isso resetará TODAS as customizações para os valores originais.")) return;

    setLoading(true);
    try {
      await axios.post(`${API_URL}/config/reset`);
      fetchConfig();
      setToastMessage('Customização restaurada!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setToastMessage('Erro ao restaurar');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('title', 'Site Logo');

    setUploading(true);
    try {
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setCustomization(prev => ({ ...prev, site_logo: res.data.url }));
      setToastMessage('Logo enviada com sucesso!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setToastMessage('Erro ao enviar logo');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveLogo = () => {
    setCustomization(prev => ({ ...prev, site_logo: '' }));
  };

  const getImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `http://localhost:3001${path}`;
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const ColorInput = ({ label, value, onChange, helper }) => (
    <div className="custom-input-group">
      <label>{label}</label>
      {helper && <span className="input-helper">{helper}</span>}
      <div className="color-input-wrapper">
        <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="color-picker"
        />
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="color-text"
          placeholder="#000000"
        />
      </div>
    </div>
  );

  const TextInput = ({ label, value, onChange, helper, placeholder }) => (
    <div className="custom-input-group">
      <label>{label}</label>
      {helper && <span className="input-helper">{helper}</span>}
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="text-input"
        placeholder={placeholder}
      />
    </div>
  );

  const SelectInput = ({ label, value, onChange, options, helper }) => (
    <div className="custom-input-group">
      <label>{label}</label>
      {helper && <span className="input-helper">{helper}</span>}
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="select-input"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );

  const Section = ({ title, id, children, icon: Icon }) => (
    <div className="custom-section">
      <div className="section-header" onClick={() => toggleSection(id)}>
        <div className="section-title">
          {Icon && <Icon size={20} />}
          <h3>{title}</h3>
        </div>
        {expandedSections[id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {expandedSections[id] && (
        <div className="section-content">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="customize-container">
      {/* Header com Tabs */}
      <div className="customize-header">
        <div className="header-top">
          <h1><Settings size={28} /> Sistema de Customização</h1>
          <div className="header-actions">
            <button onClick={handleReset} className="btn-reset" disabled={loading}>
              <RefreshCw size={16} />
              Restaurar Padrões
            </button>
            <button onClick={handleSave} className="btn-save-main" disabled={loading}>
              {loading ? <Loader className="spin" size={16} /> : <Save size={16} />}
              {loading ? 'Salvando...' : 'Salvar Tudo'}
            </button>
          </div>
        </div>

        <div className="tabs-container">
          <button 
            className={`tab ${activeTab === 'colors' ? 'active' : ''}`}
            onClick={() => setActiveTab('colors')}
          >
            <Palette size={18} />
            Cores
          </button>
          <button 
            className={`tab ${activeTab === 'components' ? 'active' : ''}`}
            onClick={() => setActiveTab('components')}
          >
            <Layout size={18} />
            Componentes
          </button>
          <button 
            className={`tab ${activeTab === 'typography' ? 'active' : ''}`}
            onClick={() => setActiveTab('typography')}
          >
            <Type size={18} />
            Tipografia
          </button>
          <button 
            className={`tab ${activeTab === 'logo' ? 'active' : ''}`}
            onClick={() => setActiveTab('logo')}
          >
            <ImageIcon size={18} />
            Logo & Imagens
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="customize-content">
        {/* TAB: CORES */}
        {activeTab === 'colors' && (
          <div className="tab-content">
            <div className="intro-text">
              <p>Personalize as cores do seu site. As mudanças serão aplicadas globalmente em todos os componentes.</p>
            </div>

            <Section title="Cores Principais" id="main-colors" icon={Palette}>
              <div className="input-grid">
                <ColorInput 
                  label="Cor Primária" 
                  value={customization.primary_color}
                  onChange={(val) => handleChange('primary_color', val)}
                  helper="Usada em títulos, links e elementos principais"
                />
                <ColorInput 
                  label="Cor Secundária" 
                  value={customization.secondary_color}
                  onChange={(val) => handleChange('secondary_color', val)}
                  helper="Usada em backgrounds e detalhes"
                />
                <ColorInput 
                  label="Cor de Destaque" 
                  value={customization.accent_color}
                  onChange={(val) => handleChange('accent_color', val)}
                  helper="Para CTAs e elementos que precisam chamar atenção"
                />
                <ColorInput 
                  label="Cor do Texto" 
                  value={customization.text_color}
                  onChange={(val) => handleChange('text_color', val)}
                  helper="Cor principal do texto"
                />
                <ColorInput 
                  label="Texto Claro" 
                  value={customization.text_light}
                  onChange={(val) => handleChange('text_light', val)}
                  helper="Para textos secundários"
                />
                <ColorInput 
                  label="Background" 
                  value={customization.background_color}
                  onChange={(val) => handleChange('background_color', val)}
                  helper="Cor de fundo do site"
                />
              </div>
            </Section>

            <Section title="Header" id="header" icon={Layout}>
              <div className="input-grid">
                <ColorInput 
                  label="Background do Header" 
                  value={customization.header_bg_color}
                  onChange={(val) => handleChange('header_bg_color', val)}
                />
                <ColorInput 
                  label="Cor do Texto" 
                  value={customization.header_text_color}
                  onChange={(val) => handleChange('header_text_color', val)}
                />
                <ColorInput 
                  label="Cor no Hover" 
                  value={customization.header_hover_color}
                  onChange={(val) => handleChange('header_hover_color', val)}
                />
                <TextInput 
                  label="Sombra" 
                  value={customization.header_shadow}
                  onChange={(val) => handleChange('header_shadow', val)}
                  placeholder="0 2px 5px rgba(0,0,0,0.2)"
                />
              </div>
            </Section>

            <Section title="Footer" id="footer" icon={Layout}>
              <div className="input-grid">
                <ColorInput 
                  label="Background do Footer" 
                  value={customization.footer_bg_color}
                  onChange={(val) => handleChange('footer_bg_color', val)}
                />
                <ColorInput 
                  label="Cor do Texto" 
                  value={customization.footer_text_color}
                  onChange={(val) => handleChange('footer_text_color', val)}
                />
                <ColorInput 
                  label="Links no Hover" 
                  value={customization.footer_link_hover}
                  onChange={(val) => handleChange('footer_link_hover', val)}
                />
              </div>
            </Section>

            <Section title="Botões" id="buttons" icon={Layout}>
              <div className="input-grid">
                <ColorInput 
                  label="Botão Primário - Background" 
                  value={customization.button_primary_bg}
                  onChange={(val) => handleChange('button_primary_bg', val)}
                />
                <ColorInput 
                  label="Botão Primário - Texto" 
                  value={customization.button_primary_text}
                  onChange={(val) => handleChange('button_primary_text', val)}
                />
                <ColorInput 
                  label="Botão Primário - Hover" 
                  value={customization.button_primary_hover_bg}
                  onChange={(val) => handleChange('button_primary_hover_bg', val)}
                />
                <ColorInput 
                  label="Botão Secundário - Background" 
                  value={customization.button_secondary_bg}
                  onChange={(val) => handleChange('button_secondary_bg', val)}
                />
                <ColorInput 
                  label="Botão Secundário - Texto" 
                  value={customization.button_secondary_text}
                  onChange={(val) => handleChange('button_secondary_text', val)}
                />
                <TextInput 
                  label="Border Radius" 
                  value={customization.button_border_radius}
                  onChange={(val) => handleChange('button_border_radius', val)}
                  placeholder="4px"
                />
              </div>
            </Section>
          </div>
        )}

        {/* TAB: COMPONENTES */}
        {activeTab === 'components' && (
          <div className="tab-content">
            <div className="intro-text">
              <p>Customize a aparência de componentes específicos do site.</p>
            </div>

            <Section title="Carousel" id="carousel" icon={Layout}>
              <div className="input-grid">
                <TextInput 
                  label="Opacidade do Overlay" 
                  value={customization.carousel_overlay_opacity}
                  onChange={(val) => handleChange('carousel_overlay_opacity', val)}
                  placeholder="0.7"
                  helper="0 a 1"
                />
                <TextInput 
                  label="Tamanho do Título" 
                  value={customization.carousel_title_size}
                  onChange={(val) => handleChange('carousel_title_size', val)}
                  placeholder="3.5rem"
                />
                <ColorInput 
                  label="Cor do Subtítulo" 
                  value={customization.carousel_subtitle_color}
                  onChange={(val) => handleChange('carousel_subtitle_color', val)}
                />
                <ColorInput 
                  label="Cor da Borda do Botão" 
                  value={customization.carousel_button_border_color}
                  onChange={(val) => handleChange('carousel_button_border_color', val)}
                />
              </div>
            </Section>

            <Section title="Cards" id="cards" icon={Layout}>
              <div className="input-grid">
                <ColorInput 
                  label="Background dos Cards" 
                  value={customization.card_bg_color}
                  onChange={(val) => handleChange('card_bg_color', val)}
                />
                <TextInput 
                  label="Border Radius" 
                  value={customization.card_border_radius}
                  onChange={(val) => handleChange('card_border_radius', val)}
                  placeholder="12px"
                />
                <TextInput 
                  label="Sombra Normal" 
                  value={customization.card_shadow}
                  onChange={(val) => handleChange('card_shadow', val)}
                  placeholder="0 10px 30px rgba(0,0,0,0.08)"
                />
                <TextInput 
                  label="Sombra no Hover" 
                  value={customization.card_hover_shadow}
                  onChange={(val) => handleChange('card_hover_shadow', val)}
                  placeholder="0 20px 40px rgba(0,0,0,0.15)"
                />
                <ColorInput 
                  label="Cor do Título" 
                  value={customization.card_title_color}
                  onChange={(val) => handleChange('card_title_color', val)}
                />
                <TextInput 
                  label="Transformação no Hover" 
                  value={customization.card_hover_transform}
                  onChange={(val) => handleChange('card_hover_transform', val)}
                  placeholder="translateY(-10px)"
                />
              </div>
            </Section>

            <Section title="Info Section" id="info" icon={Layout}>
              <div className="input-grid">
                <ColorInput 
                  label="Background" 
                  value={customization.info_section_bg}
                  onChange={(val) => handleChange('info_section_bg', val)}
                />
                <TextInput 
                  label="Card Hover Transform" 
                  value={customization.info_card_hover_transform}
                  onChange={(val) => handleChange('info_card_hover_transform', val)}
                  placeholder="translateY(-10px)"
                />
              </div>
            </Section>

            <Section title="Contact Page" id="contact" icon={Layout}>
              <div className="input-grid">
                <ColorInput 
                  label="Hero Gradient - Início" 
                  value={customization.contact_hero_gradient_start}
                  onChange={(val) => handleChange('contact_hero_gradient_start', val)}
                />
                <ColorInput 
                  label="Hero Gradient - Fim" 
                  value={customization.contact_hero_gradient_end}
                  onChange={(val) => handleChange('contact_hero_gradient_end', val)}
                />
                <ColorInput 
                  label="Card Active Border" 
                  value={customization.contact_card_active_border}
                  onChange={(val) => handleChange('contact_card_active_border', val)}
                />
              </div>
            </Section>
          </div>
        )}

        {/* TAB: TIPOGRAFIA */}
        {activeTab === 'typography' && (
          <div className="tab-content">
            <div className="intro-text">
              <p>Configure as fontes e estilos de texto do site.</p>
            </div>

            <Section title="Fontes" id="fonts" icon={Type}>
              <div className="input-grid">
                <SelectInput 
                  label="Fonte Primária (Corpo)" 
                  value={customization.font_primary}
                  onChange={(val) => handleChange('font_primary', val)}
                  options={[
                    { value: "'Montserrat', sans-serif", label: "Montserrat" },
                    { value: "'Roboto', sans-serif", label: "Roboto" },
                    { value: "'Open Sans', sans-serif", label: "Open Sans" },
                    { value: "'Lato', sans-serif", label: "Lato" },
                    { value: "'Poppins', sans-serif", label: "Poppins" }
                  ]}
                  helper="Para textos gerais"
                />
                <SelectInput 
                  label="Fonte Secundária (Títulos)" 
                  value={customization.font_secondary}
                  onChange={(val) => handleChange('font_secondary', val)}
                  options={[
                    { value: "'Playfair Display', serif", label: "Playfair Display" },
                    { value: "'Merriweather', serif", label: "Merriweather" },
                    { value: "'Lora', serif", label: "Lora" },
                    { value: "'PT Serif', serif", label: "PT Serif" },
                    { value: "'Georgia', serif", label: "Georgia" }
                  ]}
                  helper="Para títulos e destaques"
                />
                <SelectInput 
                  label="Peso dos Títulos" 
                  value={customization.heading_weight}
                  onChange={(val) => handleChange('heading_weight', val)}
                  options={[
                    { value: "300", label: "Light (300)" },
                    { value: "400", label: "Normal (400)" },
                    { value: "500", label: "Medium (500)" },
                    { value: "600", label: "Semi-Bold (600)" },
                    { value: "700", label: "Bold (700)" },
                    { value: "800", label: "Extra-Bold (800)" }
                  ]}
                />
                <SelectInput 
                  label="Peso do Corpo" 
                  value={customization.body_weight}
                  onChange={(val) => handleChange('body_weight', val)}
                  options={[
                    { value: "300", label: "Light (300)" },
                    { value: "400", label: "Normal (400)" },
                    { value: "500", label: "Medium (500)" },
                    { value: "600", label: "Semi-Bold (600)" }
                  ]}
                />
              </div>
            </Section>
          </div>
        )}

        {/* TAB: LOGO & IMAGENS */}
        {activeTab === 'logo' && (
          <div className="tab-content">
            <div className="intro-text">
              <p>Gerencie a logo e configurações de imagens do site.</p>
            </div>

            <Section title="Logo do Site" id="logo-section" icon={ImageIcon}>
              <div className="logo-upload-section">
                <div className="logo-preview">
                  {customization.site_logo ? (
                    <img 
                      src={getImageUrl(customization.site_logo)} 
                      alt="Logo Preview" 
                    />
                  ) : (
                    <div className="no-logo">
                      <ImageIcon size={48} />
                      <span>Nenhuma logo configurada</span>
                    </div>
                  )}
                </div>

                <div className="logo-controls">
                  <label className="upload-btn" disabled={uploading}>
                    {uploading ? <Loader className="spin" size={18} /> : <Upload size={18} />}
                    {uploading ? 'Enviando...' : 'Upload Nova Logo'}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleLogoUpload} 
                      disabled={uploading} 
                    />
                  </label>

                  {customization.site_logo && (
                    <button onClick={handleRemoveLogo} className="remove-btn">
                      <Trash2 size={18} />
                      Remover Logo
                    </button>
                  )}

                  <div className="logo-settings">
                    <TextInput 
                      label="Largura da Logo (Desktop)" 
                      value={customization.logo_width}
                      onChange={(val) => handleChange('logo_width', val)}
                      placeholder="200px"
                    />
                    <TextInput 
                      label="Largura da Logo (Mobile)" 
                      value={customization.logo_mobile_width}
                      onChange={(val) => handleChange('logo_mobile_width', val)}
                      placeholder="160px"
                    />
                  </div>
                </div>
              </div>
            </Section>
          </div>
        )}
      </div>

      {/* Floating Save Button (Mobile) */}
      <button 
        className="floating-save-btn" 
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? <Loader className="spin" size={20} /> : <Save size={20} />}
      </button>

      {/* Toast */}
      {showToast && (
        <div className="custom-toast">
          <Check size={20} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Customize;