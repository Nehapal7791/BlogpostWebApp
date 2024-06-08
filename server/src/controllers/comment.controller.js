import Comment from "../models/comments.schema.js";
import Blog from "../models/blog.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customeError.js";

// Create a new comment
export const createComment = asyncHandler(async (req, res) => {
  const { content, postId, parentId } = req.body;
  const author = req.user.id;

  if (!content || !postId) {
    throw new CustomError("Content and post ID are required", 400);
  }

  let comment;

  // Check if parentId exists
  if (parentId) {
    const parentComment = await Comment.findById(parentId);
    if (!parentComment) {
      throw new CustomError("Parent comment not found", 404);
    }

    // Add reply to parent comment
    parentComment.replies.push({
      message: content,
      userId: author,
    });

    // Save the parent comment
    await parentComment.save();

    // Return the parent comment as the response
    res.status(201).json({
      success: true,
      comment: parentComment,
    });
  } else {
    // Create a new comment if parentId does not exist
    comment = await Comment.create({
      content,
      author,
      post: postId,
      parent: parentId,
    });

    res.status(201).json({
      success: true,
      comment,
    });
  }
});

// Get comments for a blog post
export const getCommentsByBlog = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId, parent: null })
    .populate("author")
    .populate({
      path: "replies",
      populate: { path: "author" },
    });

  res.status(200).json({
    success: true,
    comments,
  });
});

// Delete a comment
export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (!comment) {
    throw new CustomError("Comment not found", 404);
  }

  if (comment.author.toString() !== req.user.id) {
    throw new CustomError("You are not authorized to delete this comment", 403);
  }

  await comment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
});
