import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
// [CART/ORDER] import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { scrollToElement } from '../../utils/scrollToElement';
import logo from '../../assets/Logo.jpeg';
import './Header.css';

const Header = ({ /* [CART/ORDER] onCartClick, */ onLoginClick, /* [CART/ORDER] onMyOrdersClick, */ onAdminClick }) => {
  // [CART/ORDER] const { cartItemCount } = useCart();
  const { currentUser, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      // Already on home page — just scroll to the section
      scrollToElement(sectionId);
    } else {
      // On another page — navigate home, then scroll after a brief delay
      navigate('/');
      setTimeout(() => scrollToElement(sectionId), 100);
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  /* [CART/ORDER]
  const cartButton = (
    <button className="cart-button" onClick={onCartClick}>
      <span className="cart-icon">🛒</span>
      {cartItemCount > 0 && (
        <span className="cart-badge">{cartItemCount}</span>
      )}
    </button>
  );
  */

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={handleLogoClick}>
          <img src={logo} alt="Suryaa Book Depot" className="logo-img" />
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
              {/* [CART/ORDER]
              <button className="header-action-btn" onClick={onMyOrdersClick} title="My Orders">
                📦
              </button>
              */}
              {isAdmin && (
                <button className="header-action-btn admin-btn" onClick={onAdminClick} title="Admin Dashboard">
                  ⚙️
                </button>
              )}
              {/* [CART/ORDER] {cartButton} */}
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {/* [CART/ORDER] {cartButton} */}
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
  // [CART/ORDER] onCartClick: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  // [CART/ORDER] onMyOrdersClick: PropTypes.func.isRequired,
  onAdminClick: PropTypes.func.isRequired
};

export default Header;
