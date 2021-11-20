import s from './contact-list.module.scss';
import { PropTypes } from 'prop-types';

const ContactList = ({ contacts, handleDelete }) => {
  const contactItems = contacts.map(({ id, name, number }) => (
    <li key={id} className={s.item}>
      <div className={s.textContainer}>
        <span>
          {name}: {number}
        </span>
        <button id={id} className={s.button} type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  ));

  return <ul className={s.list}>{contactItems}</ul>;
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ContactList;
