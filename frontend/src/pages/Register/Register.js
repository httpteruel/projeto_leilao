import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authenticationService from '../../services/AuthenticationService';
import PasswordValidator from '../../utils/PasswordValidator';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'senha') {
      const validation = PasswordValidator.validate(value);
      setIsPasswordValid(validation.isValid);
      setPasswordError(validation.message);
    }
  };

  const isValidForm = () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      alert('Por favor, preencha todos os campos.');
      return false;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setPasswordError('As senhas não coincidem.');
      return false;
    }

    if (!isPasswordValid) {
      setPasswordError(PasswordValidator.validate(formData.senha).message);
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (isValidForm()) {
      try {
        const response = await autenticationService.register({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
        });
        console.log("Cadastro realizado com sucesso!", response);
        navigate('/login');
      } catch (error) {
        console.error("Erro no cadastro:", error);
        // Você pode adicionar um estado para exibir uma mensagem de erro na tela
      }
    }
  };

  return (
    <div className="container-register">
      <div className="register-card">
        <h1>Cadastro</h1>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleInputChange}
            />
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
          <button type="submit" className="button-register">Cadastrar-se</button>
          <Link to="/login">
            <button type="button" className="button-cancel">Cancelar</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
