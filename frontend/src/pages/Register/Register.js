import React, { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import './Register.css';

const Register = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Cadastro realizado para: ${name} (${email})`);
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Cadastro</h2>
      <form onSubmit={handleRegister}>
        <InputField
          label="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome completo"
          required
        />
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
          validatePassword={true} // importante
          placeholder="Digite sua senha"
        />
        <InputField
          label="Confirmar Senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme sua senha"
          required
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button type="button" className="btn-secondary" onClick={() => onNavigate('login')}>Cancelar</Button>
          <Button type="submit">Cadastrar-se</Button>
        </div>
      </form>
    </div>
  );
};

export default Register;