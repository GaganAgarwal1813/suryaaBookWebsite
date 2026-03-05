import PropTypes from 'prop-types';
import { formatCurrency, lineTotal } from '../../utils/orderUtils';

/**
 * Single order/cart line-item row: "Name × Qty ... ₹Total"
 *
 * @param {object} props
 * @param {{ name: string, quantity: number, price: number }} props.item
 * @param {string} [props.className] - Extra class name on the wrapper div
 */
const OrderItemRow = ({ item, className = '' }) => (
  <div className={`order-item-row ${className}`.trim()}>
    <span>{item.name} × {item.quantity}</span>
    <span>{formatCurrency(lineTotal(item))}</span>
  </div>
);

OrderItemRow.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  className: PropTypes.string
};

export default OrderItemRow;
