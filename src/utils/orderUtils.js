/**
 * Shared order-related constants and utility functions.
 */

/** Firestore collection name for orders */
export const ORDERS_COLLECTION = 'orders';

/** Ordered list of all possible order statuses */
export const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'delivered'];

/**
 * Returns a human-readable label for an order status.
 * @param {string} status
 * @returns {string}
 */
export const getStatusLabel = (status) => {
  const labels = {
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered'
  };
  return labels[status] || status;
};

/**
 * Formats a Firestore timestamp into a locale date string.
 * @param {object|null} timestamp - Firestore Timestamp or Date-like object
 * @param {{ month?: string }} [options] - Intl.DateTimeFormat month option ('long' | 'short' etc.)
 * @returns {string}
 */
export const formatDate = (timestamp, { month = 'long' } = {}) => {
  if (!timestamp) return 'Processing...';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month,
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Calculates the line total for a cart / order item.
 * @param {{ price: number, quantity: number }} item
 * @returns {number}
 */
export const lineTotal = (item) => item.price * item.quantity;

/**
 * Formats a numeric amount as Indian Rupee currency string.
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => `₹${amount.toFixed(2)}`;
