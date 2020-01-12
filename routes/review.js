const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../utils/auth");
const calculateScore = require("../utils/calculateScore");

// Save Score & Review

router.post("/html", auth.verifyAdminToken, async (req, res) => {
  let { score = 0, review = "", taskId = "" } = req.body.data;
  const updatedTask = {
    score: score,
    review: review
  };

  try {
    const newTask = await Task.findById(taskId);
    newTask.html = {
      ...newTask.html,
      ...updatedTask
    };
    await newTask.save();
    await calculateScore(newTask.user);
    res.status(200).json({ status: true });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, error: "Some Error Occurred" });
  }
});

router.post("/codewars", auth.verifyAdminToken, async (req, res) => {
  let { score = 0, taskId = "" } = req.body.data;
  const updatedTask = {
    score: score
  };
  try {
    const newTask = await Task.findById(taskId);
    newTask.codewars = {
      ...newTask.codewars,
      ...updatedTask
    };
    await newTask.save();
    await calculateScore(newTask.user);
    res.status(200).json({ status: true });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, error: "Some Error Occurred" });
  }
});

module.exports = router;
