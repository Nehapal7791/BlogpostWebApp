import React, { useState, useEffect } from "react";
import PostItem from "../Pages/PostItem";
import { API_URL } from "../api";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/all-blogs`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data.blogs);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <h2 className="center">Loading...</h2>;
  }

  if (error) {
    return <h2 className="center">{error}</h2>;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container post_container">
          {posts.map(({ _id, image, category, title, content, author }) => (
            <PostItem
              key={_id}
              id={_id}
              thumbnail={image}
              category={category}
              title={title}
              desc={content}
              authorID={author}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No posts found!</h2>
      )}
    </section>
  );
};

export default Posts;
