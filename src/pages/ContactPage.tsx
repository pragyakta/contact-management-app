import React, { useState } from 'react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

import { Person, deletePerson } from '../store/features/personSlices';
import { useAppDispatch} from '../store/store';

const ContactPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [contacts, setContacts] = useState<Person[]>([]);
  const [editingContact, setEditingContact] = useState<Person | null>(null);

  const handleToggleForm = () => {
    setEditingContact(null); // Clear the editing contact when toggling the form
    setShowForm(!showForm);
  };

  const handleAddContact = (contact: Person) => {
    setContacts([...contacts, contact]);
    setShowForm(false); // Hide the form after adding a contact
  };

  const handleEditContact = (contact: Person) => {
    setEditingContact(contact); // Set the contact to be edited
    setShowForm(true); // Show the contact form
  };

  const dispatch = useAppDispatch(); // Get dispatch function

  const handleDeleteContact = async (contactName: string) => {
    try {
      await dispatch(deletePerson(contactName)); // Assuming deletePerson is an asynchronous action
      // Remove the deleted contact from the local state
      setContacts(contacts.filter(contact => contact.name !== contactName));
    } catch (error) {
      // Handle error, if needed
      console.error("Error deleting contact:", error);
    }
  };
 

  return (
    <div className="grid grid-cols-2 gap-8 p-8 bg-white shadow-md">
      <div className="col-span-1">
        <h1 className="text-3xl font-bold mb-4">Contact Page</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
          onClick={handleToggleForm}
        >
          {showForm ? 'Contact List' : 'Add Contact'}
        </button>
        {contacts.length === 0 && !showForm ? (
          <p className="text-red-500 font-semibold">
            No contact found. Please add a contact by clicking 
            on Add contact button.
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
            onEditContact={handleEditContact} 
            onDeleteContact={handleDeleteContact}
          />
        )}
      </div>
    </div>
  );
};

export default ContactPage;
