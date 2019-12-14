var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Task = require("../models/Task");
const auth = require("../utils/auth");


/* GET Task Progress */
router.get("/task/:id", auth.verifyToken, async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId)
    res.status(200).json({ task, status: true });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", status: false });
  }
});

/* GET User Progress */
router.get("/:id", auth.verifyAdminToken, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).select("-password, -hashMail");
    res.status(200).json({ user, status: true });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", status: false });
  }
});

module.exports = router;
