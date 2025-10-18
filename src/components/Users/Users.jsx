import React, { useState } from 'react';
import './Users.css';

const Users = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([
    // { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    // { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    // { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User' },
    // { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator' },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="users-page">
      <h2>Users</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
