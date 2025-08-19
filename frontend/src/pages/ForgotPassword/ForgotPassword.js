import React, { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import authenticationService from '../../service/AuthenticationService';
import './ForgotPassword.css';

const ForgotPassword = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRecover = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const resposta = await authenticationService.recoverPassword(email);
      setMessage(resposta.message);
    } catch (err) {
      setError(err.message || "Ocorreu um erro ao recuperar a senha.");
      console.error("Erro na recupera\u00E7\u00E3o de senha:", err);
    }
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
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <Button type="submit">Enviar Link de Recupera\u00E7\u00E3o</Button>
      </form>
      <div className="auth-links">
        <a className="auth-link" onClick={() => onNavigate('login')}>Voltar para o Login</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
