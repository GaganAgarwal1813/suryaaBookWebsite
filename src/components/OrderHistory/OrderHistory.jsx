import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { ORDER_STATUSES, ORDERS_COLLECTION, getStatusLabel, formatDate, formatCurrency } from '../../utils/orderUtils';
import Modal from '../Modal/Modal';
import OrderItemRow from '../OrderItemRow/OrderItemRow';
import './OrderHistory.css';

const OrderHistory = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, ORDERS_COLLECTION),
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

  return (
    <Modal title="My Orders" onClose={onClose} maxWidth="700px">
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
                {ORDER_STATUSES.map((step, index) => {
                  const currentIndex = ORDER_STATUSES.indexOf(order.status);
                  const isCompleted = index <= currentIndex;
                  const isActive = index === currentIndex;
                  return (
                    <div
                      key={step}
                      className={`oh-step ${isCompleted ? 'oh-step-completed' : ''} ${isActive ? 'oh-step-active' : ''}`}
                    >
                      <div className="oh-step-dot"></div>
                      <span className="oh-step-label">{getStatusLabel(step)}</span>
                      {index < ORDER_STATUSES.length - 1 && <div className="oh-step-line"></div>}
                    </div>
                  );
                })}
              </div>

              <div className="oh-order-items">
                {order.items.map((item, idx) => (
                  <OrderItemRow key={idx} item={item} className="oh-item" />
                ))}
              </div>

              <div className="oh-order-total">
                <span>Total:</span>
                <span>{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

OrderHistory.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default OrderHistory;
