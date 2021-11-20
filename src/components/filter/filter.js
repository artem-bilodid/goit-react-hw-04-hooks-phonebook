import s from './filter.module.scss';
import PropTypes from 'prop-types';

const Filter = ({ filter, handleChange }) => {
  return (
    <label className={s.label}>
      Find contacts by name
      <input type="text" name="filter" value={filter} onChange={handleChange} />
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Filter;
