import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { POST_CATEGORIES } from "../data";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { API_URL } from "../api";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", description);
    formData.append("author", userId);
    if (thumbnail) {
      formData.append("image", thumbnail);
    }
    console.log("category", category);

    try {
      const response = await fetch(`${API_URL}/blogs/new-blog`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create blog post");
      }

      const result = await response.json();
      console.log(result);

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Blog</h2>
        {error && <p className="form_error-message">{error}</p>}
        <form className="form create-post_form" onSubmit={handleSubmit}>
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
            onChange={setDescription}
            className="q1-editor"
          />
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="image/png, image/jpg, image/jpeg"
          />
          <button type="submit" className="btn primary">
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
