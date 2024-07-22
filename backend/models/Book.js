const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
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
  genre: {
    type: String,
    trim: true,
    maxlength: [30, "Genre cannot be more than 30 characters"],
  },
  dateRead: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot be more than 5"],
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, "Notes cannot be more than 500 characters"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);