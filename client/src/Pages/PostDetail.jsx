import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../api";
import { API_URL } from "../api";

const PostDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/blog/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBlog(data.blog);
        } else {
          throw new Error("Failed to fetch blog");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`${API_URL}/comments/${id}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data.comments);
        } else {
          throw new Error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchBlog();
    fetchComments();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/blogs/blog/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/");
      } else {
        throw new Error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");

    if (!userId) {
      alert("You need to be logged in to comment");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/comments/create-comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          content: newComment,
          postId: id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments([...comments, data.comment]);
        setNewComment("");
      } else {
        throw new Error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const trimmedPath = blog?.image?.replace(/^uploads\\/, "");

  return (
    <section className="post-detail">
      <div className="container post-detail_container">
        {blog ? (
          <>
            <div className="post-detail_header">
              <PostAuthor postUserId={blog.author} />
              {userId === blog.author && (
                <div className="post-detail_buttons">
                  <Link to={`/posts/${id}/edit`} className="btn sm primary">
                    Edit
                  </Link>
                  <button onClick={handleDelete} className="btn sm danger">
                    Delete
                  </button>
                </div>
              )}
            </div>
            <h1>{blog.title}</h1>
            <div className="post-detail_thumbnail">
              <img src={`${IMAGE_URL}/${trimmedPath}`} alt="" />
            </div>
            <p dangerouslySetInnerHTML={{ __html: blog.content }}></p>
            <div className="comments_section">
              <h2>Comments</h2>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="comment">
                    <h5>
                      {comment.author.firstname} {comment.author.lastname}
                    </h5>
                    <p>{comment.content}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment"
                  required
                ></textarea>
                <button type="submit" className="btn primary">
                  Add Comment
                </button>
              </form>
            </div>
          </>
        ) : (
          <p className="center">Loading...</p>
        )}
      </div>
    </section>
  );
};

export default PostDetail;
