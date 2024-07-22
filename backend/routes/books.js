const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const auth = require("../middleware/auth");

router.get("/", auth, bookController.getBooks);
router.get("/:id", auth, bookController.getBook);
router.post("/", auth, bookController.addBook);
router.put("/:id", auth, bookController.updateBook);
router.delete("/:id", auth, bookController.deleteBook);

module.exports = router;
