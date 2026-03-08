import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/orderUtils';
import './NotebookCard.css';

const NotebookCard = ({ products: productsProp, product: singleProduct }) => {
  const products = useMemo(
    () => (productsProp ? productsProp : singleProduct ? [singleProduct] : []),
    [productsProp, singleProduct]
  );

  const subjects = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.subject).filter(Boolean))];
    return unique;
  }, [products]);

  const pageOptions = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.pages).filter(Boolean))];
    return unique.sort((a, b) => a - b);
  }, [products]);

  const [selectedSubject, setSelectedSubject] = useState(subjects[0] || null);
  const [selectedPages, setSelectedPages] = useState(pageOptions[0] || null);

  const activeProduct = useMemo(() => {
    if (products.length === 1) return products[0];

    return products.find((p) => {
      const subjectMatch = !selectedSubject || p.subject === selectedSubject;
      const pagesMatch = !selectedPages || p.pages === selectedPages;
      return subjectMatch && pagesMatch;
    }) || products[0];
  }, [products, selectedSubject, selectedPages]);

  if (!activeProduct) return null;

  const hasDiscount = activeProduct.mrp && activeProduct.mrp > activeProduct.price;
  const discountPercent = hasDiscount
    ? Math.round(((activeProduct.mrp - activeProduct.price) / activeProduct.mrp) * 100)
    : 0;

  const cardTitle = activeProduct.category === 'Register'
    ? activeProduct.cover || `${activeProduct.type} Register`
    : activeProduct.cover
      ? activeProduct.cover
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

        {subjects.length > 1 && (
          <div className="subject-selector">
            <label className="subject-selector-label" htmlFor={`subject-${activeProduct.id}`}>Subject</label>
            <select
              id={`subject-${activeProduct.id}`}
              className="subject-dropdown"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}

        {pageOptions.length > 1 && (
          <div className="page-tags">
            {pageOptions.map((pages) => (
              <button
                key={pages}
                type="button"
                className={`page-tag${pages === selectedPages ? ' active' : ''}`}
                onClick={() => setSelectedPages(pages)}
              >
                {pages} Pages
              </button>
            ))}
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
  products: PropTypes.arrayOf(productShape)
};

export default NotebookCard;
