const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPostsByUser,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
} = require("../controllers/postController");

// Public routes
router.get("/", getAllPosts);
router.get("/:username", getPostsByUser);

// Protected routes
router.post("/new", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

// Like/Unlike routes
router.put("/:id/like", likePost);
router.put("/:id/unlike", unlikePost);

// Comment routes
router.post("/:id/comment", addComment);
router.delete("/:id/comment/:commentId", deleteComment);

module.exports = router;
