

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
