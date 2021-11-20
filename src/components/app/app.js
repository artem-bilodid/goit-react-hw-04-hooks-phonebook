import { useState, useEffect } from 'react';
import s from './app.module.scss';
import { v4 } from 'uuid';

import ContactForm from '../contact-form';
import ContactList from '../contact-list';
import Filter from '../filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const lsContacts = localStorage.getItem('contacts');

    if (lsContacts) {
      setContacts(JSON.parse(lsContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleContactDelete = event => {
    const { id } = event.target;
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  const handleFilterChange = event => {
    const { value } = event.target;

    setFilter(value);
  };

  const addContact = (name, number) => {
    setContacts(prevContacts => {
      if (prevContacts.find(contact => contact.name === name)) {
        alert(`${name} is already in the contacts`);
        return prevContacts;
      }

      return prevContacts.concat({
        name,
        number,
        id: v4(),
      });
    });
  };

  const getFilteredContacts = (contacts, filter) => {
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));
  };

  const filteredContacts = getFilteredContacts(contacts, filter);

  return (
    <div className={s.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} handleDelete={handleContactDelete} />
    </div>
  );
};

export default App;
