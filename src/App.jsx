import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
// [CART/ORDER] import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// [CART/ORDER] import CartSidebar from './components/CartSidebar/CartSidebar';
import AuthModal from './components/AuthModal/AuthModal';
// [CART/ORDER] import OrderHistory from './components/OrderHistory/OrderHistory';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import HomePage from './pages/HomePage';
// [CART/ORDER] import CheckoutPage from './pages/CheckoutPage';
import './App.css';

function App() {
  // [CART/ORDER] const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  // [CART/ORDER] const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        {/* [CART/ORDER] <CartProvider> */}
          <div className="App">
            <Header
              // [CART/ORDER] onCartClick={() => setIsCartOpen(true)}
              onLoginClick={() => setIsAuthOpen(true)}
              // [CART/ORDER] onMyOrdersClick={() => setIsOrdersOpen(true)}
              onAdminClick={() => setIsAdminOpen(true)}
            />

            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* [CART/ORDER]
              <Route
                path="/checkout"
                element={<CheckoutPage onLoginClick={() => setIsAuthOpen(true)} />}
              />
              */}
            </Routes>

            <Footer />

            {/* [CART/ORDER] <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> */}
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            {/* [CART/ORDER] {isOrdersOpen && <OrderHistory onClose={() => setIsOrdersOpen(false)} />} */}
            {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} />}
          </div>
        {/* [CART/ORDER] </CartProvider> */}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
