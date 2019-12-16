const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../utils/auth");

// Save Score & Review

router.post("/html", auth.verifyAdminToken, async (req, res) => {
  console.log("SAVE REVIEW")
  let { score = 0, review = "", taskId = "" } = req.body.data;
  const updatedTask = {
    score: score,
    review: review
  };
//   if (user.task.score) {
//     // Check if user assignment has already been review
//     return res.status(400).json({
//       status: false,
//       error: "You've already reviewed this assignment"
//     });
//   }
  try {
    // Update task with score and review
    console.log(taskId, "TaskID is Here")
    console.log(req.body, "body is Here")
    const newTask = await Task.findById(taskId);
    newTask.html = {
      ...newTask.html,
      ...updatedTask
    };
    await newTask.save();
    res.status(200).json({status: true})
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: "Some Error Occurred" });
  }
});

module.exports = router;
