const Post = require("../models/Posts");
const User = require("../models/User");
const ErrorHandler = require("../middleware/error-handler");

//Create new Post
const createPost = async (req, res, next) => {
  try {
    const { caption, image } = req.body;
    const postedBy = req.user.userId;
    const post = new Post({ caption, image, postedBy });
    const savedPost = await post.save();
    console.log(req.user);
    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};

//Get all posts
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "username")
      .populate("comments.user", "username");
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

//get post by user
const getPostsByUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Find posts by the user's ID
    const posts = await Post.find({ postedBy: user._id })
      .populate("postedBy", "username") // Populate the 'postedBy' field with 'username'
      .populate("comments.user", "username"); // Populate the 'user' field inside 'comments'
    // Check if posts exist
    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }
    // Send the posts data as the response
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// Update Post
const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { caption, image } = req.body;
    const userId = req.user.userId;

    // Find the post by ID
    let post = await Post.findById(id);

    if (!post) {
      return next(new ErrorHandler("Post not found", 404));
    }

    // Check if the authenticated user is the owner of the post
    if (post.postedBy.toString() !== userId) {
      return next(new ErrorHandler("You can only update your own posts", 403));
    }

    // Update the post
    post.caption = caption || post.caption;
    post.image = image || post.image;

    const updatedPost = await post.save();

    res.status(200).json({
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

//delete post
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Find the post by ID
    let post = await Post.findById(id);

    if (!post) {
      return next(new ErrorHandler("Post not found", 404));
    }

    // Check if the authenticated user is the owner of the post
    if (post.postedBy.toString() !== userId) {
      return next(new ErrorHandler("You can only delete your own posts", 403));
    }

    // Delete the post
    await post.remove();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//like post
const likePost = async (req, res, next) => {
  try {
    //get the ID of the post
    const postId = req.params.id;
    //get the ID of the user liking the post
    const userId = req.user._id;
    //find the post from the DB
    const post = await Post.findById({ postId });
    if (!post) {
      throw new ErrorHandler("Post Not Found");
    }
    //check if user has already liked the post
    if (post.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    }
    //Add the user ID to the list of likes
    post.likes.push(userId);

    //Save the updated post back to the database
    await post.save();

    //Respond with a success message
    res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    next(error);
  }
};

//unlike post
const unlikePost = async (req, res, next) => {
  try {
    const { id } = req.params; // Post ID
    const userId = req.user.userId; // Authenticated User ID

    // Find the post by ID
    const post = await Post.findById(id);

    if (!post) {
      return next(new ErrorHandler("Post not found", 404));
    }

    // Check if the user has already liked the post
    const isLiked = post.likes.includes(userId);

    if (!isLiked) {
      return next(new ErrorHandler("You have not liked this post", 400));
    }

    // Remove the user ID from the likes array
    post.likes = post.likes.filter((like) => like.toString() !== userId);

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post unliked successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

//add comment
const addComment = async (req, res, next) => {};

//delete comment
const deleteComment = async (req, res, next) => {};

module.exports = {
  createPost,
  getAllPosts,
  getPostsByUser,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
};
