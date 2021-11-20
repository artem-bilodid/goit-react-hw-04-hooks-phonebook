import React, { Component } from 'react';
import s from './app.module.scss';
import { v4 } from 'uuid';

import ContactForm from '../contact-form';
import ContactList from '../contact-list';
import Filter from '../filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const lsContacts = localStorage.getItem('contacts');

    if (lsContacts) {
      this.setState({ contacts: JSON.parse(lsContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleContactDelete = event => {
    const { id } = event.target;
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  addContact = (name, number) => {
    this.setState(prevState => {
      if (prevState.contacts.find(contact => contact.name === name)) {
        alert(`${name} is already in the contacts`);
        return;
      }

      return {
        contacts: prevState.contacts.concat({
          name,
          number,
          id: v4(),
        }),
      };
    });
  };

  getFilteredContacts = (contacts, filter) => {
    const filterNormaziled = filter.toLowerCase();

    return contacts.filter(({ name }) => {
      const nameNormalized = name.toLowerCase();
      return nameNormalized.includes(filterNormaziled);
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts(contacts, filter);

    return (
      <div className={s.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter filter={filter} handleChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} handleDelete={this.handleContactDelete} />
      </div>
    );
  }
}

export default App;
