import React, { useState, useEffect } from "react";
import PostItem from "../Pages/PostItem";
import { useParams } from "react-router-dom";
import { API_URL } from "../api";

const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const author = id;

  useEffect(() => {
    const fetchAuthorPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/author/${author}`);

        if (response.ok) {
          const data = await response.json();
          setPosts(data.blogs);
        } else {
          throw new Error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAuthorPosts();
  }, [author]);

  return (
    <section className="author_posts">
      {posts.length > 0 ? (
        <div className="container author-post_container">
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
        <h2 className="center">No posts found for this author!</h2>
      )}
    </section>
  );
};

export default AuthorPosts;
