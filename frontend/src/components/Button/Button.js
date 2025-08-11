import React from 'react';
import './Button.css';

const Button = ({ children, onClick, type = 'button', className = '', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;