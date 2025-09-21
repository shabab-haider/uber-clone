const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blackListedTokensmodel = require("../models/blackListedToken.model");

module.exports.userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const blackListed = await blackListedTokensmodel.findOne({ token: token });
    if (blackListed) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: decode });
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
