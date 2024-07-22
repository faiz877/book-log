const WishlistItem = require("../models/WishList");

exports.getWishlistItems = async (req, res) => {
  try {
    const wishlistItems = await WishlistItem.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });
    res.json(wishlistItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.addWishlistItem = async (req, res) => {
  try {
    const { title, author } = req.body;
    const newWishlistItem = new WishlistItem({
      title,
      author,
      user: req.user.userId,
    });
    const wishlistItem = await newWishlistItem.save();
    res.status(201).json(wishlistItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.removeWishlistItem = async (req, res) => {
  try {
    const wishlistItem = await WishlistItem.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!wishlistItem) {
      return res.status(404).json({ msg: "Wishlist item not found" });
    }
    res.json({ msg: "Wishlist item removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
