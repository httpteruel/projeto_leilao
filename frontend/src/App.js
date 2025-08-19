import React, { useState } from 'react';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Home from './pages/Home/Home'; // Importa a nova p\u00E1gina

function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // Pode iniciar em 'home' para testes

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <Login onNavigate={setCurrentScreen} />;
      case 'register':
        return <Register onNavigate={setCurrentScreen} />;
      case 'forgot':
        return <ForgotPassword onNavigate={setCurrentScreen} />;
      case 'reset':
        return <ResetPassword onNavigate={setCurrentScreen} />;
      case 'home':
        return <Home onNavigate={setCurrentScreen} />;
      default:
        return <Login onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="container">
      <div className="auth-container">
        {renderScreen()}
      </div>
    </div>
  );
}

export default App;