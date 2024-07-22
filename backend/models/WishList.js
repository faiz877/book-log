const mongoose = require("mongoose");

const wishlistItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter book title"],
      trim: true,
      maxlength: [100, "Book title cannot be more than 100 characters"],
    },
    author: {
      type: String,
      required: [true, "Please enter author name"],
      trim: true,
      maxlength: [50, "Author name cannot be more than 50 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WishlistItem", wishlistItemSchema);
