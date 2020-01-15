const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../utils/auth");
const calculateScore = require("../utils/calculateScore");
const Timeline = require("../models/Timeline");
const timelineCreator = require("../utils/timelineCreator");

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
    await Timeline.create({
      user: newTask.user,
      ...timelineCreator("TASK_ONE_REVIEWED", {
        adminName: req.user.name,
        point: score,
        csbLink: newTask.html.taskUrl
      })
    });
    res
      .status(200)
      .json({ status: true, message: "Your review has been updated!" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, error: "Something went wrong!" });
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
    await Timeline.create({
      user: newTask.user,
      ...timelineCreator("TASK_TWO_REVIEWED", {
        adminName: req.user.name,
        point: score,
        codewarsUsername: newTask.codewars.codewarsUsername
      })
    });
    res
      .status(200)
      .json({ status: true, message: "Your review has been updated!" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, error: "Something went wrong!" });
  }
});

module.exports = router;
