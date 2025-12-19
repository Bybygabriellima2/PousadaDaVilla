// src/pages/admin/TextEditor.jsx - RESPONSIVO
import React, { useState, useEffect, useContext } from 'react';
import { ConfigContext } from '../../contexts/ConfigContext';
import axios from 'axios';
import { Save, RefreshCw, Check, Loader, Type, Home, Building, Bed, MapPin, Phone } from 'lucide-react';

// --- COMPONENTES AUXILIARES (MOVIDOS PARA FORA PARA CORRIGIR O FOCO) ---

const TextInput = ({ label, keyName, value, onChange, type = 'input', rows = 3, placeholder = '', helper = '' }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <label style={{ 
      display: 'block', 
      fontWeight: '600', 
      marginBottom: '0.5rem', 
      color: '#1e293b',
      fontSize: 'clamp(0.85rem, 2vw, 0.9rem)'
    }}>
      {label}
    </label>
    {helper && (
      <p style={{ 
        fontSize: 'clamp(0.75rem, 1.5vw, 0.8rem)', 
        color: '#64748b', 
        marginBottom: '0.5rem', 
        fontStyle: 'italic' 
      }}>
        {helper}
      </p>
    )}
    {type === 'textarea' ? (
      <textarea
        value={value || ''}
        onChange={(e) => onChange(keyName, e.target.value)}
        rows={rows}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '1px solid #cbd5e1',
          borderRadius: '6px',
          fontSize: 'clamp(0.875rem, 2vw, 0.95rem)',
          fontFamily: 'inherit',
          resize: 'vertical'
        }}
      />
    ) : (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(keyName, e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '1px solid #cbd5e1',
          borderRadius: '6px',
          fontSize: 'clamp(0.875rem, 2vw, 0.95rem)'
        }}
      />
    )}
  </div>
);

const Section = ({ title, children, icon: Icon }) => (
  <div style={{
    marginBottom: '2rem',
    padding: 'clamp(1rem, 3vw, 1.5rem)',
    background: 'white',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  }}>
    <h3 style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem',
      marginBottom: '1.5rem', 
      color: '#0d9488',
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      paddingBottom: '0.75rem',
      borderBottom: '2px solid #e2e8f0',
      flexWrap: 'wrap'
    }}>
      {Icon && <Icon size={20} style={{ flexShrink: 0 }} />}
      <span>{title}</span>
    </h3>
    {children}
  </div>
);

// --- COMPONENTE PRINCIPAL ---

