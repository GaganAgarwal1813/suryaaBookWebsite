import PropTypes from 'prop-types';
import { getProductsByCategory } from '../../data/products';
import NotebookCard from '../NotebookCard/NotebookCard';
import './NotebookSection.css';

const NotebookSection = ({ category, sectionId }) => {
  const products = getProductsByCategory(category);

  return (
    <section id={sectionId} className="notebook-section">
      <div className="section-container">
        <h2 className="section-title">{category} Notebooks</h2>
        <div className="notebooks-grid">
          {products.map(product => (
            <NotebookCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

NotebookSection.propTypes = {
  category: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired
};

export default NotebookSection;
