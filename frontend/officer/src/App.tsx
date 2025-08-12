import './App.css';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router';

import LoginPage from './components/pages/Login.tsx';
import Dashboard from './components/pages/Dashboard.tsx';

import './i18n'; 


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
