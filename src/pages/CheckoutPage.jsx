import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutSection from '../components/CheckoutSection/CheckoutSection';
import './CheckoutPage.css';

const CheckoutPage = ({ onLoginClick }) => {
  const { cartItems } = useCart();

  return (
    <div className="checkout-page">
      <div className="checkout-page-nav">
        <Link to="/" className="back-to-shop">
          ← Continue Shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-checkout">
          <span className="empty-checkout-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before checking out.</p>
          <Link to="/" className="browse-btn">
            Browse Catalogue
          </Link>
        </div>
      ) : (
        <CheckoutSection onLoginClick={onLoginClick} />
      )}
    </div>
  );
};

export default CheckoutPage;
