import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { ORDER_STATUSES, ORDERS_COLLECTION, getStatusLabel, formatDate, formatCurrency, lineTotal } from '../../utils/orderUtils';
import Modal from '../Modal/Modal';
import './AdminDashboard.css';

const AdminDashboard = ({ onClose }) => {
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [statusError, setStatusError] = useState(null);

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(
      collection(db, ORDERS_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderList = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setOrders(orderList);
      setLoading(false);
    }, (err) => {
      console.error('Error fetching orders:', err);
      setLoading(false);
    });

    return unsubscribe;
  }, [isAdmin]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setStatusError(null);
      await updateDoc(doc(db, ORDERS_COLLECTION, orderId), { status: newStatus });
    } catch (err) {
      console.error('Error updating status:', err);
      setStatusError('Failed to update order status.');
    }
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length
  };

  if (!isAdmin) {
    return (
      <Modal title="Admin Dashboard" onClose={onClose} maxWidth="900px">
        <p>Access denied. Admin only.</p>
      </Modal>
    );
  }

  return (
    <Modal title="Admin Dashboard" onClose={onClose} maxWidth="900px" className="admin-modal">
      {statusError && (
        <div className="admin-error">
          <span>❌</span> {statusError}
        </div>
      )}

      <div className="admin-stats">
        {['all', ...ORDER_STATUSES].map(status => (
          <button
            key={status}
            className={`stat-pill ${filterStatus === status ? 'stat-pill-active' : ''}`}
            onClick={() => setFilterStatus(status)}
          >
            <span className="stat-label">{status === 'all' ? 'All' : getStatusLabel(status)}</span>
            <span className="stat-count">{statusCounts[status]}</span>
          </button>
        ))}
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="admin-loading">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="admin-empty">No orders found.</div>
        ) : (
          <div className="admin-orders">
            {filteredOrders.map(order => (
              <div key={order.id} className="admin-order-card">
                <div className="admin-order-row">
                  <div className="admin-order-info">
                    <span className="admin-order-id">#{order.id.slice(-8).toUpperCase()}</span>
                    <span className="admin-order-date">{formatDate(order.createdAt, { month: 'short' })}</span>
                  </div>
                  <div className="admin-status-control">
                    <label>Status:</label>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`status-select status-select-${order.status}`}
                    >
                      {ORDER_STATUSES.map(opt => (
                        <option key={opt} value={opt}>
                          {getStatusLabel(opt)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="admin-customer">
                  <strong>Customer:</strong> {order.customer?.name} | {order.customer?.email} | {order.customer?.phone}
                  <br />
                  <strong>Address:</strong> {order.customer?.address}
                </div>

                <div className="admin-items">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="admin-item">
                      <span>{item.name} × {item.quantity}</span>
                      <span>{formatCurrency(lineTotal(item))}</span>
                    </div>
                  ))}
                </div>

                <div className="admin-order-total">
                  Total: {formatCurrency(order.totalAmount ?? 0)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

AdminDashboard.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default AdminDashboard;
