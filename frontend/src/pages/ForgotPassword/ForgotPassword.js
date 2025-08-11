import React, { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import './ForgotPassword.css';

const ForgotPassword = ({ onNavigate }) => {
  const [email, setEmail] = useState('');

  const handleRecover = (e) => {
    e.preventDefault();
    alert(`Link de recuperação enviado para: ${email}`);
    onNavigate('reset');
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Recuperar Senha</h2>
      <form onSubmit={handleRecover}>
        <InputField
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          required
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button type="button" className="btn-secondary" onClick={() => onNavigate('login')}>Cancelar</Button>
          <Button type="submit">Recuperar Senha</Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;