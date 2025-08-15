import './App.css';
import DashboardPage from './components/pages/DashboardPage';
import RegisterPage from './components/pages/RegisterPage';
import LoginPage from './components/pages/LoginPage';
import LandingPage from './components/pages/LandingPage';
import { ThemeProvider } from './components/theme/theme-provider.tsx';
import './i18n';

// Import the new department pages using correct relative paths
import ElectionCommissionPage from './components/pages/ElectionCommissionPage.tsx';
import MotorTrafficPage from './components/pages/MotorTrafficPage.tsx';
import ImmigrationEmigrationPage from './components/pages/ImmigrationEmigrationPage.tsx';
import RegistrarGeneralPage from './components/pages/RegistrarGeneralPage.tsx';

import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate
} from 'react-router-dom';
// Removed useEffect import as it's not used directly in App.tsx

// Wrapper components to handle navigation
const LandingWrapper = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  // Added these functions to satisfy LandingPageProps
  const handleBookAppointmentClick = () => {
    console.log('Book Appointment clicked');
    // Implement actual navigation or logic here
    navigate('/dashboard'); 
  };

  const handleBrowseServicesClick = () => {
    console.log('Browse Services clicked');
    // Implement actual navigation or logic here
    navigate('/dashboard');
  };

  return (
    <LandingPage
      onLoginClick={handleLoginClick}
      onRegisterClick={handleRegisterClick}
      onBookAppointmentClick={handleBookAppointmentClick}
      onBrowseServicesClick={handleBrowseServicesClick}
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

              {/* New routes for department pages */}
              <Route path="/election-commission" element={<ElectionCommissionPage />} />
              <Route path="/motor-traffic" element={<MotorTrafficPage />} />
              <Route path="/immigration-emigration" element={<ImmigrationEmigrationPage />} />
              <Route path="/registrar-general" element={<RegistrarGeneralPage />} />

              {/* Optional: Add a catch-all route for unmatched paths */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
