const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Update user data ( passwoprd, username, Email, profile pic)
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
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

//Login User

module.exports = router;
