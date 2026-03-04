import { useCart } from '../../context/CartContext';
import './NotebookCard.css';

const NotebookCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const hasDiscount = product.mrp && product.mrp > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <div className="notebook-card">
      <div className="card-images">
        <img 
          src={product.frontImage} 
          alt={`${product.name} - Front`}
          className="card-image"
        />
        <img 
          src={product.backImage} 
          alt={`${product.name} - Back`}
          className="card-image"
        />
      </div>
      <div className="card-details">
        <h3 className="card-name">{product.name}</h3>
        <div className="card-specs">
          <span className="spec-item">📄 {product.pages} Pages</span>
          <span className="spec-item">📃 {product.gsm}</span>
        </div>
        <div className="card-footer">
          <div className="price-group">
            <span className="selling-price">₹{product.price}</span>
            {hasDiscount && (
              <>
                <span className="mrp">₹{product.mrp}</span>
                <span className="discount-badge">{discountPercent}% off</span>
              </>
            )}
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <span>🛒</span> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotebookCard;
