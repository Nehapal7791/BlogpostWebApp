import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import { IMAGE_URL } from "../api";

const PostItem = ({ id, thumbnail, category, title, desc, authorID }) => {
  const shortDesc = desc.length > 145 ? desc.substr(0, 145) + "..." : desc;
  const postTitle = title.length > 30 ? title.substr(0.3) + "..." : title;
  const trimmedPath = thumbnail.replace(/^uploads\\/, "");
  return (
    <article className="post">
      <div className="post_thumbnail">
        <img src={`${IMAGE_URL}/${trimmedPath}`} alt={title} />
      </div>
      <div className="post_content">
        <Link to={`/posts/${id}`}>
          <h3>{postTitle}</h3>

          <p dangerouslySetInnerHTML={{ __html: shortDesc }}></p>
        </Link>
        <div className="post_footer">
          <PostAuthor postUserId={authorID} />
          <Link to={`/posts/categories/${category}`} className="btn category">
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
