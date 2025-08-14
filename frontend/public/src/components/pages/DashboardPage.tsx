import React from 'react';
import Dashboard from '../molecules/Dashboard';

interface DashboardPageProps {
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  return (
    <Dashboard 
      onLogout={onLogout}
    />
  );
};

export default DashboardPage;