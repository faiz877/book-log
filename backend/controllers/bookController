const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.userId }).sort({
      dateRead: -1,
    });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, dateRead, rating, notes } = req.body;
    const newBook = new Book({
      title,
      author,
      genre,
      dateRead,
      rating,
      notes,
      user: req.user.userId,
    });
    const book = await newBook.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, genre, dateRead, rating, notes } = req.body;
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { title, author, genre, dateRead, rating, notes },
      { new: true, runValidators: true }
    );
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json({ msg: "Book removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
