import {jwtDecode} from "jwt-decode";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
      console.log(token)
      Cookies.set("jwtToken", token,{ expires: 7 });

      // Decode token to extract role
      const decoded = jwtDecode(token);
      let role = decoded.role?.toLowerCase(); // "admin" / "user" / "agent"
      if (role === "support_agent") role = "agent";

      localStorage.setItem("role", role);

      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "user":
          navigate("/user");
          break;
        case "agent":
          navigate("/agent");
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

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setIsLoading(true);

  //   try {
  //     const data = await loginUser(email, password);

  //     // ✅ Save token to localStorage
  //     localStorage.setItem("token", data.token);
  //     localStorage.setItem("role", data.role);

  //     console.log("Login successful:", data);

  //     switch (data.role) {
  //       case "admin":
  //         navigate("/admin");
  //         break;
  //       case "user":
  //         navigate("/user");
  //         break;
  //       case "agent":
  //         navigate("/agent");
  //         break;
  //       default:
  //         setError("Invalid role");
  //     }
  //     // Redirect or update page
  //     // Example: setCurrentPage("dashboard");
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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

// const Login = () => {

//      const [role, setRole] = useState(""); // state to track dropdown value
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (role === "user") {
//       navigate("/user");
//     } else if (role === "support") {
//       navigate("/support");
//     } else if (role === "/admin") {
//       navigate("../Dashboard/Dashboard.jsx");}
//     // } else {
//     //   alert("Please select a role before logging in!");
//     // }
//   };

//   return (
//     <div>
//       <Nav />
//       <h1 className="head">Let's get Connected!</h1>
//       <div className="Loginform">
//         <h1>Login</h1>
//         <form action="#" className="formm">
//           <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)} required>
//             <option >Select A Role</option>
//             <option >Login As User</option>
//             <option >Login As Support</option>
//             <option >Login As Admin</option>
//           </select>
//           <input type="text" placeholder="Enter Your UserName" />
//           <input type="password" placeholder="Enter Your Password" required />
//         </form>

//         <div className="rm">
//           <input type="checkbox" />
//           <label htmlFor="">Remember me</label>
//           {/* <a href="">Forgot Password?</a> */}
//           <Link to="/forgot">Forgot Password?</Link>
//         </div>
//         <button onClick={handleLogin}>Login</button>
//         <div className="ca">
//           <p>Don't have an Account?</p>
//           {/* <a href="">Create Account</a> */}
//           <Link to="/CreateAcc">Create Account</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
