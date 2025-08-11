import React, { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import './Login.css';

const Login = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login realizado com: ${email}`);
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
          onChange={setPassword}
          placeholder="Digite sua senha"
        />
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