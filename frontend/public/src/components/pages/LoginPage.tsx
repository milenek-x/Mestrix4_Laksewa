import React from 'react';
import LoginForm from '../molecules/LoginForm';

interface LoginPageProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToRegister }) => {
  return (
    <LoginForm 
      onLogin={onLogin}
      onSwitchToRegister={onSwitchToRegister}
    />
  );
};

export default LoginPage;