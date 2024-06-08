import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: userData.firstname,
          lastname: userData.lastname,
          username: userData.username,
          email: userData.email,
          password: userData.password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const result = await response.json();
      console.log(result);
      localStorage.setItem("firstname", result.newUser.firstname);
      localStorage.setItem("id", result.newUser._id);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register_form" onSubmit={handleSubmit}>
          {error && <p className="form_error-message">{error}</p>}
          <div className="names">
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              value={userData.firstname}
              onChange={inputHandler}
              autoFocus
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={userData.lastname}
              onChange={inputHandler}
              autoFocus
            />
          </div>
          <input
            type="text"
            placeholder="UserName"
            name="username"
            value={userData.username}
            onChange={inputHandler}
            autoFocus
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={inputHandler}
            autoFocus
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={inputHandler}
            autoFocus
          />
          <input
            type="text"
            placeholder="Confirm password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={inputHandler}
            autoFocus
          />
          <button type="submit" className="btn primary full-btn">
            register
          </button>
        </form>
        <small>
          Already have an account? <Link to={`/login`}>sign in</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
