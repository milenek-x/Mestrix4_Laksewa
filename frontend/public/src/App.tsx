import './App.css';
import DashboardPage from './components/pages/DashboardPage';
import RegisterPage from './components/pages/RegisterPage';
import LoginPage from './components/pages/LoginPage';
import LandingPage from './components/pages/LandingPage';
import { ThemeProvider } from './components/theme/theme-provider.tsx';
import './i18n';

import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate
} from 'react-router-dom';
import { useEffect } from 'react';

// Wrapper components to handle navigation
const LandingWrapper = () => {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate('/login');
  };
  
  const handleRegisterClick = () => {
    navigate('/register');
  };
  
  return (
    <LandingPage
      onLoginClick={handleLoginClick}
      onRegisterClick={handleRegisterClick}
    />
  );
};

const LoginWrapper = () => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/dashboard');
  };
  
  const handleSwitchToRegister = () => {
    navigate('/register');
  };
  
  return (
    <LoginPage
      onLogin={handleLogin}
      onSwitchToRegister={handleSwitchToRegister}
    />
  );
};

const RegisterWrapper = () => {
  const navigate = useNavigate();
  
  const handleSwitchToLogin = () => {
    navigate('/login');
  };
  
  return (
    <RegisterPage onSwitchToLogin={handleSwitchToLogin} />
  );
};

const DashboardWrapper = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/');
  };
  
  return <DashboardPage onLogout={handleLogout} />;
};

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route index element={<LandingWrapper />} />
              <Route path="/login" element={<LoginWrapper />} />
              <Route path="/register" element={<RegisterWrapper />} />
              <Route path="/dashboard" element={<DashboardWrapper />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;