const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectToDB = require("./config/db");
const userRoutes = require("./routes/user.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

module.exports = app;
