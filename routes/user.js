var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Task = require("../models/Task")
const auth = require("../utils/auth");

/* GET User Progess */
router.get("/:id", async (req, res) => {
  const userId = req.params.id
  console.log(userId)
  try {
    const user = await User.findById(userId).select('-password, -hashMail');
    console.log(user)
    // const task = await Task.findById(user.task)
    res.status(200).json({ user, status: true });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", status: false });
  }
});

module.exports = router;
