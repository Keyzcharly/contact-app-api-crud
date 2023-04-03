import React, {useRef} from 'react'
import ContactCard from './ContactCard';
import {Link} from 'react-router-dom';

const ContactList = (props) => {
  const inputEl = useRef('');

  // console.log(props);

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  }; 

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id} />
    );
  })

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  }

  return (
    <div className='main' style={{paddingTop: '10%'}}>
      <h3>
        Contact List
        <Link to='/add' >
          <button className='ui button blue right floated'>Add Contact</button>
        </Link>
      </h3>

      {/* search bar */}
      <div className='ui search'>
        <div className='ui icon input'>
          <input ref={inputEl} type='text' placeholder='Search Contacts' className='prompt' value={props.term} onChange={getSearchTerm} />
          <i className='search icon'></i>
        </div>
      </div>

      <div className='ui celled list' style={{paddingTop: '4%'}}>{renderContactList.length > 0 ? renderContactList : "No Contacts Available"}</div>
    </div>
    
  )
}

export default ContactList