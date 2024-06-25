import express from "express";

import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();
// Register user
router.post("/register", async (req, res) => {
  try {
    // Added bcrypt library to hashing password and add salt in the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    // Calling user model
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    // Save the user data save() is come form the moongoose
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login User
router.post("/login", async (req, res) => {
  try {
    //username validation
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong Credentials");

    //Pasword validation
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated &&
      res.status(400).json("Wrong Credentilas -> password does not matched");

    //Exclude password field form list when user is  loggen in
    const { password, ...data } = user._doc;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
