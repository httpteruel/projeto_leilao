import React, { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import authenticationService from '../../service/AuthenticationService';
import './Login.css';

const Login = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authenticationService.login({ email, senha: password });
      console.log("Login bem-sucedido!");
      onNavigate('home');
    } catch (err) {
      setError(err.message || 'Credenciais inv\u00E1lidas ou erro no servidor.');
      console.error('Erro no login:', err);
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleLogin}>
        <InputField
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          required
        />
        <PasswordInput
          value={password}
          onChange={(value) => setPassword(value)}
          placeholder="Digite sua senha"
        />
        {error && <p className="error-message">{error}</p>}
        <Button type="submit">Acessar</Button>
      </form>
      <div className="auth-links">
        <a className="auth-link" onClick={() => onNavigate('register')}>Cadastrar-se</a>
        <span> | </span>
        <a className="auth-link" onClick={() => onNavigate('forgot')}>Recuperar senha</a>
      </div>
    </div>
  );
};

export default Login;
