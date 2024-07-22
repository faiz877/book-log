const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    // Check if user already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    // Create new user
    const user = new User({ name, email, username, password });
    await user.save();

    const token = user.createJWT();
    res
      .status(201)
      .json({ user: { name: user.name, username: user.username }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = user.createJWT();
    res.json({ user: { name: user.name, username: user.username }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
