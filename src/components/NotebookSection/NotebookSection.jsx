import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  getProductsByCategory,
  getRegularProductsGrouped,
  getRegisterProducts,
  regularGsmTypes,
  regularCovers,
  registerTypes,
  registerCovers,
  registerPageOptions
} from '../../data/products';
import NotebookCard from '../NotebookCard/NotebookCard';
import FilterGroup from '../FilterGroup/FilterGroup';
import './NotebookSection.css';

const NotebookSection = ({ category, sectionId }) => {
  const isRegular = category === 'Regular';
  const isRegister = category === 'Register';

  // Filter state for Regular notebooks
  const [selectedGsm, setSelectedGsm] = useState(regularGsmTypes[0]);
  const [selectedCover, setSelectedCover] = useState(regularCovers[0]);

  // Filter state for Register notebooks
  const [selectedType, setSelectedType] = useState(registerTypes[0]);
  const [selectedRegCover, setSelectedRegCover] = useState(registerCovers[0]);
  const [selectedPages, setSelectedPages] = useState(registerPageOptions[0]);

  // Get the right product list
  const regularGroups = isRegular ? getRegularProductsGrouped(selectedGsm, selectedCover) : [];
  const registerProducts = isRegister ? getRegisterProducts(selectedType, selectedRegCover, selectedPages) : [];
  const otherProducts = (!isRegular && !isRegister) ? getProductsByCategory(category) : [];

  const renderPageLabel = (pages) => (pages === 'All' ? 'All' : `${pages} Pages`);

  return (
    <section id={sectionId} className="notebook-section">
      <div className="section-container">
        <h2 className="section-title">{category} Notebooks</h2>

        {isRegular && (
          <div className="filter-controls">
            <FilterGroup
              label="Paper Quality"
              options={regularGsmTypes}
              selected={selectedGsm}
              onSelect={setSelectedGsm}
              variant="tab"
            />
            <FilterGroup
              label="Cover Design"
              options={regularCovers}
              selected={selectedCover}
              onSelect={setSelectedCover}
              variant="pill"
            />
          </div>
        )}

        {isRegister && (
          <div className="filter-controls">
            <FilterGroup
              label="Type"
              options={registerTypes}
              selected={selectedType}
              onSelect={setSelectedType}
              variant="tab"
            />
            <FilterGroup
              label="Cover Design"
              options={registerCovers}
              selected={selectedRegCover}
              onSelect={setSelectedRegCover}
              variant="pill"
            />
            <FilterGroup
              label="Pages"
              options={registerPageOptions}
              selected={selectedPages}
              onSelect={setSelectedPages}
              variant="pill"
              renderLabel={renderPageLabel}
            />
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
            : isRegister
              ? registerProducts.map((product) => (
                  <NotebookCard key={product.id} product={product} />
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
