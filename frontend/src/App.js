import React, { useState } from 'react';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // importante

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