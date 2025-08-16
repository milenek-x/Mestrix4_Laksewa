import React from 'react';
import RegisterForm from '../molecules/RegisterForm';

interface RegisterPageProps {
  onSwitchToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onSwitchToLogin }) => {
  return (
    <RegisterForm 
      onSwitchToLogin={onSwitchToLogin}
    />
  );
};

export default RegisterPage;