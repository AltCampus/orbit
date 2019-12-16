const express = require("express");
const https = require("https");
const router = express.Router();

const Task = require("../models/Task");
const User = require("../models/User");
const auth = require("../utils/auth");

// Save Task One URL

router.post("/one/save", auth.verifyToken, async (req, res) => {
  let { url = "" } = req.body;
  let { id } = req.user;
  const updatedTask = {
    taskUrl: url,
    submitTime: Date.now()
  };
  if (req.user.stage !== 1) {
    // Check if user already is on stage 1
    return res.status(400).json({
      status: false,
      error: "You've already send your HTML assignment link"
    });
  }
  if (url.indexOf("https://codesandbox.io/s") !== 0) {
    return res
      .status(400)
      .json({ status: false, error: "Invalid Sandbox Url" });
  }
  try {
    // Update task with submission time and sandbox url
    const newTask = await Task.findById(req.user.task);
    newTask.html = {
      ...newTask.html,
      ...updatedTask
    };
    await newTask.save();

    // Update user stage to 2
    await User.findByIdAndUpdate(req.user.id, { stage: 2 });
    return res.status(201).json({ status: true, success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: "Some Error Occured" });
  }
});

// Check status of codewars task
router.get("/two/status", auth.verifyToken, async (req, res) => {
  let { id } = req.user;
  // send request to codewars api to validate username
  if (req.user.stage > 2) {
    // Check if user is not on stage 2
    return res
      .status(200)
      .json({ onGoing: false, completed: true, timeLeft: null });
  }
  const task = await Task.findById(req.user.task);

  console.log(req.user, task);
  if (req.user.stage === 2 && task.codewars.endTime > Date.now()) {
    return res.status(200).json({
      onGoing: true,
      completed: false,
      timeLeft: task.codewars.endTime - Date.now()
    });
  }

  if (req.user.stage === 2 && task.codewars.endTime < Date.now()) {
    // Update user stage to 3
    await User.findByIdAndUpdate(req.user.id, { stage: 3 });
    return res
      .status(200)
      .json({
        stageUpdated: true,
        onGoing: false,
        timeLeft: null,
        completed: true
      });
  }
  res.json({error: "Some error occured."})
});

// Save CodeWars username

router.post("/two/save", auth.verifyToken, (req, res) => {
  let { username = "" } = req.body;
  let { id } = req.user;
  // send request to codewars api to validate username
  if (req.user.stage !== 2) {
    // Check if user already is on stage 2
    return res.status(400).json({
      status: false,
      error: "You've already send your codewars username."
    });
  }
  https
    .get(
      `https://www.codewars.com/api/v1/users/${username}`,
      async apiResponse => {
        console.log(apiResponse.statusCode);
        if (apiResponse.statusCode === 200) {
          // Username is valid
          // const endTime = new Date(Date.now() + 259200 * 1000)
          const endTime = new Date(Date.now() + 30000)
          console.log(endTime)
          const codewarsTask = {
            codewarsUsername: username,
            startTime: Date.now(),
            endTime,
            timeLimit: 259200
          };

          try {
            // Update task with start time and username
            const newTask = await Task.findById(req.user.task);
            newTask.codewars = {
              ...codewarsTask
            };
            await newTask.save();

            return res.status(201).json({ status: true, success: true });
          } catch (error) {
            console.log(error);
            return res
              .status(400)
              .json({ status: false, error: "Some Error Occured" });
          }
        } else {
          // Username is invalid
          console.log("invalid");
          return res
            .status(400)
            .json({ status: false, error: "Invalid Codewars Username" });
        }
      }
    )
    .on("error", e => {
      console.error(e);
      return res
        .status(400)
        .json({ status: false, error: "Some Error Occured" });
    });
});

module.exports = router;
