require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const userRoute = require("./routes/userRoute");
const authenticateUser = require("./middleware/auth");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();

//middleware
app.use(express.json());
var cors = require("cors");
app.use(cors());

//routes
app.use("/api/v1/users", userRoute);

//error handler middleware
app.use(errorHandlerMiddleware);

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
