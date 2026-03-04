import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './CheckoutSection.css';

const CheckoutSection = ({ onLoginClick }) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  // Pre-fill name and email from logged-in user's profile
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.displayName || prev.name,
        email: currentUser.email || prev.email
      }));
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      onLoginClick();
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const order = {
      userId: currentUser.uid,
      userEmail: currentUser.email,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      },
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        lineTotal: item.price * item.quantity
      })),
      totalAmount: cartTotal,
      status: 'pending',
      createdAt: serverTimestamp()
    };

    try {
      const docRef = await addDoc(collection(db, 'orders'), order);
      setOrderId(docRef.id);
      setOrderPlaced(true);
      clearCart();
      setFormData({ name: '', email: '', phone: '', address: '' });
      const el = document.getElementById('checkout');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error('Error saving order:', err);
      setError('Failed to place order. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="checkout" className="checkout-section">
      <div className="checkout-container">
        <h2 className="checkout-title">Checkout</h2>

        {orderPlaced && (
          <div className="order-success">
            <span className="success-icon">✅</span>
            <h3>Order Placed Successfully!</h3>
            <p>Thank you for your purchase!</p>
            {orderId && (
              <p className="order-id">
                Your Order ID: <strong>{orderId}</strong>
              </p>
            )}
            <p>You can track your order from the 📦 My Orders page.</p>
          </div>
        )}

        {error && (
          <div className="order-error">
            <span>❌</span> {error}
          </div>
        )}

        {!currentUser && (
          <div className="login-prompt">
            <p>Please log in to place an order and track your purchases.</p>
            <button className="login-prompt-btn" onClick={onLoginClick}>
              Login / Sign Up
            </button>
          </div>
        )}

        <div className="checkout-content">
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cartItems.length === 0 ? (
              <p className="empty-message">No items in cart</p>
            ) : (
              <>
                <div className="summary-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="summary-item">
                      <span className="summary-item-name">{item.name} × {item.quantity}</span>
                      <span className="summary-item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-total">
                  <span className="total-label">Total Amount:</span>
                  <span className="total-value">₹{cartTotal.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Delivery Information</h3>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="Enter your phone number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Delivery Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Enter your complete delivery address"
              />
            </div>
            <button
              type="submit"
              className="place-order-btn"
              disabled={cartItems.length === 0 || isSubmitting}
            >
              {!currentUser
                ? 'Login to Place Order'
                : isSubmitting
                  ? 'Placing Order...'
                  : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;
