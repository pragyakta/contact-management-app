import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Person ,updatePerson } from '../../store/features/personSlices';
import { useParams } from 'react-router-dom';

const ContactDetail: React.FC = () => {
  const contacts = useAppSelector((state) => state.person.person);
  const [searchName, setSearchName] = useState('');
  const [contact, setContact] = useState<Person | null>(null); 
  const { contactId } = useParams<{contactId:string }>();
  const contact1 = contacts.find((person)=> person.name === contactId);
  const dispatch = useAppDispatch();

  const [editing, setEditing] =useState(false);
  const [editedName, setEditedName] = useState(contact1?.name || '');
  const [editedNumber, setEditedNumber] = useState(contact1?.number.toString() || '');
  const [editedEmail, setEditedEmail] = useState(contact1?.email || '');
  const [editedStatus, setEditedStatus] = useState(contact1?.status || 'active');

  const handleEditToggle = () => {
    if (contact) {
      setEditing(!editing);
      setEditedName(contact.name);
      setEditedNumber(contact.number.toString());
      setEditedEmail(contact.email);
      setEditedStatus(contact.status);
    }
  };

  const handleUpdateContact = () => {
    if (contact) {
      dispatch(
        updatePerson({
          ...contact,
          name: editedName,
          number: parseInt(editedNumber),
          email: editedEmail,
          status: editedStatus,
        })
      );
      setEditing(false);
    }
  };


  const handleSearch = () => {
    const foundContact = contacts.find((person) => person.name === searchName);
    setContact(foundContact || null);
  };

  return (
    <div>
      <h2>Contact Detail</h2>
      {contact ? (
        <div>
          <p>
            <strong>Name:</strong> {editing ? <input value={editedName} onChange={e => setEditedName(e.target.value)} /> : contact.name}
          </p>
          <p>
            <strong>Number:</strong> {editing ? <input value={editedNumber} onChange={e => setEditedNumber(e.target.value)} /> : contact.number}
          </p>
          <p>
            <strong>Email:</strong> {editing ? <input value={editedEmail} onChange={e => setEditedEmail(e.target.value)} /> : contact.email}
          </p>
          <p>
            <strong>Status:</strong> {editing ? <select value={editedStatus} onChange={e => setEditedStatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select> : contact.status}
          </p>
          <button onClick={handleEditToggle}>{editing ? 'Cancel' : 'Edit'}</button>
          {editing && <button onClick={handleUpdateContact}>Save</button>}
        </div>
      ) : (
        <div>Contact not found.</div>
      )}
    </div>
  );
};

export default ContactDetail;
    