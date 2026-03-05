import PropTypes from 'prop-types';

/**
 * Reusable filter toggle group (tabs or pills).
 *
 * @param {object} props
 * @param {string} props.label - Label shown before the buttons
 * @param {string[]} props.options - List of option values
 * @param {string} props.selected - Currently selected option
 * @param {Function} props.onSelect - Called with the selected option value
 * @param {'tab'|'pill'} [props.variant='tab'] - Visual style
 * @param {Function} [props.renderLabel] - Optional custom label renderer; receives (option) and returns a string
 */
const FilterGroup = ({ label, options, selected, onSelect, variant = 'tab', renderLabel }) => {
  const containerClass = variant === 'tab' ? 'gsm-tabs' : 'cover-pills';
  const buttonClass = variant === 'tab' ? 'gsm-tab' : 'cover-pill';

  return (
    <div className="filter-group">
      <span className="filter-label">{label}</span>
      <div className={containerClass}>
        {options.map((opt) => (
          <button
            key={opt}
            className={`${buttonClass} ${selected === opt ? 'active' : ''}`}
            onClick={() => onSelect(opt)}
          >
            {renderLabel ? renderLabel(opt) : opt}
          </button>
        ))}
      </div>
    </div>
  );
};

FilterGroup.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['tab', 'pill']),
  renderLabel: PropTypes.func
};

export default FilterGroup;
