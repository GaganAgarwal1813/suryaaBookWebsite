import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AuthModal from './components/AuthModal/AuthModal';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <BrowserRouter basename="/suryaaBookWebsite">
      <AuthProvider>
        <div className="App">
          <Header
            onLoginClick={() => setIsAuthOpen(true)}
            onAdminClick={() => setIsAdminOpen(true)}
          />

          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>

          <Footer />

          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
          {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} />}
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
