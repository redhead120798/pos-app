const User = require("../models/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const unique = await User.findOne({ email: email });
     if(unique){
         return res.status(403).json("Email was created");
     }
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json("Account created succesfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(403).json("Invalid password");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
