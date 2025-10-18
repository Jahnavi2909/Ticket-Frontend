
// import React from 'react';
// import './Sidebar.css';

// const Sidebar = ({ activeTab, setActiveTab }) => {
//   return (
//     <div className="sidebar">
//       <h1 className="logo">User</h1>
//       <ul>
//         <li
//           className={activeTab === 'tickets' ? 'active' : ''}
//           onClick={() => setActiveTab('tickets')}
//         >
//           Tickets
//         </li>
//         <li
//           className={activeTab === 'knowledge' ? 'active' : ''}
//           onClick={() => setActiveTab('knowledge')}
//         >
//           Knowledge Base
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import ChangePassword from '../../pages/ChangePassword/ChangePassword';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [userProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'User'
  });

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleChangePasswordClick = () => {
    setShowProfileModal(false);
navigate('/ChangePassword');

  };


  // const handleBackFromChangePassword = () => {
  //   setShowChangePassword(false);
  //   setShowProfileModal(true);
  // };

  // if (showChangePassword) {
  //   return <ChangePassword setCurrentPage={() => handleBackFromChangePassword()} />;
  // }

  return (
    <div className="sidebar">
      <h1 className="logo">User</h1>
      <ul>
        <li
          className={activeTab === 'tickets' ? 'active' : ''}
          onClick={() => setActiveTab('tickets')}
        >
          Tickets
        </li>
        <li
          className={activeTab === 'knowledge' ? 'active' : ''}
          onClick={() => setActiveTab('knowledge')}
        >
          Knowledge Base
        </li>
      </ul>

      {/* Profile Button at Bottom */}
      <button className="profile-button" onClick={handleProfileClick}>
        <span className="profile-icon">👤</span>
        <span className="profile-text">Profile</span>
      </button>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="profile-modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <h2>Profile Details</h2>
              <button
                className="modal-close-btn"
                onClick={() => setShowProfileModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="profile-modal-content">
              <div className="profile-info">
                <div className="profile-avatar">
                  <span>👤</span>
                </div>
                <div className="profile-details">
                  <div className="profile-field">
                    <label>Name:</label>
                    <span>{userProfile.name}</span>
                  </div>
                  <div className="profile-field">
                    <label>Email:</label>
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="profile-field">
                    <label>Role:</label>
                    <span>{userProfile.role}</span>
                  </div>
                </div>
              </div>

              <button
                className="change-password-button"
                onClick={handleChangePasswordClick}
              >
                🔐 Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
