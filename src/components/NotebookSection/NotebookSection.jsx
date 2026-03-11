import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  getRegularProductsGroupedByCover,
  getRegisterProductsGrouped,
  regularGsmTypes,
  registerTypes,
} from '../../data/products';
import { isFullCatalogActive } from '../../utils/catalogDate';
import NotebookCard from '../NotebookCard/NotebookCard';
import FilterGroup from '../FilterGroup/FilterGroup';
import './NotebookSection.css';

const NotebookSection = ({ category, sectionId }) => {
  const isRegular = category === 'Regular';
  const isRegister = category === 'Register';
  const fullCatalog = isFullCatalogActive();

  const [selectedGsm, setSelectedGsm] = useState(regularGsmTypes[0]);

  const [selectedType, setSelectedType] = useState(registerTypes[0]);

  const effectiveGsm = isRegular && !fullCatalog ? '58 GSM' : selectedGsm;
  const regularCoverGroups = isRegular ? getRegularProductsGroupedByCover(effectiveGsm) : [];
  const registerGroups = isRegister ? getRegisterProductsGrouped(selectedType, 'All') : [];

  return (
    <section id={sectionId} className="notebook-section">
      <div className="section-container">
        <h2 className="section-title">{category} Notebooks</h2>

        {isRegular && fullCatalog && (
          <div className="filter-controls">
            <FilterGroup
              label="Paper Quality"
              options={regularGsmTypes}
              selected={selectedGsm}
              onSelect={setSelectedGsm}
              variant="tab"
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
          </div>
        )}

        <div className="notebooks-grid notebooks-grid--covers">
          {isRegular
            ? regularCoverGroups.map((group) => (
                <NotebookCard
                  key={group.key}
                  products={group.products}
                />
              ))
            : registerGroups.map((group) => (
                <NotebookCard
                  key={group.key}
                  products={group.products}
                />
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
