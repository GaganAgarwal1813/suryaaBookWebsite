import { useState } from 'react';
import PropTypes from 'prop-types';
import { getProductsByCategory, getRegularProductsGrouped, regularGsmTypes, regularCovers } from '../../data/products';
import NotebookCard from '../NotebookCard/NotebookCard';
import './NotebookSection.css';

const NotebookSection = ({ category, sectionId }) => {
  const isRegular = category === 'Regular';

  // Filter state for Regular notebooks
  const [selectedGsm, setSelectedGsm] = useState(regularGsmTypes[0]);
  const [selectedCover, setSelectedCover] = useState(regularCovers[0]);

  // Get the right product list
  const regularGroups = isRegular ? getRegularProductsGrouped(selectedGsm, selectedCover) : [];
  const otherProducts = !isRegular ? getProductsByCategory(category) : [];

  return (
    <section id={sectionId} className="notebook-section">
      <div className="section-container">
        <h2 className="section-title">{category} Notebooks</h2>

        {isRegular && (
          <div className="filter-controls">
            {/* GSM Tabs */}
            <div className="filter-group">
              <span className="filter-label">Paper Quality</span>
              <div className="gsm-tabs">
                {regularGsmTypes.map((gsm) => (
                  <button
                    key={gsm}
                    className={`gsm-tab ${selectedGsm === gsm ? 'active' : ''}`}
                    onClick={() => setSelectedGsm(gsm)}
                  >
                    {gsm}
                  </button>
                ))}
              </div>
            </div>

            {/* Cover Filter Pills */}
            <div className="filter-group">
              <span className="filter-label">Cover Design</span>
              <div className="cover-pills">
                {regularCovers.map((cover) => (
                  <button
                    key={cover}
                    className={`cover-pill ${selectedCover === cover ? 'active' : ''}`}
                    onClick={() => setSelectedCover(cover)}
                  >
                    {cover}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="notebooks-grid">
          {isRegular
            ? regularGroups.map((group) => (
                <NotebookCard
                  key={`${selectedGsm}-${selectedCover}-${group.pages}`}
                  variants={group.variants}
                />
              ))
            : otherProducts.map((product) => (
                <NotebookCard key={product.id} product={product} />
              ))
          }
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
