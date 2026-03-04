import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { scrollToElement } from '../../utils/scrollToElement';
import './Header.css';

const Header = ({ onCartClick, onLoginClick, onMyOrdersClick, onAdminClick }) => {
  const { cartItemCount } = useCart();
  const { currentUser, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    scrollToElement(sectionId);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const cartButton = (
    <button className="cart-button" onClick={onCartClick}>
      <span className="cart-icon">🛒</span>
      {cartItemCount > 0 && (
        <span className="cart-badge">{cartItemCount}</span>
      )}
    </button>
  );

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="logo-icon">📓</span>
          <span className="logo-text">Suryaa Book Depot</span>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <button onClick={() => handleNavClick('regular')}>Regular</button>
          <button onClick={() => handleNavClick('register')}>Register</button>
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
              {cartButton}
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {cartButton}
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

Header.propTypes = {
  onCartClick: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onMyOrdersClick: PropTypes.func.isRequired,
  onAdminClick: PropTypes.func.isRequired
};

export default Header;
