import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import './OrderHistory.css';

const statusSteps = ['pending', 'processing', 'shipped', 'delivered'];

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered'
  };
  return labels[status] || status;
};

const OrderHistory = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'orders'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(orderList);
      setLoading(false);
    }, (err) => {
      console.error('Error fetching orders:', err);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Processing...';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="order-history-overlay" onClick={onClose}>
      <div className="order-history-panel" onClick={(e) => e.stopPropagation()}>
        <div className="oh-header">
          <h2>My Orders</h2>
          <button className="oh-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="oh-content">
          {loading ? (
            <div className="oh-loading">Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div className="oh-empty">
              <span className="oh-empty-icon">📦</span>
              <p>You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="oh-orders">
              {orders.map(order => (
                <div key={order.id} className="oh-order-card">
                  <div className="oh-order-top">
                    <div>
                      <span className="oh-order-id">Order #{order.id.slice(-8).toUpperCase()}</span>
                      <span className="oh-order-date">{formatDate(order.createdAt)}</span>
                    </div>
                    <span className={`oh-status-badge oh-status-${order.status}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  <div className="oh-status-tracker">
                    {statusSteps.map((step, index) => {
                      const currentIndex = statusSteps.indexOf(order.status);
                      const isCompleted = index <= currentIndex;
                      const isActive = index === currentIndex;
                      return (
                        <div
                          key={step}
                          className={`oh-step ${isCompleted ? 'oh-step-completed' : ''} ${isActive ? 'oh-step-active' : ''}`}
                        >
                          <div className="oh-step-dot"></div>
                          <span className="oh-step-label">{getStatusLabel(step)}</span>
                          {index < statusSteps.length - 1 && <div className="oh-step-line"></div>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="oh-order-items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="oh-item">
                        <span>{item.name} × {item.quantity}</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="oh-order-total">
                    <span>Total:</span>
                    <span>₹{order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
