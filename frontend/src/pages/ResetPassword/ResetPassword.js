import React, { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import authenticationService from '../../service/AuthenticationService';
import './ResetPassword.css';

const ResetPassword = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (novaSenha !== confirmarNovaSenha) {
      setError("As senhas n\u00E3o coincidem.");
      return;
    }

    try {
      const resposta = await authenticationService.resetPassword({
        email,
        codigo,
        novaSenha,
      });
      setMessage(resposta.message);
      // Redireciona para o login ap\u00F3s um breve tempo
      setTimeout(() => onNavigate('login'), 3000);
    } catch (err) {
      setError(err.message || "Ocorreu um erro ao redefinir a senha.");
      console.error("Erro na redefini\u00E7\u00E3o de senha:", err);
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Redefinir Senha</h2>
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
          label="C\u00F3digo de Recupera\u00E7\u00E3o"
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Digite o c\u00F3digo"
          required
        />
        <PasswordInput
          label="Nova Senha"
          value={novaSenha}
          onChange={setNovaSenha}
          placeholder="Digite a nova senha"
        />
        <PasswordInput
          label="Confirmar Nova Senha"
          value={confirmarNovaSenha}
          onChange={setConfirmarNovaSenha}
          placeholder="Confirme a nova senha"
        />
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <Button type="submit">Redefinir Senha</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
