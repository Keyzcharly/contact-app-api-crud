import React from 'react';
import user from '../images/user.jpg';
import {Link} from 'react-router-dom';

const ContactDetails = (props) => {

    const {name, email} = props.location.state.contact

    console.log(props);
  return (
    <div className='main' style={{paddingTop: '10%'}}>
        <div className='ui card centered'>
            <div className='image'>
                <img src={user} alt='user' />
            </div>
            <div className='content'>
                <div className='header'>{name}</div>
                <div className='description'>{email}</div>
            </div>
        </div>
        <div className='ui center aligned container'>
            <Link to="/">
                <button className='ui button blue center'>Back to Contact List</button>
            </Link>
        </div>
    </div>
  )
}

export default ContactDetails