import './App.css';
import Dashboard from './components/pages/Dashboard.tsx';
import LoginPage from './components/pages/Login.tsx';
import { ThemeProvider } from './components/theme/theme-provider.tsx';
import './i18n'; 

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
         </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </>
  );
}

export default App;
