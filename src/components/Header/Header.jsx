import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = ({ onCartClick, onLoginClick, onMyOrdersClick, onAdminClick }) => {
  const { cartItemCount } = useCart();
  const { currentUser, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="logo-icon">📓</span>
          <span className="logo-text">Suryaa Book Depot</span>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <button onClick={() => scrollToSection('regular')}>Regular</button>
          <button onClick={() => scrollToSection('register')}>Register</button>
        </nav>

        <div className="header-actions">
          {currentUser ? (
            <>
              <div className="user-info">
                <span className="user-greeting">
                  Hi, {currentUser.displayName || currentUser.email?.split('@')[0]}
                </span>
              </div>
              <button className="header-action-btn" onClick={onMyOrdersClick} title="My Orders">
                📦
              </button>
              {isAdmin && (
                <button className="header-action-btn admin-btn" onClick={onAdminClick} title="Admin Dashboard">
                  ⚙️
                </button>
              )}
              <button className="cart-button" onClick={onCartClick}>
                <span className="cart-icon">🛒</span>
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="cart-button" onClick={onCartClick}>
                <span className="cart-icon">🛒</span>
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </button>
              <button className="login-btn" onClick={onLoginClick}>
                Login
              </button>
            </>
          )}
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
