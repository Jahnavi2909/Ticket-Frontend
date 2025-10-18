



// src/components/UserModal/UserModal.jsx
import React, { useState, useEffect } from 'react';
import './UserModal.css';

const UserModal = ({ isOpen, onClose, onSave, userToEdit }) => {
  const [formData, setFormData] = useState({ id: '', name: '', email: '', role: 'USER' });

  useEffect(() => {
    if (userToEdit) {
      setFormData(userToEdit);
    } else {
      setFormData({ id: '', name: '', email: '', role: 'USER' });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const formattedData = {
      ...formData,
      role: formData.role.toUpperCase(),
    };
    onSave(formattedData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>{userToEdit ? 'Edit User' : 'Add User'}</h2>
        {/* <input
          type="text"
          name="id"
          placeholder="ID"
          value={formData.id}
          onChange={handleChange}
          disabled={!!userToEdit}
        /> */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="SUPPORT_AGENT">Support Agent</option>
          <option value="USER">User</option>
        </select>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">Cancel</button>
          <button onClick={handleSubmit} className="btn-save">
            {userToEdit ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
