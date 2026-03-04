import PropTypes from 'prop-types';
import './Modal.css';

/**
 * Reusable modal/overlay component.
 *
 * @param {object} props
 * @param {string} props.title - Modal header title
 * @param {Function} props.onClose - Called when overlay or close button is clicked
 * @param {React.ReactNode} props.children - Modal body content
 * @param {string} [props.maxWidth='700px'] - CSS max-width for the panel
 * @param {string} [props.className=''] - Extra class name on the panel
 */
const Modal = ({ title, onClose, children, maxWidth = '700px', className = '' }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-panel ${className}`}
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
  className: PropTypes.string
};

export default Modal;
