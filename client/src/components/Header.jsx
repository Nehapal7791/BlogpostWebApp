import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "../index.css";
import { API_URL } from "../api";

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(
    window.innerWidth > 800 ? true : false
  );
  const navigate = useNavigate();
  const [user, setUser] = useState(
    localStorage.getItem("firstname"),
    localStorage.getItem("id")
  );
  const [userId, setUserId] = useState(localStorage.getItem("id"));

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("firstname");
    localStorage.removeItem("id");
    setUser(null);
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/");
        console.log("Logged out successfully");
      } else {
        throw new Error("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
    closeNavHandler();
  };

  return (
    <nav>
      <div className="container nav_container">
        <Link to="/" className="nav_logo" onClick={closeNavHandler}>
          <img src={logo} alt="Navbar Logo" />
        </Link>
        {user ? (
          <ul className="nav_menu">
            <li>
              <Link to={`/profile/${userId}`} onClick={closeNavHandler}>
                {user}
              </Link>
            </li>
            <li>
              <Link to="/create" onClick={closeNavHandler}>
                Create Post
              </Link>
            </li>
            {/* <li>
              <Link to="/authors" onClick={closeNavHandler}>
                Authors
              </Link>
            </li> */}
            <li>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav_menu">
            <li>
              <Link to="/login" onClick={closeNavHandler}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={closeNavHandler}>
                Register
              </Link>
            </li>
          </ul>
        )}
        <button
          className="nav_toggle-btn"
          onClick={() => {
            setIsNavShowing(!isNavShowing);
          }}
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
