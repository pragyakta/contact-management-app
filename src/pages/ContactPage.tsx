import React, { useState } from 'react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

import { useNavigate } from 'react-router-dom';
import { Person } from '../store/features/personSlices';

const ContactPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [contacts, setContacts] = useState<Person[]>([]);
  const [editingContact, setEditingContact] = useState<Person | null>(null);

  const handleToggleForm = () => {
    setEditingContact(null); // Clear the editing contact when toggling the form
    setShowForm(!showForm);
  };

  const navigate = useNavigate();

  const handleAddContact = (contact: Person) => {
    setContacts([...contacts, contact]);
    setShowForm(false); // Hide the form after adding a contact
  };

  const handleEditContact = (contact: Person) => {
    setEditingContact(contact); // Set the contact to be edited
    setShowForm(true); // Show the contact form
  };

  return (
    <div className="grid grid-cols-2 gap-8 p-8 bg-white shadow-md">
      <div className="col-span-1">
        <h1 className="text-3xl font-bold mb-4">Contact Page</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
          onClick={handleToggleForm}
        >
          {showForm ? 'Show Contact List' : 'Show Contact Form'}
        </button>
        {contacts.length === 0 && !showForm ? (
          <p className="text-red-500 font-semibold">
            No contact found. Please add a contact.
          </p>
        ) : null}

        {/* Show the ContactForm if editingContact is present or showForm is true */}
        {(editingContact !== null || showForm) && (
          <ContactForm
            onAddContact={handleAddContact}
            editingContact={editingContact}
          />
        )}
      </div>

      <div className={`col-span-1 ${showForm ? 'hidden' : ''}`}>
        {contacts.length > 0 && (
          <ContactList
            contacts={contacts}
            onEditContact={handleEditContact} // Pass the handler to ContactList
          />
        )}
      </div>
    </div>
  );
};

export default ContactPage;
