// import React, { useState } from 'react';
// import Sidebar3 from '../../components/Sidebar3/Sidebar3';
// import './User.css';

// // const Navbar = () => {
// //   return (
// //     <nav className="navbar">
// //       <h1>Dashboard</h1>
// //       <div className="navbar-right">
// //         <span className="admin-icon">👤</span>
// //         <span className="admin-text">Admin</span>
// //       </div>
// //     </nav>
// //   );
// // };

// // const Sidebar = () => {
// //   return (
// //     <aside className="sidebar">
// //       <div className="sidebar-brand">Dashboard</div>
// //       <ul className="sidebar-menu">
// //         <li className="active">Dashboard</li>
// //         <li>Users</li>
// //       </ul>
// //     </aside>
// //   );
// // };

// const UserModal = ({ isOpen, onClose, onSave, editUser }) => {
//   const [formData, setFormData] = useState(
//     editUser || { id: '', name: '', email: '', role: 'User', password: '' }
//   );

//   React.useEffect(() => {
//     if (editUser) {
//       setFormData(editUser);
//     } else {
//       setFormData({ id: '', name: '', email: '', role: 'User', password: '' });
//     }
//   }, [editUser, isOpen]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     if (formData.name && formData.email && formData.id && (editUser || formData.password)) {
//       onSave(formData);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>{editUser ? 'Edit User' : 'Add New User'}</h2>
//           <button className="modal-close" onClick={onClose}>&times;</button>
//         </div>
//         <div className="form-container">
//           <div className="form-group">
//             <label>ID</label>
//             <input
//               type="text"
//               name="id"
//               value={formData.id}
//               onChange={handleChange}
//               disabled={!!editUser}
//             />
//           </div>
//           <div className="form-group">
//             <label>Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Role</label>
//             <select name="role" value={formData.role} onChange={handleChange}>
//               <option value="User">User</option>
//               <option value="Admin">Admin</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder={editUser ? 'Leave blank to keep current' : ''}
//             />
//           </div>
//           <div className="modal-actions">
//             <button type="button" className="btn-cancel" onClick={onClose}>
//               Cancel
//             </button>
//             <button type="button" className="btn-save" onClick={handleSubmit}>
//               {editUser ? 'Update' : 'Save'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DeleteModal = ({ isOpen, onClose, onConfirm, userName }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>Confirm Delete</h2>
//           <button className="modal-close" onClick={onClose}>&times;</button>
//         </div>
//         <div className="modal-body">
//           <p>Are you sure you want to delete user <strong>{userName}</strong>?</p>
//           <p className="warning-text">This action cannot be undone.</p>
//         </div>
//         <div className="modal-actions">
//           <button type="button" className="btn-cancel" onClick={onClose}>
//             Cancel
//           </button>
//           <button type="button" className="btn-delete" onClick={onConfirm}>
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const UsersPage = () => {
//   const [users, setUsers] = useState([
//     { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', password: 'admin123' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', password: 'user123' }
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [deletingUser, setDeletingUser] = useState(null);

//   const handleAddUser = () => {
//     setEditingUser(null);
//     setIsModalOpen(true);
//   };

//   const handleEditUser = (user) => {
//     setEditingUser(user);
//     setIsModalOpen(true);
//   };

//   const handleDeleteClick = (user) => {
//     setDeletingUser(user);
//     setIsDeleteModalOpen(true);
//   };

//   const handleDeleteConfirm = () => {
//     setUsers(users.filter(user => user.id !== deletingUser.id));
//     setIsDeleteModalOpen(false);
//     setDeletingUser(null);
//   };

//   const handleSaveUser = (userData) => {
//     if (editingUser) {
//       setUsers(users.map(user => user.id === userData.id ? userData : user));
//     } else {
//       setUsers([...users, userData]);
//     }
//     setIsModalOpen(false);
//     setEditingUser(null);
//   };

//   return (
//     <div className="users-page">
//       <div className="page-header">
//         <h2>Users</h2>
//         <button className="add-user-btn" onClick={handleAddUser}>
//           + Add User
//         </button>
//       </div>

//       <div className="users-table-container">
//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>Id</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Edit</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//                 <td>
//                   <button className="edit-btn" onClick={() => handleEditUser(user)}>
//                     🖊️
//                   </button>
//                 </td>
//                 <td>
//                   <button className="delete-btn" onClick={() => handleDeleteClick(user)}>
//                     🗑️
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <UserModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditingUser(null);
//         }}
//         onSave={handleSaveUser}
//         editUser={editingUser}
//       />

//       <DeleteModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => {
//           setIsDeleteModalOpen(false);
//           setDeletingUser(null);
//         }}
//         onConfirm={handleDeleteConfirm}
//         userName={deletingUser?.name}
//       />
//     </div>
//   );
// };

// function App() {
//   return (
//     <div className="app">
//       <Sidebar3 />
//       <div className="main-content">
//         {/* <Navbar /> */}
//         <div className="page-content">
//           <UsersPage />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import './UsersPage.css';
// import Sidebar3 from '../../components/Sidebar3/Sidebar3';
// import UserModal from '../../components/UserModal/UserModal';
// import UserAPI from '../../services/UserAPI';
// import { Edit, Trash2 } from 'lucide-react';

// const UsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const [activeTab, setActiveTab] = useState('users');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);

//   const fetchUsers = async () => {
//     const data = await UserAPI.getAllUsers();
//     setUsers(data || []);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleAddUser = () => {
//     setEditingUser(null);
//     setIsModalOpen(true);
//   };

//   const handleEditUser = (user) => {
//     setEditingUser(user);
//     setIsModalOpen(true);
//   };

//   const handleDeleteUser = async (id) => {
//     await UserAPI.deleteUser(id);
//     fetchUsers();
//   };

//   const handleSaveUser = async (userData) => {
//     if (editingUser) {
//       await UserAPI.updateUser(userData);
//     } else {
//       await UserAPI.saveUser(userData);
//     }
//     setIsModalOpen(false);
//     fetchUsers();
//   };

//   return (
//     <div className="users-page-container">
//       <Sidebar3 activeTab={activeTab} setActiveTab={setActiveTab} />

//       <div className="users-main">
//         <div className="users-header">
//           <h2>Users</h2>
//           <button className="add-user-btn" onClick={handleAddUser}>
//             + Add User
//           </button>
//         </div>

//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>Id</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map((user) => (
//                 <tr key={user.id}>
//                   <td>{user.id}</td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.role}</td>
//                   <td className="action-buttons">
//                     <Edit
//                       size={18}
//                       className="edit-icon"
//                       onClick={() => handleEditUser(user)}
//                     />
//                     <Trash2
//                       size={18}
//                       className="delete-icon"
//                       onClick={() => handleDeleteUser(user.id)}
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No users found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <UserModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleSaveUser}
//         editUser={editingUser}
//       />
//     </div>
//   );
// };

