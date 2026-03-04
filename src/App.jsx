import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CartSidebar from './components/CartSidebar/CartSidebar';
import AuthModal from './components/AuthModal/AuthModal';
import OrderHistory from './components/OrderHistory/OrderHistory';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Header
              onCartClick={() => setIsCartOpen(true)}
              onLoginClick={() => setIsAuthOpen(true)}
              onMyOrdersClick={() => setIsOrdersOpen(true)}
              onAdminClick={() => setIsAdminOpen(true)}
            />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/checkout"
                element={<CheckoutPage onLoginClick={() => setIsAuthOpen(true)} />}
              />
            </Routes>

            <Footer />

            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            {isOrdersOpen && <OrderHistory onClose={() => setIsOrdersOpen(false)} />}
            {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} />}
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
