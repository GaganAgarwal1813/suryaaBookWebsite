import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import NotebookSection from './components/NotebookSection/NotebookSection';
import CartSidebar from './components/CartSidebar/CartSidebar';
import CheckoutSection from './components/CheckoutSection/CheckoutSection';
import Footer from './components/Footer/Footer';
import AuthModal from './components/AuthModal/AuthModal';
import OrderHistory from './components/OrderHistory/OrderHistory';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Header
            onCartClick={() => setIsCartOpen(true)}
            onLoginClick={() => setIsAuthOpen(true)}
            onMyOrdersClick={() => setIsOrdersOpen(true)}
            onAdminClick={() => setIsAdminOpen(true)}
          />
          <Hero />
          <NotebookSection category="Regular" sectionId="regular" />
          <NotebookSection category="Register" sectionId="register" />
          {/* Hidden categories — uncomment when ready:
          <NotebookSection category="A5" sectionId="a5" />
          <NotebookSection category="Spiral" sectionId="spiral" />
          <NotebookSection category="Hard Cover" sectionId="hard-cover" />
          */}
          <CheckoutSection onLoginClick={() => setIsAuthOpen(true)} />
          <Footer />
          <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
          {isOrdersOpen && <OrderHistory onClose={() => setIsOrdersOpen(false)} />}
          {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} />}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
