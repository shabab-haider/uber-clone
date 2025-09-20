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
    res.status(200).json({ token: token, user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
