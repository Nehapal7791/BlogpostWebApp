import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DUMMY_POSTS } from "../data";

const Dashboard = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  return (
    <section className="dashboard">
      <div>
        {posts.length ? (
          <div className="container dashboard_container">
            {posts.map((post) => {
              return (
                <article key={post.id} className="dashboard_post">
                  <div className="dashboard_post-info">
                    <div className="dashboard_post-thumbnail">
                      <img src={post.thumbnail} alt="image" />
                    </div>
                    <h5>{post.title}</h5>
                  </div>
                  <div className="dashboard_post-actions">
                    <Link className="btn sm" to={`/posts/${post.id}`}>
                      View
                    </Link>
                    <Link
                      className="btn sm primary"
                      to={`/posts/${post.id}/edit`}
                    >
                      Edit
                    </Link>
                    <Link
                      className="btn sm danger"
                      to={`/posts/${post.id}/delete`}
                    >
                      Delete
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="center">You have no posts yet..</div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
