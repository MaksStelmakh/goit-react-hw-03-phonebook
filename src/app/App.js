import React from "react";
import shortid from "shortid";
import ContactForm from "../contactForm/ContactForm";
import Filter from "../filter/Filter";
import Contacts from "../contacts/Contacts";
import { MainSection } from "./App.styled";

export default class App extends React.Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addNewContact = ({ name, number }) => {
    const { contacts } = this.state;
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      const contact = {
        id: shortid.generate(),
        name,
        number,
      };
      this.setState(({ contacts }) => ({
        contacts: [...contacts, contact],
      }));
    }
  };

  deleteContact = (Id) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== Id),
    }));
  };

  searchMethod = (evt) => {
    this.setState({ filter: evt.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((filter) =>
      filter.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const contact = localStorage.getItem(`contacts`);
    const parsedContact = JSON.parse(contact);

    if (parsedContact) {
      this.setState({ contacts: parsedContact });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      localStorage.setItem(`contacts`, JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const filteredContacts = this.getVisibleContacts();
    const { filter, contacts } = this.state;
    return (
      <MainSection>
        <ContactForm onSubmit={this.addNewContact} />
        <div>
          <h2>Contacts</h2>
          <Filter value={filter} change={this.searchMethod} />
          {contacts.length > 0 ? (
            <Contacts
              filter={filteredContacts}
              deleteElem={this.deleteContact}
            />
          ) : (
            <h2>Your Phonebook is empty!</h2>
          )}
        </div>
      </MainSection>
    );
  }
}
