

import React, { useState } from "react";
import './ChangePassword.css';
import { changePassword } from "../../services/loginAPIs";

const ChangePassword = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
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

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!requirements.length || !requirements.uppercase || !requirements.lowercase || !requirements.number) {
      setError("Please meet all password requirements");
      return;
    }

    if (oldPassword === newPassword) {
      setError("New password must be different from old password");
      return;
    }

    setIsLoading(true);

     try {
      // 🔥 Real API call
      const response = await changePassword(email, oldPassword, newPassword);
      console.log("Password change response:", response);

      setSuccess(response.message || "Password changed successfully!");
      setEmail("");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error("Change password error:", err);
      setError(err.message || "Failed to change password. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };
    
    // Simulate API call
  //   setTimeout(() => {
  //     console.log("Change password:", { email, oldPassword, newPassword });
  //     setSuccess("Password changed successfully!");
  //     setEmail("");
  //     setOldPassword("");
  //     setNewPassword("");
  //     setIsLoading(false);
  //     // Add your change password logic here
  //   }, 1000);
  // };

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
            <label className="change-password-label">email</label>
            <input
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="change-password-input"
              disabled={isLoading}
              required
            />
          </div>

          <div className="change-password-form-group">
            <label className="change-password-label">oldPassword</label>
            <div className="change-password-input-wrapper">
              <input
                type={showOldPassword ? "text" : "password"}
                placeholder="enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="change-password-input"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowOldPassword(!showOldPassword)}
                disabled={isLoading}
              >
                <span className="password-toggle-icon">
                  {showOldPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </button>
            </div>
          </div>

          <div className="change-password-form-group">
            <label className="change-password-label">newPassword</label>
            <div className="change-password-input-wrapper">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="enter new password"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;