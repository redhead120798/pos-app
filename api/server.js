const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

PORT = 5000;

//routes

const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const billsRoute = require("./routes/bills.js");
const authRoute = require("./routes/auth.js");
const usersRoute = require("./routes/user.js");

dotenv.config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MDB");
  } catch (error) {
    throw error;
  }
};

app.use(express.json());
app.use(cors());
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", billsRoute);
app.use("/api", authRoute);
app.use("/api/users", usersRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  connection();
});
