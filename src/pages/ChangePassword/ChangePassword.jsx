// import React, { useState } from "react";
// import './ChangePassword.css';

// const ChangePassword = ({ setCurrentPage }) => {
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Password requirements check
//   const requirements = {
//     length: newPassword.length >= 8,
//     uppercase: /[A-Z]/.test(newPassword),
//     lowercase: /[a-z]/.test(newPassword),
//     number: /\d/.test(newPassword),
//     special: /[^a-zA-Z0-9]/.test(newPassword)
//   };

//   const passwordsMatch = confirmPassword && newPassword === confirmPassword;
//   // const passwordsDontMatch = confirmPassword && newPassword !== confirmPassword;

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (newPassword !== confirmPassword) {
//       setError("New passwords don't match!");
//       return;
//     }

//     if (!requirements.length || !requirements.uppercase || !requirements.lowercase || !requirements.number) {
//       setError("Please meet all password requirements");
//       return;
//     }

//     if (currentPassword === newPassword) {
//       setError("New password must be different from current password");
//       return;
//     }

//     setIsLoading(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       console.log("Change password:", { currentPassword, newPassword });
//       setSuccess("Password changed successfully!");
//       setCurrentPassword("");
//       setNewPassword("");
//       setConfirmPassword("");
//       setIsLoading(false);
//       // Add your change password logic here
//     }, 1000);
//   };

//   return (
//     <div className="change-password-container">
//       <div className="change-password-form">
//         <h1 className="change-password-title">Change Password</h1>
        
//         {error && (
//           <div className="change-password-error-message">{error}</div>
//         )}

//         {success && (
//           <div className="change-password-success-message">{success}</div>
//         )}
        
//         <form onSubmit={handleChangePassword}>
//           <div className="change-password-form-group">
//             <label className="change-password-label">Current Password</label>
//             <div className="change-password-input-wrapper">
//               <input
//                 type={showCurrentPassword ? "text" : "password"}
//                 placeholder="Enter current password"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 className="change-password-input"
//                 disabled={isLoading}
//                 required
//               />
//               <button
//                 type="button"
//                 className="password-toggle-btn"
//                 onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                 disabled={isLoading}
//               >
//                 <span className="password-toggle-icon">
//                   {showCurrentPassword ? '👁️' : '👁️‍🗨️'}
//                 </span>
//               </button>
//             </div>
//           </div>

//           <div className="change-password-form-group">
//             <label className="change-password-label">New Password</label>
//             <div className="change-password-input-wrapper">
//               <input
//                 type={showNewPassword ? "text" : "password"}
//                 placeholder="Enter new password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="change-password-input"
//                 disabled={isLoading}
//                 required
//               />
//               <button
//                 type="button"
//                 className="password-toggle-btn"
//                 onClick={() => setShowNewPassword(!showNewPassword)}
//                 disabled={isLoading}
//               >
//                 <span className="password-toggle-icon">
//                   {showNewPassword ? '👁️' : '👁️‍🗨️'}
//                 </span>
//               </button>
//             </div>

//             {newPassword && (
//               <div className="password-requirements-box">
//                 <div className="password-requirements-title">Password must contain:</div>
//                 <div className={`password-requirement-item ${requirements.length ? 'met' : ''}`}>
//                   <span className={`requirement-bullet ${requirements.length ? 'met' : 'unmet'}`}></span>
//                   At least 8 characters
//                 </div>
//                 <div className={`password-requirement-item ${requirements.uppercase ? 'met' : ''}`}>
//                   <span className={`requirement-bullet ${requirements.uppercase ? 'met' : 'unmet'}`}></span>
//                   One uppercase letter
//                 </div>
//                 <div className={`password-requirement-item ${requirements.lowercase ? 'met' : ''}`}>
//                   <span className={`requirement-bullet ${requirements.lowercase ? 'met' : 'unmet'}`}></span>
//                   One lowercase letter
//                 </div>
//                 <div className={`password-requirement-item ${requirements.number ? 'met' : ''}`}>
//                   <span className={`requirement-bullet ${requirements.number ? 'met' : 'unmet'}`}></span>
//                   One number
//                 </div>
//                 <div className={`password-requirement-item ${requirements.special ? 'met' : ''}`}>
//                   <span className={`requirement-bullet ${requirements.special ? 'met' : 'unmet'}`}></span>
//                   One special character (recommended)
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="change-password-form-group">
//             <label className="change-password-label">Confirm New Password</label>
//             <div className="change-password-input-wrapper">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm new password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="change-password-input"
//                 disabled={isLoading}
//                 required
//               />
//               <button
//                 type="button"
//                 className="password-toggle-btn"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 disabled={isLoading}
//               >
//                 <span className="password-toggle-icon">
//                   {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
//                 </span>
//               </button>
//             </div>

//             {confirmPassword && (
//               <div className={`password-match-indicator ${passwordsMatch ? 'success' : 'error'}`}>
//                 <span className={`match-icon ${passwordsMatch ? 'success' : 'error'}`}></span>
//                 {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
//               </div>
//             )}
//           </div>

//           <div className="security-tips">
//             <div className="security-tips-title">💡 Security Tips:</div>
//             Use a unique password that you don't use on other websites
//           </div>

//           <div className="change-password-button-group">
//             <button
//               type="submit"
//               className="change-password-btn change-password-btn-primary"
//               disabled={isLoading}
//             >
//               {isLoading && <span className="change-password-spinner"></span>}
//               Update Password
//             </button>

//             <button
//               type="button"
//               onClick={() => setCurrentPage("login")}
//               className="change-password-btn change-password-btn-secondary"
//               disabled={isLoading}
//             >
//               Back to Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;



import React, { useState } from "react";
import './ChangePassword.css';

const ChangePassword = ({ setCurrentPage }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Password requirements check
  const requirements = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /\d/.test(newPassword),
    special: /[^a-zA-Z0-9]/.test(newPassword)
  };

  const passwordsMatch = confirmPassword && newPassword === confirmPassword;
  // const passwordsDontMatch = confirmPassword && newPassword !== confirmPassword;

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match!");
      return;
    }

    if (!requirements.length || !requirements.uppercase || !requirements.lowercase || !requirements.number) {
      setError("Please meet all password requirements");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Change password:", { currentPassword, newPassword });
      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsLoading(false);
      // Add your change password logic here
    }, 1000);
  };

  return (
    <div className="change-password-container">
      <div className="change-password-form">
        <h1 className="change-password-title">Change Password</h1>
        
        {error && (
          <div className="change-password-error-message">{error}</div>
        )}

        {success && (
          <div className="change-password-success-message">{success}</div>
        )}
        
        <form onSubmit={handleChangePassword}>
          <div className="change-password-form-group">
            <label className="change-password-label">Current Password</label>
            <div className="change-password-input-wrapper">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="change-password-input"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                disabled={isLoading}
              >
                <span className="password-toggle-icon">
                  {showCurrentPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </button>
            </div>
          </div>

          <div className="change-password-form-group">
            <label className="change-password-label">New Password</label>
            <div className="change-password-input-wrapper">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="change-password-input"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowNewPassword(!showNewPassword)}
                disabled={isLoading}
              >
                <span className="password-toggle-icon">
                  {showNewPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </button>
            </div>

            {newPassword && (
              <div className="password-requirements-box">
                <div className="password-requirements-title">Password must contain:</div>
                <div className={`password-requirement-item ${requirements.length ? 'met' : ''}`}>
                  <span className={`requirement-bullet ${requirements.length ? 'met' : 'unmet'}`}></span>
                  At least 8 characters
                </div>
                <div className={`password-requirement-item ${requirements.uppercase ? 'met' : ''}`}>
                  <span className={`requirement-bullet ${requirements.uppercase ? 'met' : 'unmet'}`}></span>
                  One uppercase letter
                </div>
                <div className={`password-requirement-item ${requirements.lowercase ? 'met' : ''}`}>
                  <span className={`requirement-bullet ${requirements.lowercase ? 'met' : 'unmet'}`}></span>
                  One lowercase letter
                </div>
                <div className={`password-requirement-item ${requirements.number ? 'met' : ''}`}>
                  <span className={`requirement-bullet ${requirements.number ? 'met' : 'unmet'}`}></span>
                  One number
                </div>
                <div className={`password-requirement-item ${requirements.special ? 'met' : ''}`}>
                  <span className={`requirement-bullet ${requirements.special ? 'met' : 'unmet'}`}></span>
                  One special character (recommended)
                </div>
              </div>
            )}
          </div>

          <div className="change-password-form-group">
            <label className="change-password-label">Confirm New Password</label>
            <div className="change-password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="change-password-input"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                <span className="password-toggle-icon">
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </button>
            </div>

            {confirmPassword && (
              <div className={`password-match-indicator ${passwordsMatch ? 'success' : 'error'}`}>
                <span className={`match-icon ${passwordsMatch ? 'success' : 'error'}`}></span>
                {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
              </div>
            )}
          </div>

          <div className="security-tips">
            <div className="security-tips-title">💡 Security Tips:</div>
            Use a unique password that you don't use on other websites
          </div>

          <div className="change-password-button-group">
            <button
              type="submit"
              className="change-password-btn change-password-btn-primary"
              disabled={isLoading}
            >
              {isLoading && <span className="change-password-spinner"></span>}
              Update Password
            </button>

            {/* <button
              type="button"
              onClick={() => setCurrentPage("login")}
              className="change-password-btn change-password-btn-secondary"
              disabled={isLoading}
            >
              Back to Login
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;