import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Suryaa Book Depot</h3>
            <p>Your trusted source for quality notebooks and stationery.</p>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: suryaabookdepothapur@gmail.com</p>
            <p>Phone: +91 9927158581</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Twitter">🐦</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Suryaa Book Depot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
