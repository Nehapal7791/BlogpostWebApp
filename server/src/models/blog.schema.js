import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: [50, "Title should not exceed 50 characters"],
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      ref: "user",
      type: Schema.Types.ObjectId,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
    },
    comments: [
      {
        ref: "Comment",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
