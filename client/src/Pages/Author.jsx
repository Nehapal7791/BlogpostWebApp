import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authorData } from "../data";
import { API_URL } from "../api";

const Authors = () => {
  // const [authors, setAuthors] = useState(authorData);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/users`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAuthors(data.users);
        console.log(authors);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);
  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors_container">
          {authors.map(
            ({ _id, avatar, firstname, lastname, username, posts }) => {
              return (
                <Link to={`/posts/users/${_id}`} className="author" key={_id}>
                  <div className="author_avatar">
                    <img
                      src={
                        avatar ||
                        "../images/default-avatar-icon002_750950-52.avif"
                      }
                      alt={username}
                    />
                  </div>
                  <div className="author_info">
                    <h4>
                      {firstname}+{lastname}
                    </h4>
                    <p>{posts}</p>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      ) : (
        <div className="center">No Users/Authors found!</div>
      )}
    </section>
  );
};

export default Authors;
