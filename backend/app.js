require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/auth");
const authRouter = require("./routes/auth");
const booksRouter = require("./routes/books");
const wishlistRouter = require("./routes/wishlist");

// Import middleware
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", authenticateUser, booksRouter);
app.use("/api/v1/wishlist", authenticateUser, wishlistRouter);

// Error handling middleware
app.use(errorHandler);

// Catch-all route for undefined routes
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

//start the server
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB...");
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
