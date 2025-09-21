const express = require("express");
const {
  userRegistration,
  userLogin,
} = require("../controllers/user.controller");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("The firstname must be 3 characters long"),
    body("fullname.lastname")
      .isLength({ min: 3 })
      .withMessage("The lastname must be 3 characters long"),
    body("email").isEmail().withMessage("email is not valid"),
  ],
  userRegistration
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({ min: 6 }).withMessage("invalid password"),
  ],
  userLogin
);

module.exports = router;