const TextEditor = () => {
  const { config, fetchConfig, API_URL } = useContext(ConfigContext);
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Textos padrão
  const defaultTexts = {
    // HOME - CAROUSEL
    home_slide1_title: 'POUSADA DA VILLA',
    home_slide1_subtitle: 'Seu refúgio de tranquilidade',
    home_slide1_button: 'Conheça',
    
    home_slide2_title: 'QUARTOS CONFORTÁVEIS',
    home_slide2_subtitle: 'Conforto e elegância para sua estadia',
    home_slide2_button: 'Reservar',
    
    home_slide3_title: 'LOCALIZAÇÃO PRIVILEGIADA',
    home_slide3_subtitle: 'Uma experiência única',
    home_slide3_button: 'Explorar',
    
    // HOME - INFO SECTION
    home_info_heading: 'Conheça Nossa Pousada',
    home_info_description: 'Uma experiência única em Fernando de Noronha',
    
    home_info_card1_title: 'A POUSADA',
    home_info_card1_text: 'Oferece conforto e um conceito rústico/contemporâneo, é decorada com arte e artesanato brasileiro, possui um belo jardim e um excelente café da manhã.',
    home_info_card1_button: 'Saiba mais',
    
    home_info_card2_title: 'QUARTOS',
    home_info_card2_text: 'São 11 quartos equipados com ar condicionado, frigobar, cama BOX, TV a cabo, banheiro privativo com banho quente, secador de cabelo e amenities Natura. O enxoval é em algodão egípcio 100%.',
    home_info_card2_button: 'Saiba mais',
    
    home_info_card3_title: 'LOCALIZAÇÃO',
    home_info_card3_text: 'A pousada está localizada na Ilha de Fernando de Noronha, na Villa do Trinta, próxima a restaurantes, mercados e outras conveniências.',
    home_info_card3_button: 'Saiba mais',
    
    // A POUSADA
    pousada_page_title: 'A POUSADA',
    pousada_description_p1: 'Oferece conforto e um conceito rústico/contemporâneo, é decorada com arte e artesanato brasileiro e possui um belo jardim.',
    pousada_description_p2: 'O café da manhã é servido todas as manhãs com frutas da estação, sucos, bolos, pães, queijos, tapiocas, iogurte, entre outras delícias. A pousada da Villa oferece uma ótima relação custo/benefício pra quem quer curtir Noronha mas não abre mão de conforto para a horas de descanso.',
    pousada_gallery_title: 'Nossa Galeria',
    pousada_cta_title: 'Venha conhecer nossa pousada',
    pousada_cta_description: 'Oferecemos a melhor experiência em Fernando de Noronha com conforto e autenticidade.',
    pousada_cta_button: 'Faça sua Reserva',
    
    // QUARTOS
    quartos_page_title: 'NOSSOS QUARTOS',
    quartos_description: 'São 11 quartos projetados para oferecer o máximo de conforto durante sua estadia em Fernando de Noronha. Todos equipados com ar condicionado, frigobar, cama BOX, TV a cabo, banheiro privativo com banho quente, secador de cabelo e amenities Natura. O enxoval é algodão egípcio 100%, proporcionando uma experiência de descanso premium.',
    
    quartos_misto_title: 'Quarto Misto',
    quartos_misto_description: 'Quarto espaçoso com camas mistas, ideal para grupos de amigos ou famílias. Conta com todo o conforto e comodidades da pousada, com vista privilegiada para o jardim.',
    
    quartos_casal_title: 'Quarto Casal',
    quartos_casal_description: 'Quarto confortável com cama de casal, decoração clean e agradável. Perfeito para casais que buscam conforto e privacidade, com ambientação que convida ao relaxamento.',
    
    quartos_gallery_title: 'Galeria de Fotos',
    quartos_cta_title: 'Venha se hospedar conosco!',
    quartos_cta_description: 'Reserve já seu quarto e desfrute de momentos inesquecíveis em Fernando de Noronha, com o conforto e a hospitalidade da Pousada da Villa.',
    quartos_cta_button: 'Fazer Reserva',
    
    // LOCALIZAÇÃO
    localizacao_page_title: 'Localização',
    localizacao_subtitle: 'Descubra o paraíso em Fernando de Noronha',
    localizacao_intro_title: 'Nossa Localização Privilegiada',
    localizacao_intro_text: 'A Pousada da Villa está estrategicamente localizada na encantadora Ilha de Fernando de Noronha, na região da Villa do Trinta. Nossa localização oferece fácil acesso aos principais atrativos naturais da ilha, combinando tranquilidade e conveniência.',
    
    localizacao_endereco_title: 'Endereço',
    localizacao_endereco_line1: 'Rua Pinto Branco 206, Vila do Trinta',
    localizacao_endereco_line2: 'Fernando de Noronha, PE - 53990-000',
    
    localizacao_contato_title: 'Contato',
    localizacao_contato_phone: '(81) 3224-4476',
    localizacao_contato_whatsapp: '(81) 98230-7332',
    
    localizacao_arredores_title: 'Conheça Os Arredores',
    
    localizacao_transport_title: 'Como Chegar',
    localizacao_transport_airport_title: 'Do Aeroporto',
    localizacao_transport_airport_text: 'O Aeroporto de Fernando de Noronha (FEN) está a aproximadamente 8 minutos de carro da nossa pousada. Oferecemos serviço de traslado mediante solicitação prévia durante sua reserva.',
    localizacao_transport_island_title: 'Locomoção na Ilha',
    localizacao_transport_island_text: 'Recomendamos o aluguel de buggy ou táxi para se locomover pela ilha. Nossa equipe pode ajudar a organizar o aluguel de veículos durante sua estadia para total comodidade.',
    
    // CONTATO
    contato_hero_title: 'Entre em Contato',
    contato_hero_subtitle: 'Estamos aqui para tornar sua estadia em Fernando de Noronha inesquecível',
    
    contato_section_title: 'Como Falar Conosco',
    contato_section_subtitle: 'Escolha a forma mais conveniente para entrar em contato',
    
    contato_whatsapp_title: 'WhatsApp',
    contato_whatsapp_subtitle: 'Resposta rápida e direta',
    contato_whatsapp_description: 'Fale conosco pelo WhatsApp para reservas, dúvidas ou informações sobre a pousada. Respondemos rapidamente!',
    contato_whatsapp_button: 'Conversar no WhatsApp',
    
    contato_phone_title: 'Telefone',
    contato_phone_subtitle: 'Atendimento personalizado',
    contato_phone_description: 'Ligue para falar diretamente com nossa equipe. Horário de atendimento: 8h às 18h, todos os dias.',
    contato_phone_button: 'Ligar Agora',
    
    contato_location_title: 'Nossa Localização',
    contato_location_subtitle: 'Vila do Trinta, Noronha',
    contato_location_description: 'Localizada no coração da Vila do Trinta, próxima às principais atrações e praias de Fernando de Noronha.',
    
    contato_tips_title: 'Dicas para sua Visita',
    contato_tips_subtitle: 'Informações importantes para aproveitar ao máximo Fernando de Noronha',
    
    contato_cta_title: 'Pronto para sua Aventura em Noronha?',
    contato_cta_description: 'Entre em contato conosco agora e garante sua reserva na Pousada da Villa. Estamos esperando por você!',
    contato_cta_button1: 'Reservar pelo WhatsApp',
    contato_cta_button2: 'Ligar Agora',
    
    // FOOTER
    footer_brand_title: 'Pousada da Villa',
    footer_tagline: 'Sua experiência única em Fernando de Noronha',
    footer_location_title: 'Localização',
    footer_contact_title: 'Contato',
    footer_navigation_title: 'Navegação',
    footer_copyright: 'Todos os direitos reservados.',
    footer_subtitle: 'Desenvolvido com carinho para sua estadia perfeita'
  };

  // Estado para todos os textos (inicializa com padrões)
  const [texts, setTexts] = useState(defaultTexts);

  // Carregar textos do banco
  useEffect(() => {
    if (config && Object.keys(config).length > 0) {
      const merged = { ...defaultTexts };
      Object.keys(defaultTexts).forEach(key => {
        if (config[key]) {
          merged[key] = config[key];
        }
      });
      setTexts(merged);
    }
  }, [config]); 

  const handleChange = (key, value) => {
    setTexts(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/config`, texts);
      setShowToast(true);
      setHasChanges(false);
      fetchConfig();
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      alert('Erro ao salvar: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Tem certeza? Isso restaurará todos os textos para o padrão.')) return;
    
    setLoading(true);
    try {
      const textKeys = Object.keys(defaultTexts);
      
      await Promise.all(textKeys.map(key => 
        axios.post(`${API_URL}/config/delete`, { key })
      ));
      
      setTexts(defaultTexts);
      setHasChanges(false);
      
      await fetchConfig();
      
      alert('Textos restaurados para os padrões!');
    } catch (error) {
      console.error(error);
      alert('Erro ao restaurar: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

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
          <Type size={28} color="#0d9488" style={{ flexShrink: 0 }} />
          <h2 style={{ 
            margin: 0, 
            color: '#1e293b',
            fontSize: 'clamp(1.25rem, 4vw, 1.5rem)'
          }}>
            Editor de Textos
          </h2>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '10px',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '600px'
        }}>
          <button
            onClick={handleReset}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '0.75rem 1.25rem',
              background: '#64748b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '500',
              fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
              opacity: loading ? 0.6 : 1,
              flex: '1 1 auto',
              minWidth: '150px'
            }}
          >
            <RefreshCw size={16} style={{ flexShrink: 0 }} /> 
            <span className="button-text">Restaurar Padrões</span>
          </button>
          
          {hasChanges && (
            <button
              onClick={handleSave}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '0.75rem 2rem',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                opacity: loading ? 0.6 : 1,
                flex: '1 1 auto',
                minWidth: '150px'
              }}
            >
              {loading ? (
                <><Loader className="spin" size={18} /> Salvando...</>
              ) : (
                <><Save size={18} style={{ flexShrink: 0 }} /> Salvar Tudo</>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Abas */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #e2e8f0',
        overflowX: 'auto',
        paddingBottom: '0.5rem'
      }}>
        {[
          { id: 'home', label: 'Home', icon: Home },
          { id: 'pousada', label: 'A Pousada', icon: Building },
          { id: 'quartos', label: 'Quartos', icon: Bed },
          { id: 'localizacao', label: 'Localização', icon: MapPin },
          { id: 'contato', label: 'Contato', icon: Phone }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1.5rem)',
              border: 'none',
              background: activeTab === tab.id ? '#0d9488' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#64748b',
              cursor: 'pointer',
              borderRadius: '6px 6px 0 0',
              fontWeight: activeTab === tab.id ? '600' : '500',
              fontSize: 'clamp(0.8rem, 2vw, 0.875rem)',
              whiteSpace: 'nowrap'
            }}
          >
            <tab.icon size={16} style={{ flexShrink: 0 }} />
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Conteúdo das Abas */}
      <div>
        {activeTab === 'home' && (
          <>
            <Section title="Carrossel - Slide 1">
              <TextInput label="Título" keyName="home_slide1_title" value={texts.home_slide1_title} onChange={handleChange} />
              <TextInput label="Subtítulo" keyName="home_slide1_subtitle" value={texts.home_slide1_subtitle} onChange={handleChange} />
              <TextInput label="Texto do Botão" keyName="home_slide1_button" value={texts.home_slide1_button} onChange={handleChange} />
            </Section>

            <Section title="Carrossel - Slide 2">
              <TextInput label="Título" keyName="home_slide2_title" value={texts.home_slide2_title} onChange={handleChange} />
              <TextInput label="Subtítulo" keyName="home_slide2_subtitle" value={texts.home_slide2_subtitle} onChange={handleChange} />
              <TextInput label="Texto do Botão" keyName="home_slide2_button" value={texts.home_slide2_button} onChange={handleChange} />
            </Section>

            <Section title="Carrossel - Slide 3">
              <TextInput label="Título" keyName="home_slide3_title" value={texts.home_slide3_title} onChange={handleChange} />
              <TextInput label="Subtítulo" keyName="home_slide3_subtitle" value={texts.home_slide3_subtitle} onChange={handleChange} />
              <TextInput label="Texto do Botão" keyName="home_slide3_button" value={texts.home_slide3_button} onChange={handleChange} />
            </Section>

            <Section title="Seção Info - Cabeçalho">
              <TextInput label="Título Principal" keyName="home_info_heading" value={texts.home_info_heading} onChange={handleChange} />
              <TextInput label="Descrição" keyName="home_info_description" value={texts.home_info_description} onChange={handleChange} />
            </Section>

            <Section title="Seção Info - Card 1 (A Pousada)">
              <TextInput label="Título" keyName="home_info_card1_title" value={texts.home_info_card1_title} onChange={handleChange} />
              <TextInput label="Texto" keyName="home_info_card1_text" type="textarea" rows={4} value={texts.home_info_card1_text} onChange={handleChange} />
              <TextInput label="Texto do Botão" keyName="home_info_card1_button" value={texts.home_info_card1_button} onChange={handleChange} />
            </Section>

            <Section title="Seção Info - Card 2 (Quartos)">
              <TextInput label="Título" keyName="home_info_card2_title" value={texts.home_info_card2_title} onChange={handleChange} />
              <TextInput label="Texto" keyName="home_info_card2_text" type="textarea" rows={4} value={texts.home_info_card2_text} onChange={handleChange} />
              <TextInput label="Texto do Botão" keyName="home_info_card2_button" value={texts.home_info_card2_button} onChange={handleChange} />
            </Section>

            <Section title="Seção Info - Card 3 (Localização)">
              <TextInput label="Título" keyName="home_info_card3_title" value={texts.home_info_card3_title} onChange={handleChange} />
              <TextInput label="Texto" keyName="home_info_card3_text" type="textarea" rows={4} value={texts.home_info_card3_text} onChange={handleChange} />
              <TextInput label="Texto do Botão" keyName="home_info_card3_button" value={texts.home_info_card3_button} onChange={handleChange} />
            </Section>
          </>
        )}

        {activeTab === 'pousada' && (
          <>
            <Section title="Cabeçalho da Página">
              <TextInput label="Título da Página" keyName="pousada_page_title" value={texts.pousada_page_title} onChange={handleChange} />
            </Section>

            <Section title="Descrição Principal">
              <TextInput label="Parágrafo 1" keyName="pousada_description_p1" type="textarea" rows={3} value={texts.pousada_description_p1} onChange={handleChange} />
              <TextInput label="Parágrafo 2" keyName="pousada_description_p2" type="textarea" rows={4} value={texts.pousada_description_p2} onChange={handleChange} />
            </Section>

            <Section title="Galeria">
              <TextInput label="Título da Galeria" keyName="pousada_gallery_title" value={texts.pousada_gallery_title} onChange={handleChange} />
            </Section>

            <Section title="Call to Action (CTA)">
              <TextInput label="Título do CTA" keyName="pousada_cta_title" value={texts.pousada_cta_title} onChange={handleChange} />
              <TextInput label="Descrição" keyName="pousada_cta_description" type="textarea" value={texts.pousada_cta_description} onChange={handleChange} />
              <TextInput label="Texto do Botão" keyName="pousada_cta_button" value={texts.pousada_cta_button} onChange={handleChange} />
            </Section>
          </>
        )}

        {activeTab === 'quartos' && (
          <>
            <Section title="Cabeçalho da Página">
              <TextInput label="Título da Página" keyName="quartos_page_title" value={texts.quartos_page_title} onChange={handleChange} />
              <TextInput label="Descrição Geral" keyName="quartos_description" type="textarea" rows={4} value={texts.quartos_description} onChange={handleChange} />
            </Section>

            <Section title="Quarto Misto">
              <TextInput label="Título" keyName="quartos_misto_title" value={texts.quartos_misto_title} onChange={handleChange} />
              <TextInput label="Descrição" keyName="quartos_misto_description" type="textarea" rows={3} value={texts.quartos_misto_description} onChange={handleChange} />
            </Section>

            <Section title="Quarto Casal">
              <TextInput label="Título" keyName="quartos_casal_title" value={texts.quartos_casal_title} onChange={handleChange} />
              <TextInput label="Descrição" keyName="quartos_casal_description" type="textarea" rows={3} value={texts.quartos_casal_description} onChange={handleChange} />
            </Section>

            <Section title="Galeria">
              <TextInput label="Título da Galeria" keyName="quartos_gallery_title" value={texts.quartos_gallery_title} onChange={handleChange} />
            </Section>

            <Section title="Call to Action (CTA)">
              <TextInput label="Título do CTA" keyName="quartos_cta_title" value={texts.quartos_cta_title} onChange={handleChange} />
              <TextInput label="Descrição" keyName="quartos_cta_description" type="textarea" value={texts.quartos_cta_description} onChange={handleChange} />
              <TextInput label="Texto do Botão" keyName="quartos_cta_button" value={texts.quartos_cta_button} onChange={handleChange} />
            </Section>
          </>
        )}

        {activeTab === 'localizacao' && (
          <>
            <Section title="Hero/Cabeçalho">
              <TextInput label="Título Principal" keyName="localizacao_page_title" value={texts.localizacao_page_title} onChange={handleChange} />
              <TextInput label="Subtítulo" keyName="localizacao_subtitle" value={texts.localizacao_subtitle} onChange={handleChange} />
            </Section>

            <Section title="Introdução">
              <TextInput label="Título da Introdução" keyName="localizacao_intro_title" value={texts.localizacao_intro_title} onChange={handleChange} />
              <TextInput label="Texto da Introdução" keyName="localizacao_intro_text" type="textarea" rows={4} value={texts.localizacao_intro_text} onChange={handleChange} />
            </Section>

            <Section title="Endereço">
              <TextInput label="Título" keyName="localizacao_endereco_title" value={texts.localizacao_endereco_title} onChange={handleChange} />
              <TextInput label="Linha 1" keyName="localizacao_endereco_line1" value={texts.localizacao_endereco_line1} onChange={handleChange} />
              <TextInput label="Linha 2" keyName="localizacao_endereco_line2" value={texts.localizacao_endereco_line2} onChange={handleChange} />
            </Section>

            <Section title="Contato">
              <TextInput label="Título" keyName="localizacao_contato_title" value={texts.localizacao_contato_title} onChange={handleChange} />
              <TextInput label="Telefone" keyName="localizacao_contato_phone" value={texts.localizacao_contato_phone} onChange={handleChange} />
              <TextInput label="WhatsApp" keyName="localizacao_contato_whatsapp" value={texts.localizacao_contato_whatsapp} onChange={handleChange} />
            </Section>

            <Section title="Arredores">
              <TextInput label="Título" keyName="localizacao_arredores_title" value={texts.localizacao_arredores_title} onChange={handleChange} />
            </Section>

            <Section title="Como Chegar">
              <TextInput label="Título Principal" keyName="localizacao_transport_title" value={texts.localizacao_transport_title} onChange={handleChange} />
              <TextInput label="Do Aeroporto - Título" keyName="localizacao_transport_airport_title" value={texts.localizacao_transport_airport_title} onChange={handleChange} />
              <TextInput label="Do Aeroporto - Texto" keyName="localizacao_transport_airport_text" type="textarea" value={texts.localizacao_transport_airport_text} onChange={handleChange} />
              <TextInput label="Locomoção na Ilha - Título" keyName="localizacao_transport_island_title" value={texts.localizacao_transport_island_title} onChange={handleChange} />
              <TextInput label="Locomoção na Ilha - Texto" keyName="localizacao_transport_island_text" type="textarea" value={texts.localizacao_transport_island_text} onChange={handleChange} />
            </Section>
          </>
        )}

        {activeTab === 'contato' && (
          <>
            <Section title="Hero/Cabeçalho">
              <TextInput label="Título Principal" keyName="contato_hero_title" value={texts.contato_hero_title} onChange={handleChange} />
              <TextInput label="Subtítulo" keyName="contato_hero_subtitle" value={texts.contato_hero_subtitle} onChange={handleChange} />
            </Section>

            <Section title="Seção Principal">
              <TextInput label="Título da Seção" keyName="contato_section_title" value={texts.contato_section_title} onChange={handleChange} />
              <TextInput label="Subtítulo" keyName="contato_section_subtitle" value={texts.contato_section_subtitle} onChange={handleChange} />
            </Section>

            <Section title="Card WhatsApp">
              <TextInput label="Título" keyName="contato_whatsapp_title" value={texts.contato_whatsapp_title} onChange={handleChange} />
              <TextInput label="Subtítulo" keyName="contato_whatsapp_subtitle" value={texts.contato_whatsapp_subtitle} onChange={handleChange} />
              <TextInput label="Descrição" keyName="contato_whatsapp_description" type="textarea" value={texts.contato_whatsapp_description} onChange={handleChange} />
              <TextInput label="Texto do Botão" keyName="contato_whatsapp_button" value={texts.contato_whatsapp_button} onChange={handleChange} />
            </Section>

            <Section title="Card Telefone">
              <TextInput label="Título" keyName="contato_phone_title" value={texts.contato_phone_title} onChange={handleChange} />
              <TextInput label="Subtítulo" keyName="contato_phone_subtitle" value={texts.contato_phone_subtitle} onChange={handleChange} />
              <TextInput label="Descrição" keyName="contato_phone_description" type="textarea" value={texts.contato_phone_description} onChange={handleChange} />
              <TextInput label="Texto do Botão" keyName="contato_phone_button" value={texts.contato_phone_button} onChange={handleChange} />
            </Section>

            <Section title="Card Localização">
              <TextInput label="Título" keyName="contato_location_title" value={texts.contato_location_title} onChange={handleChange} />
              <TextInput label="Subtítulo" keyName="contato_location_subtitle" value={texts.contato_location_subtitle} onChange={handleChange} />
              <TextInput label="Descrição" keyName="contato_location_description" type="textarea" value={texts.contato_location_description} onChange={handleChange} />
            </Section>

            <Section title="Dicas">
              <TextInput label="Título" keyName="contato_tips_title" value={texts.contato_tips_title} onChange={handleChange} />
              <TextInput label="Subtítulo" keyName="contato_tips_subtitle" value={texts.contato_tips_subtitle} onChange={handleChange} />
            </Section>

            <Section title="Call to Action Final">
              <TextInput label="Título" keyName="contato_cta_title" value={texts.contato_cta_title} onChange={handleChange} />
              <TextInput label="Descrição" keyName="contato_cta_description" type="textarea" value={texts.contato_cta_description} onChange={handleChange} />
              <TextInput label="Botão 1" keyName="contato_cta_button1" value={texts.contato_cta_button1} onChange={handleChange} />
              <TextInput label="Botão 2" keyName="contato_cta_button2" value={texts.contato_cta_button2} onChange={handleChange} />
            </Section>
          </>
        )}
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
            Textos salvos com sucesso!
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
        
        @media (max-width: 640px) {
          .button-text {
            display: none;
          }
          .tab-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default TextEditor;