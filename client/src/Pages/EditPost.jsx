import React, { useState, useEffect } from "react";
import { POST_CATEGORIES } from "../data";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../api";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        console.log(id);
        const response = await fetch(`${API_URL}/blogs/blog/${id}`);
        if (response.ok) {
          const postData = await response.json();
          const { title, category, content, image } = postData.blog;
          setTitle(title);
          setCategory(category);
          setDescription(content);
          setThumbnail(image); // Set to null initially
          console.log(postData);
        } else {
          throw new Error("Failed to fetch post details");
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
        setErrorMessage(
          "Failed to fetch post details. Please try again later."
        );
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("content", description);
      if (thumbnail) {
        formData.append("image", thumbnail);
      }

      const response = await fetch(`${API_URL}/blogs/blog/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      console.log(formData.get("title"));
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
      setErrorMessage("Failed to update post. Please try again later.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {errorMessage && <p className="form_error-message">{errorMessage}</p>}
        <form className="form create-post_form" onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription} // Correctly updating description state
            className="q1-editor"
          />
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="image/png, image/jpg, image/jpeg"
          />
          <button type="submit" className="btn primary" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
