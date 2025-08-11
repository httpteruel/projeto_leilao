import React, { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import './ResetPassword.css';

const ResetPassword = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    alert(`Senha alterada para: ${email}`);
    onNavigate('login');
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Alterar Senha</h2>
      <form onSubmit={handleReset}>
        <InputField
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          required
        />
        <InputField
          label="Código"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Digite o código recebido"
          required
        />
        <PasswordInput
          value={newPassword}
          onChange={setNewPassword}
          validatePassword={true}
          placeholder="Digite sua nova senha"
        />
        <InputField
          label="Confirmar Nova Senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme sua nova senha"
          required
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button type="button" className="btn-secondary" onClick={() => onNavigate('login')}>Cancelar</Button>
          <Button type="submit">Alterar Senha</Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;