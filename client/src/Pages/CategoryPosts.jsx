import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostItem from "../Pages/PostItem";
import { API_URL } from "../api";

const CategoryPosts = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/categories/${category}`);

        if (response.ok) {
          const { blogs } = await response.json();
          setPosts(blogs);
        } else {
          setPosts();
          throw new Error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPostsByCategory();
  }, [category, posts]);
  console.log(posts);

  return (
    <section className="category_posts">
      {posts ? (
        <div className="container category-post_container">
          {posts?.map(({ id, image, category, title, content, author }) => (
            <PostItem
              key={id}
              id={id}
              thumbnail={image}
              category={category}
              title={title}
              desc={content}
              authorID={author}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No posts found for category: {category}</h2>
      )}
    </section>
  );
};

export default CategoryPosts;
