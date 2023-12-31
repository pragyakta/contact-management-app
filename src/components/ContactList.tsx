import React, { useState } from 'react';
import { Person, deletePerson } from '../store/features/personSlices';


interface ContactListProps {
  contacts: Person[];
  onEditContact: (contact: Person) => void;
  onDeleteContact: (contactName: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({contacts,onEditContact, onDeleteContact, }) => {
  

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Contact List</h2>
      {contacts.map((contact) => (
        <div key={contact.name} className="border p-4 mb-4">
          <p>
            <strong>Name:</strong> {contact.name}
          </p>
          <p>
            <strong>Number:</strong> {contact.number}
          </p>
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
          <p>
            <strong>Status:</strong> {contact.status}
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded
          mr-2" onClick={() => onEditContact(contact)}
          >Edit</button>
          <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded
          mr-2"  onClick={() => onDeleteContact(contact.name)}
          >Delete</button>


        </div>
      ))}
     
    </div>
  );
};

export default ContactList;


