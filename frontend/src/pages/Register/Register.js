import React, { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import PasswordValidator from '../../utils/PasswordValidator';
import authenticationService from '../../service/AuthenticationService';
import './Register.css';

const Register = ({ onNavigate }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [error, setError] = useState('');

  const handleSenhaChange = (value) => {
    setSenha(value);
    const validation = PasswordValidator.validate(value);
    setIsPasswordValid(validation.isValid);
    setPasswordError(validation.message);
  };

  const handleFocus = () => {
    setShowPasswordValidation(true);
  };

  const handleBlur = () => {
    setShowPasswordValidation(false);
  };

  const isValidForm = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      setError('Por favor, preencha todos os campos.');
      return false;
    }

    if (senha !== confirmarSenha) {
      setError('As senhas n\u00E3o coincidem.');
      return false;
    }

    if (!isPasswordValid) {
      setError(PasswordValidator.validate(senha).message);
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (isValidForm()) {
      try {
        await authenticationService.register({
          nome,
          email,
          senha,
        });
        console.log("Cadastro realizado com sucesso!");
        onNavigate('login');
      } catch (err) {
        setError(err.message || 'Erro no cadastro. Tente novamente.');
        console.error("Erro no cadastro:", err);
      }
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Cadastro</h2>
      <form onSubmit={handleRegister}>
        <InputField
          label="Nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome"
        />
        <InputField
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
        />
        <PasswordInput
          value={senha}
          onChange={handleSenhaChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Digite sua senha"
          validatePassword={true}
        />
        <PasswordInput
          label="Confirmar Senha"
          value={confirmarSenha}
          onChange={(value) => setConfirmarSenha(value)}
          placeholder="Confirme sua senha"
        />
        {error && <p className="error-message">{error}</p>}

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <Button type="button" className="btn-secondary" onClick={() => onNavigate('login')}>Cancelar</Button>
          <Button type="submit">Cadastrar-se</Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
