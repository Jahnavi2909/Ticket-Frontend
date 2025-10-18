

import React, { useState } from "react";
import "./CreateAcc.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/loginAPIs" // ✅ API integration added

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);
    try {
      const data = await registerUser(name, email, password);
      console.log("Registration successful:", data);
      setSuccess("Registration successful!");
      setError("");
      
      // ✅ Redirect to Login page after success
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.message || "Failed to register. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => navigate("/login");

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">Register</h1>

        {error && <div className="register-error-message">{error}</div>}
        {success && <div className="register-success-message">{success}</div>}

        <form onSubmit={handleRegister}>
          {/* ✅ Name field */}
          <div className="register-form-group">
            <label className="register-label">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="register-input"
              disabled={isLoading}
              required
            />
          </div>

          <div className="register-form-group">
            <label className="register-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
              disabled={isLoading}
              required
            />
          </div>

          <div className="register-form-group">
            <label className="register-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
              disabled={isLoading}
              required
            />
          </div>

          <div className="register-form-group">
            <label className="register-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="register-input"
              disabled={isLoading}
              required
            />
          </div>

          <div className="register-terms">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              disabled={isLoading}
            />
            <label htmlFor="terms">
              I agree to the <a href="#terms">Terms and Conditions</a>
            </label>
          </div>

          <div className="register-button-group">
            <button
              type="submit"
              className="register-btn register-btn-primary"
              disabled={isLoading}
            >
              {isLoading && <span className="register-spinner"></span>}
              Register
            </button>

            <button
              type="button"
              onClick={goToLogin}
              className="register-btn register-btn-secondary"
              disabled={isLoading}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;


