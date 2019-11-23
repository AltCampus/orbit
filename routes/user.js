const express = require("express");
const router = express.Router();
const User = require("../models/User");

// on first login reset Password
router.post("/:hashMail", async (req, res) => {
  let { password } = req.body;
  let { hashMail } = req.params;
  if (hashMail) {
    try {
      const user = await User.findOne({ hashMail });
      user.password = password;
      user.hashMail = null;
      const updatedUser = await user.save();
      res.status(201).json({ status: true, user: updatedUser });
    } catch (err) {
      res.status(301).json({ success: false, err });
    }
  } else {
    res
      .status(301)
      .json({ success: false, message: "User already Claimed there account" });
  }
});

module.exports = router;
