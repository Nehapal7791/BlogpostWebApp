import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import defaultimage from "../images/defaultimage.png";
import { API_URL } from "../api.js";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(null);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };
  useEffect(() => {
    // Fetch user details using the ID
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/user-by-id/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const userDetails = await response.json();
        console.log(userDetails);
        setFirstName(userDetails.user.firstname);
        setLastName(userDetails.user.lastname);
        setEmail(userDetails.user.email);
        setUserName(userDetails.user.username);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details. Please try again.");
      }
    };

    fetchUserDetails();
  }, [id]);

  // const handleAvatarChange = (e) => {
  //   setAvatar(e.target.files[0]);
  // };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      // Prepare updated profile
      const updatedProfile = {
        firstname,
        lastname,
        username,
        email,
        currentPassword,
        newPassword,
        confirmNewPassword,
      };

      const response = await fetch(`${API_URL}/auth/profile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      console.log("Profile updated successfully");
      navigate("/");
      setError("");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleUpdateAvatar = async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);

      const response = await fetch(`${API_URL}/auth/avatar`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update avatar");
      }
      setAvatar(null); // Clear avatar after successful update
      console.log("Avatar updated successfully");
    } catch (error) {
      console.error("Error updating avatar:", error);
      setError("Failed to update avatar. Please try again."); // Set error message
    }
  };

  return (
    <section className="profile">
      <div className="container profile_container">
        {/* <Link to={`/myposts/1`} className="btn">
          My Posts
        </Link> */}

        <div className="profile_details">
          <div className="avatar_wrapper">
            <div className="profile_avatar">
              {/* <img src={avatar ? URL.createObjectURL(avatar) : ""} alt="" />
               */}
              <img src={defaultimage} />
            </div>
            <form className="avatar_form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                className=""
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar" className="">
                <FaEdit />
              </label>
              <button
                className="profile_avatar-btn"
                onClick={handleUpdateAvatar}
              >
                <FaCheck />
              </button>
            </form>
          </div>
          <h1>{username}</h1>

          <form className="form profile_form" onSubmit={handleUpdateProfile}>
            {error && <p className="form_error-message">{error}</p>}
            <div className="names">
              <input
                type="text"
                placeholder="first name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="last name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button type="submit" className="btn primary full-btn">
              Update details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
