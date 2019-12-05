const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../utils/auth");

// Save Task One URL

router.post("/one/save", auth.verifyToken, async (req, res) => {
  console.log(req.body);
  let { url } = req.body;
  let id = req.user.id;
  const task = {
    taskUrl: url,
    userId: id,
    submitTime: Date.now()
  };
  try {
    console.log(task, "!!!!");
    const createTask = await Task.create({ html: task });
    res.json({ status: true, createTask });
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
});

// Save CodeWars username

router.post("/two/save", auth.verifyToken, async (req, res) => {
  let { username } = req.body;
  let id = req.user.id;
  const taskTwo = {
    codewarsUsername: username,
    userId: id,
    submitTime: Date.now()
  };
  try {
    const saveUsername = await Task.create({ codewars: taskTwo });
    res.status(200).json({ status: true, saveUsername });
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
});

module.exports = router;
