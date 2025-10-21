import {jwtDecode} from "jwt-decode";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";
import { loginUser } from "../../services/loginAPIs";
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");





  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginUser(email, password);
      console.log("Login successful:", response);

      // response.data is your token
      const token = response.data;
      // console.log(token)
      Cookies.set("jwtToken", token,{ expires: 7 });

      // Decode token to extract role
      const decoded = jwtDecode(token);
      // console.log("Decoded Token:", decoded);


      let role = decoded.role?.toLowerCase(); // "admin" / "user" / "agent"
      if (role === "support_agent") role = "agent";

      
      localStorage.setItem("role", role);

      switch (role) {
        case "admin":
          navigate("/admin", { replace: true });
          break;
        case "user":
          navigate("/user" , { replace: true });
          break;
        case "agent":
          navigate("/agent", { replace: true });
          break;
        default:
          setError("Invalid role");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

 

  const goToRegister = () => navigate("/register");

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Login</h1>

        {error && <div className="login-error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="login-form-group">
            <label className="login-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              disabled={isLoading}
              required
            />
          </div>

          <div className="login-form-group">
            <label className="login-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              disabled={isLoading}
              required
            />
          </div>

          <div className="login-button-group">
            <button
              type="submit"
              className="login-btn login-btn-primary"
              disabled={isLoading}
            >
              {isLoading && <span className="login-spinner"></span>}
              Login
            </button>

            <button
              type="button"
              onClick={goToRegister}
              className="login-btn login-btn-secondary"
              disabled={isLoading}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
