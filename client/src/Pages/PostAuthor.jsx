import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../images/logo.png";
import { API_URL } from "../api";

const PostAuthor = ({ postUserId }) => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(
          `${API_URL}/auth/user-by-id/${postUserId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch author");
        }
        const data = await response.json();
        setAuthor(data.user);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [postUserId]);

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });
  };

  if (loading) return <p className="center">Loading author...</p>;
  if (error) return <p className="center">{error}</p>;

  return (
    <Link to={`/posts/users/${postUserId}`} className="post_author">
      <div className="post_author-avatar">
        <img
          src={author.avatar || Avatar}
          alt={author.name || "Author Avatar"}
        />
      </div>
      <div className="post_author-details">
        <h5>
          By: {author.firstname} {author.lastname}
        </h5>
        <small>{formatDate(author.createdAt)}</small>
      </div>
    </Link>
  );
};

export default PostAuthor;