// export default UsersPage;

// src/pages/Users/UsersPage.jsx
// import React, { useEffect, useState } from 'react';
// import './UsersPage.css';
// import { Edit, Trash2 } from 'lucide-react';
// import Sidebar3 from '../../components/Sidebar3/Sidebar3';
// import UserModal from '../../components/UserModal/UserModal';
// import UserAPI from '../../services/UserAPI';

// const UsersPage = ({ activeTab, setActiveTab }) => {
//   const [users, setUsers] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [userToEdit, setUserToEdit] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await UserAPI.getAllUsers();
//       setUsers(data);
//     };
//     fetchData();
//   }, []);

//   const handleAdd = () => {
//     setUserToEdit(null);
//     setModalOpen(true);
//   };

//   const handleEdit = (user) => {
//     setUserToEdit(user);
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       await UserAPI.deleteUser(id);
//       setUsers(users.filter((u) => u.id !== id));
//     }
//   };

//   const handleSave = async (userData) => {
//     if (userToEdit) {
//       await UserAPI.updateUser(userData);
//       setUsers(users.map((u) => (u.id === userData.id ? userData : u)));
//     } else {
//       await UserAPI.saveUser(userData);
//       setUsers([...users, userData]);
//     }
//     setModalOpen(false);
//   };

//   return (
//     <div className="users-layout">
//       <Sidebar3 activeTab={activeTab} setActiveTab={setActiveTab} />
//       <div className="users-main">
//         <div className="users-header">
//           <h1>Users</h1>
//           <button className="add-btn" onClick={handleAdd}>+ Add User</button>
//         </div>

