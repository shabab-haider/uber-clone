const mongoose = require("mongoose");

const balckListedTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 86400, //24 hours in seconds
  },
});

const blackListedTokensmodel = mongoose.model(
  "blackListedTokens",
  balckListedTokenSchema
);
module.exports = blackListedTokensmodel;
