import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Person, addPerson, updatePerson } from '../store/features/personSlices';

interface ContactFormProps {
  onAddContact: (contact: Person) => void;
  editingContact?: Person | null; // Include editingContact prop
}

const ContactForm: React.FC<ContactFormProps> = ({ onAddContact, editingContact }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(editingContact?.name || '');
  const [number, setNumber] = useState(editingContact?.number.toString() || '');
  const [email, setEmail] = useState(editingContact?.email || '');
  const [status, setStatus] = useState<'active' | 'inactive'>(
    editingContact?.status as 'active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingContact) {
      // If editingContact exists, update the existing contact
      dispatch(updatePerson({ ...editingContact, name, number: parseInt(number), email, status }));
    } else {
      // Otherwise, add a new contact
      dispatch(addPerson({ name, number: parseInt(number), email, status }));
    }
    // Clear form fields
    setName('');
    setNumber('');
    setEmail('');
    setStatus('active');
    onAddContact({
      name,
      number: parseInt(number),
      email,
      status,
    });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-2">
        {editingContact ? 'Edit Contact' : 'Add New Contact'}
      </h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-2">
          <label htmlFor="name" className="block font-medium"
          >Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-2 py-1 border rounded-md"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="number" className="block font-medium">Number:</label>
          <input
            type="tel"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-2 py-1 border rounded-md"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block font-medium">
            Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-2 py-1 border rounded-md text-sm"
            required
          />
        </div>
        <div className="mb-2">
        <label htmlFor="status" className="block font-medium">
            Status:
          </label>
          <select value={status} 
                  onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
                  className="w-full px-2 py-1 border rounded-md text-sm">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button className="bg-green-500 hover:bg-green-500/50 text-white py-1 px-2 rounded text-sm" 
        type="submit">
          {editingContact ? 'Update Contact' : 'Add Contact'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
