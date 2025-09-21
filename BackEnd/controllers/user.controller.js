const blackListedTokensmodel = require("../models/blackListedToken.model");
const userModel = require("../models/user.model");
const userService = require("../Services/user.service");
const { validationResult } = require("express-validator");

module.exports.userRegistration = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { fullname, email, password } = req.body;
    const user = await userService.createUser({ fullname, email, password });
    const token = user.genrateAuthToken();
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "invalid username or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "invalid username or password" });
    }
    const token = user.genrateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.userProfile = async (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blackListedTokensmodel.create({ token });
    res.status(200).json({ message: "Logged out sucessfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
