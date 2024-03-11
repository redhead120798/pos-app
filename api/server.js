const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

PORT = 5000;
dotenv.config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MDB");
  } catch (error) {
    throw error;
  }
};

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
 connection()
});
