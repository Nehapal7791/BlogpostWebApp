import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const inputHandler = (e) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const result = await response.json();
      console.log(result);
      localStorage.setItem("firstname", result.newUser.firstname);
      localStorage.setItem("id", result.newUser._id);
      navigate("/");
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2>Login</h2>
        <form className="form login_form" onSubmit={handleSubmit}>
          {error && <p className="form_error-message">{error}</p>}

          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={inputHandler}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={inputHandler}
            autoFocus
          />

          <button type="submit" className="btn primary full-btn">
            Login
          </button>
        </form>
        <small>
          Don't have an account? <Link to={`/register`}>sign up</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
