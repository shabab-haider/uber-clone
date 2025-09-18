const mongoose = require("mongoose");
const connectToDB = mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("✅ connected to DB sucessfully");
});

module.exports = connectToDB;
