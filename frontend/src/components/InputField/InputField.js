import React from 'react';
import './InputField.css';

const InputField = ({ label, type, value, onChange, placeholder, ...props }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default InputField;