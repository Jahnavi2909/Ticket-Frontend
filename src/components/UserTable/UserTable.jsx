import React, { useState } from 'react';
import { Edit, Trash2, ArrowLeft } from 'lucide-react';
import './UserTable.css';

const UserTable = () => {
  const [users, ] = useState([
    { id: 1, name: 'Alice Johnson', email: '', role: '', avatar: null },
    { id: 2, name: 'Bob Williams', email: 'Admin', role: 'Agent', avatar: 'https://i.pravatar.cc/40?img=12', subtitle: 'Admin' },
    { id: 3, name: 'Bob Williams', email: 'Agent', role: 'Delete', avatar: 'https://i.pravatar.cc/40?img=13', subtitle: 'Admin' },
    { id: 4, name: 'Charlie Davis', email: 'Agent', role: 'Delete', avatar: 'https://i.pravatar.cc/40?img=8', subtitle: 'Mange' },
  ]);

  return (
    <div className="user-management">
      {/* <div className="section-header">
        <button className="add-user-btn">Add New User</button>
      </div> */}
      
      <h2 className="section-title">User Management</h2>
      
      <table className="user-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <div className="user-info">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="user-avatar-small" />
                  ) : (
                    <div className="user-avatar-placeholder" />
                  )}
                  <div>
                    <div className="user-name">{user.name}</div>
                    {user.subtitle && <div className="user-subtitle">{user.subtitle}</div>}
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <div className="action-buttons">
                  {user.id !== 1 && (
                    <>
                      <button className="action-btn">Edit</button>
                      <button className="icon-btn"><ArrowLeft size={16} /></button>
                      <button className="icon-btn"><Trash2 size={16} /></button>
                    </>
                  )}
                  {user.id === 1 && (
                    <button className="icon-btn"><Edit size={16} /></button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;