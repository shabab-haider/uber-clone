const userModel = require("../models/user.model");

module.exports.createUser = async function ({ fullname, email, password }) {
  try {
    if (!fullname.firstname || !email || !password) {
      throw new Error("All fields are required!!");
    }
    const hash = await userModel.hashPassword(password);

    const user = await userModel.create({
      fullname,
      email,
      password: hash,
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
