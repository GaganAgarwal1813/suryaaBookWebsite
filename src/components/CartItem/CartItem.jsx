import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import { formatCurrency, lineTotal } from '../../utils/orderUtils';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-price">{formatCurrency(item.price)} each</p>
      </div>
      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button 
            className="qty-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            −
          </button>
          <span className="quantity">{item.quantity}</span>
          <button 
            className="qty-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="cart-item-total">
          {formatCurrency(lineTotal(item))}
        </div>
        <button 
          className="remove-btn"
          onClick={() => removeFromCart(item.id)}
          aria-label="Remove item"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired
};

export default CartItem;
