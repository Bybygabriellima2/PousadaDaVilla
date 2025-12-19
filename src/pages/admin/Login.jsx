// src/pages/admin/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import '../../styles/admin-styles.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulação simples de autenticação
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin/customize');
    } else {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Pousada da Villa</h2>
          <p>Painel Administrativo</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Usuário</label>
            <div style={{position: 'relative'}}>
                <User size={18} style={{position: 'absolute', top: '12px', left: '10px', color: '#94a3b8'}} />
                <input 
                type="text" 
                className="form-input" 
                style={{paddingLeft: '35px'}}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                />
            </div>
          </div>
          
          <div className="form-group">
            <label>Senha</label>
             <div style={{position: 'relative'}}>
                <Lock size={18} style={{position: 'absolute', top: '12px', left: '10px', color: '#94a3b8'}} />
                <input 
                type="password" 
                className="form-input" 
                style={{paddingLeft: '35px'}}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                />
            </div>
          </div>

          {error && <p style={{color: 'red', marginBottom: '1rem', fontSize: '0.9rem'}}>{error}</p>}
          
          <button type="submit" className="admin-btn">Entrar no Painel</button>
        </form>
      </div>
    </div>
  );
};

export default Login;