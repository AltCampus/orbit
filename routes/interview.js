const express = require("express");
const Router = express.Router();

const auth = require("./../utils/auth");
const user = require("./../models/User");
const Interview = require("../models/Interview");

Router.get("/", auth.verifyToken, async (req, res) => {
  const data = await Interview.find({
    user: null,
    date: { $gt: Date.now() }
  });
  res.json({ data });
});

//Admin create Interview
Router.post("/", auth.verifyAdminToken, async (req, res) => {
  const { date, startTime, endTime } = req.body;
  try {
    if (!date || !startTime || !endTime) {
      res
        .status(401)
        .json({ status: false, message: "Time and date are must required." });
    } else {
      const interviewSchedule = await Interview.create({ dateAndTime });
      res.status(201).json({
        sucess: true,
        message: "Interview created"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, error });
  }
});

Router.put("/:id", auth.verifyToken, async (req, res) => {
  try {
    const { id } = req.params.id;
    const ScheduledInterview = await Interview.findByIdAndUpdate(
      id,
      { user: req.user._id },
      { new: true }
    );
    await user.findOneAndUpdate(
      { _id: req.user._id },
      { interview: ScheduledInterview._id }
    );
    res.status(201).json({
      status: true,
      message: "Interview Scheduled"
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, error });
  }
});

module.exports = Router;
