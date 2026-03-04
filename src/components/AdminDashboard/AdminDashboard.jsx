import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const statusOptions = ['pending', 'processing', 'shipped', 'delivered'];

const AdminDashboard = ({ onClose }) => {
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(
      collection(db, 'orders'),
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
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update order status.');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '—';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      <div className="admin-overlay" onClick={onClose}>
        <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
          <p>Access denied. Admin only.</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <button className="admin-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="admin-stats">
          {['all', ...statusOptions].map(status => (
            <button
              key={status}
              className={`stat-pill ${filterStatus === status ? 'stat-pill-active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              <span className="stat-label">{status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}</span>
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
                      <span className="admin-order-date">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="admin-status-control">
                      <label>Status:</label>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`status-select status-select-${order.status}`}
                      >
                        {statusOptions.map(opt => (
                          <option key={opt} value={opt}>
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
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
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="admin-order-total">
                    Total: ₹{order.totalAmount?.toFixed(2)}
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

export default AdminDashboard;
