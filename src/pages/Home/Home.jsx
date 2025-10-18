import React from "react";
import "./Home.css";
import cs from "../../assets/images/cs2.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/Login");
  };

  return (
    <div className="Body">
      <div className="second">
        <img src={cs} alt="Customer Support" />
      </div>
      <div className="first">
        <h1>Welcome To Support Team</h1>
        <p>Let's Collaborate with Each Other and Solve Our Problems</p>
        <button onClick={goToLogin}>Login</button>
      </div>
    </div>
  );
};

export default Home;
