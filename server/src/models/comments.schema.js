import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    post: {
      ref: "Blog",
      type: Schema.Types.ObjectId,
      required: true,
    },
    parent: {
      ref: "Comment",
      type: Schema.Types.ObjectId,
      default: null,
    },
    replies: [
      {
        message: {
          type: String,
          required: true,
        },
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
