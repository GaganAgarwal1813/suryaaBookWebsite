import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToElement } from '../../utils/scrollToElement';
import { STORE_NAME } from '../../constants/business';
import OrderBanner from '../OrderBanner/OrderBanner';
import logo from '../../assets/Logo.jpeg';
import './Header.css';

const Header = () => {
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

export default Header;
