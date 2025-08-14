import './App.css';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router';

import { ThemeProvider } from './components/theme/theme-provider';

import LoginPage from './components/pages/Login.tsx';
import Dashboard from './components/pages/Dashboard.tsx';
import Appointments from './components/pages/Appointments.tsx';
import Review from './components/pages/Review.tsx';
import Communication from './components/pages/Communication.tsx';
import Analytics from './components/pages/Analytics.tsx';
import Settings from './components/pages/Account.tsx';

import './i18n'; 
import { Toaster } from 'sonner';
import { UserProvider } from './components/context/UserContext.tsx';


function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route index element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/review" element={<Review />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/account" element={<Settings />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
    <Toaster position='top-center'/>
    </>
  );
}

export default App;