//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//                 <td className="actions">
//                   <Edit className="icon edit" onClick={() => handleEdit(user)} />
//                   <Trash2 className="icon delete" onClick={() => handleDelete(user.id)} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {modalOpen && (
//           <UserModal
//             isOpen={modalOpen}
//             onClose={() => setModalOpen(false)}
//             onSave={handleSave}
//             userToEdit={userToEdit}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default UsersPage;

//code taken from support file
import React, { useEffect, useState } from "react";
import "./UsersPage.css";
import { Edit, Trash2 } from "lucide-react";
import Sidebar3 from "../../components/Sidebar3/Sidebar3";
import UserModal from "../../components/UserModal/UserModal";
import UserAPI from "../../services/UserAPI";

const UsersPage = ({ activeTab, setActiveTab }) => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page = 1) => {
    try {
      const paginationRequest = { pageNumber: page - 1, pageSize: 50 }; // adjust as needed
      const response = await UserAPI.getAllUsers(paginationRequest);
      console.log("Fetched users:", response);

      // Expected backend response: { data: { userDtos, totalPages } }
      if (response?.data?.userDtos) {
        setUsers(response.data.userDtos);
        setTotalPages(response.data.totalPages || 1);
      } else {
        setUsers([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await UserAPI.getAllUsers();
  //     console.log(data);
  //     setUsers(data.data.userDtos);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleAdd = () => {
    setUserToEdit(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await UserAPI.deleteUser(id);
      // setUsers(users.filter((u) => u.id !== id));
      fetchData(currentPage);
    }
  };

  // const handleSave = async (userData) => {
  //   const formattedUser = {
  //     ...userData,
  //     role: userData.role.toUpperCase(),
  //   };
  //   if (userToEdit) {
  //     await UserAPI.updateUser(formattedUser);
  //     setUsers(users.map((u) => (u.id === userData.id ? formattedUser : u)));
  //   } else {
  //     await UserAPI.saveUser(formattedUser);
  //     setUsers([...users, formattedUser]);
  //   }
  //   setModalOpen(false);
  // };

  const handleSave = async (userData) => {
    // let mappedRole = "USER";
    // if (userData.role.toLowerCase() === "support") {
    //   mappedRole = "SUPPORT_AGENT"; // must match your backend enum/role name
    // } else if (userData.role.toLowerCase() === "admin") {
    //   mappedRole = "ADMIN";
    // }

    const formattedUser = {
      ...userData,
      role: userData.role.toUpperCase(),
    };

    try {
      if (userToEdit) {
        const response = await UserAPI.updateUser(formattedUser);
        // Use backend response
        if (response?.data) {
                      // users.map((u) =>
            //   (u.id === response.data.id ? response.data : u)
            // )
            setUsers((prev) =>
              prev.map((u) => (u.id === response.data.id ? response.data : u))
            );
        }
      } else {
        const response = await UserAPI.saveUser(formattedUser);
        // ✅ Use backend response data
        if (response?.data) {
          // setUsers([...users, response.data]);
          fetchData(currentPage);
        }
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }

    setModalOpen(false);
  };

  return (
    <div className="users-layout">
      <Sidebar3 activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="users-main">
        <div className="users-header">
          <h1>Users</h1>
          <button className="add-btn" onClick={handleAdd}>
            + Add User
          </button>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="actions">
                    <Edit
                      className="icon edit"
                      onClick={() => handleEdit(user)}
                    />
                    <Trash2
                      className="icon delete"
                      onClick={() => handleDelete(user.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {modalOpen && (
          <UserModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            userToEdit={userToEdit}
          />
        )}
      </div>
    </div>
  );
};
export default UsersPage;
