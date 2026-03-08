/**
 * Formats a numeric amount as Indian Rupee currency string.
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => `₹${amount.toFixed(2)}`;
