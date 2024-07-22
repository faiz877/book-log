const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/customError");
const User = require("../models/User");

const signUp = async (req, res, next) => {
  const { name, email, username, password } = req.body;
  try {
    //create new user
    const newUser = await User.create({
      name,
      email,
      username,
      password,
    });
    //generate token
    const token = newUser.createJWT();
    //send response
    res
      .status(StatusCodes.CREATED)
      .json({ user: { name: newUser.name }, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new CustomError(
        "Enter Username or Password",
        StatusCodes.BAD_REQUEST
      );
    }
    //check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      throw new CustomError("Invalid user", StatusCodes.UNAUTHORIZED);
    }
    //check password
    const checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
      throw new CustomError("Invalid password", StatusCodes.UNAUTHORIZED);
    }
    //create token
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.username }, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, signUp };
