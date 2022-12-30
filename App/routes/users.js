const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Update user data ( passwoprd, username, Email, profile pic)
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      // Added this code to exclude password form the  list
      const { password, ...data } = updatedUser._doc;
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only you Account");
  }
});

//Delete User Account
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch {
      res.status(404).json("User not Found");
    }
  } else {
    res.status(401).json("You can Delete only your Account");
  }
});

// Get User details
router.get("/:id", async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    const { password, ...data } = result._doc;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
