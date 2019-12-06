var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Task = require("../models/Task")
const auth = require("../utils/auth");

/* GET User */
router.get("/profile", auth.verifyToken, async (req, res) => {
  const userId = req.user.id
  console.log(userId)
  try {
    const user = await User.findById(userId);
    const task = await Task.findById(user.task)
    console.log(task)
    res.status(200).json({ task, status: true });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", status: false });
  }
});

module.exports = router;
