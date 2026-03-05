import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { scrollToElement } from '../../utils/scrollToElement';
import { STORE_NAME } from '../../constants/business';
import OrderBanner from '../OrderBanner/OrderBanner';
import logo from '../../assets/Logo.jpeg';
import './Header.css';

const Header = ({ onLoginClick, onAdminClick }) => {
  const { currentUser, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      scrollToElement(sectionId);
    } else {
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

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={handleLogoClick}>
          <img src={logo} alt={STORE_NAME} className="logo-img" />
          <span className="logo-text">{STORE_NAME}</span>
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
              {isAdmin && (
                <button className="header-action-btn admin-btn" onClick={onAdminClick} title="Admin Dashboard">
                  ⚙️
                </button>
              )}
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="login-btn" onClick={onLoginClick}>
              Login
            </button>
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
      <OrderBanner />
    </header>
  );
};

Header.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  onAdminClick: PropTypes.func.isRequired
};

export default Header;
