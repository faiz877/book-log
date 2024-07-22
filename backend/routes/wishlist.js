const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const auth = require("../middleware/auth");

router.get("/", auth, wishlistController.getWishlistItems);
router.post("/", auth, wishlistController.addWishlistItem);
router.delete("/:id", auth, wishlistController.removeWishlistItem);

module.exports = router;
