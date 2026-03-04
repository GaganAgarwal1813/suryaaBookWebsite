import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import { scrollToElement } from '../../utils/scrollToElement';
import { formatCurrency } from '../../utils/orderUtils';
import CartItem from '../CartItem/CartItem';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal } = useCart();

  const handleProceedToCheckout = () => {
    onClose();
    scrollToElement('checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <span className="empty-cart-icon">🛒</span>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              <div className="cart-footer">
                <div className="cart-total">
                  <span className="total-label">Total:</span>
                  <span className="total-amount">{formatCurrency(cartTotal)}</span>
                </div>
                <button 
                  className="checkout-btn"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

CartSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CartSidebar;
