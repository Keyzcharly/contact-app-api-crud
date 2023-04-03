import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import { v4 } from 'uuid';
import { Switch, Route } from 'react-router-dom';
import ContactDetails from './components/ContactDetails';
import api from './api/contact';
import EditContact from './components/EditContact';


function App() {

  const LOCAL_STORAGE_KEY = 'contacts';

  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //fetching from the api with axios
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }


  // posting to the api asyncly, creating the request body
  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: v4(),
      ...contact,
    };

    const response = await api.post("/contacts", request)
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact)
    const { id, name, email } = response.data;

    setContacts(contacts.map((contact) => {
      return contact.id === id ? { ...response.data } : contact;
    }))
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join("").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  }

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) {
    //   setContacts(retriveContacts);
    // }
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();

  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui container'>
      <Header />
      <Switch>
        <Route path='/add' render={(props) => (<AddContact {...props} addContactHandler={addContactHandler} />)} />
        <Route path='/' exact={true} render={(props) => (<ContactList {...props} contacts={searchTerm.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />)} />
        <Route path='/contact/:id' component={ContactDetails} />
        <Route path='/edit' render={(props) => (<EditContact {...props} updateContactHandler={updateContactHandler} />)} />
      </Switch>

      {/* <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}

    </div>
  );
}

export default App;
