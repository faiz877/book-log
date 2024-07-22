const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/customError");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };
  // Handle specific error types
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  //Conflict/Duplicate value Errors
  else if (err.code === 11000) {
    customError.statusCode = StatusCodes.CONFLICT;
    customError.msg = "User already exists";
  }
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
