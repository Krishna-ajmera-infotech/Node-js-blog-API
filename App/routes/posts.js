const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// Create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update POst post data
router.put("/:id", async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        // Added this code to exclude password form the  list
      
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
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
