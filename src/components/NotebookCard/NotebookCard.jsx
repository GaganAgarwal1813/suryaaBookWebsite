import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/orderUtils';
import './NotebookCard.css';

const NotebookCard = ({ product, variants }) => {
  const hasVariants = variants && variants.length > 0;

  // Subject selector state (only used when variants are provided)
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Determine the active product to display
  const activeProduct = hasVariants ? variants[selectedIdx] : product;

  const hasDiscount = activeProduct.mrp && activeProduct.mrp > activeProduct.price;
  const discountPercent = hasDiscount
    ? Math.round(((activeProduct.mrp - activeProduct.price) / activeProduct.mrp) * 100)
    : 0;

  // For the card title, when variants exist show the page count without subject
  const cardTitle = hasVariants
    ? `Regular - ${activeProduct.pages} Pages`
    : activeProduct.name;

  return (
    <div className="notebook-card">
      <div className="card-images">
        <img
          src={activeProduct.frontImage}
          alt={`${cardTitle} - Front`}
          className="card-image"
        />
        <img
          src={activeProduct.backImage}
          alt={`${cardTitle} - Back`}
          className="card-image"
        />
      </div>
      <div className="card-details">
        <h3 className="card-name">{cardTitle}</h3>

        {/* Subject dropdown */}
        {hasVariants && (
          <div className="subject-selector">
            <label className="subject-selector-label" htmlFor={`subject-${activeProduct.pages}`}>Subject</label>
            <select
              id={`subject-${activeProduct.pages}`}
              className="subject-dropdown"
              value={selectedIdx}
              onChange={(e) => setSelectedIdx(Number(e.target.value))}
            >
              {variants.map((v, idx) => (
                <option key={v.id} value={idx}>
                  {v.subject}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="card-specs">
          <span className="spec-item">📃 {activeProduct.gsm}</span>
          {activeProduct.dimensions && (
            <span className="spec-item">📐 {activeProduct.dimensions}</span>
          )}
        </div>
        <div className="card-footer">
          <div className="price-group">
            <span className="selling-price">{formatCurrency(activeProduct.price)}</span>
            {hasDiscount && (
              <>
                <span className="mrp">{formatCurrency(activeProduct.mrp)}</span>
                <span className="discount-badge">{discountPercent}% off</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const productShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  mrp: PropTypes.number,
  pages: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gsm: PropTypes.string,
  frontImage: PropTypes.string.isRequired,
  backImage: PropTypes.string.isRequired,
  category: PropTypes.string,
  subject: PropTypes.string,
  cover: PropTypes.string
});

NotebookCard.propTypes = {
  product: productShape,
  variants: PropTypes.arrayOf(productShape)
};

export default NotebookCard;
