require("dotenv").config();
const jwt = require("jsonwebtoken");
const UnauthenticatedError = require("../errors/unauthenticated");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //check header
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  //get token
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = authMiddleware;
