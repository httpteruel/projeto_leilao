import React, { useState, useEffect } from 'react';
import InputField from '../InputField/InputField';
import passwordValidator from '../../utils/PasswordValidator';
import './PasswordInput.css';

const PasswordInput = ({ value, onChange, validatePassword = false, placeholder = "Digite sua senha" }) => {
  const [strength, setStrength] = useState(0);
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  useEffect(() => {
    if (!validatePassword) return;

    const { validations: newValidations, strength: newStrength } = passwordValidator.validate(value);
    setValidations(newValidations);
    setStrength(newStrength);
  }, [value, validatePassword]);

  const getStrengthColor = () => {
    return passwordValidator.getStrengthColor(strength);
  };

  return (
    <div className="password-input-wrapper">
      <InputField
        label="Senha"
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {validatePassword && (
        <>
          <div className="password-strength">
            <div className="strength-meter">
              <div
                className="meter-fill"
                style={{
                  width: `${strength}%`,
                  backgroundColor: getStrengthColor()
                }}
              />
            </div>
          </div>
          <div className="validation-message">
            <p className={validations.length ? 'valid' : 'invalid'}>
              • Mínimo de 6 caracteres
            </p>
            <p className={validations.uppercase ? 'valid' : 'invalid'}>
              • Pelo menos 1 letra maiúscula
            </p>
            <p className={validations.lowercase ? 'valid' : 'invalid'}>
              • Pelo menos 1 letra minúscula
            </p>
            <p className={validations.number ? 'valid' : 'invalid'}>
              • Pelo menos 1 número
            </p>
            <p className={validations.specialChar ? 'valid' : 'invalid'}>
              • Pelo menos 1 caractere especial (@#$% etc.)
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordInput;