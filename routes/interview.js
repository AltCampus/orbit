const express = require("express");
const Router = express.Router();

const Interview = require("../models/Interview");
const User = require("../models/User");

// get data from calendly
Router.post("/", async (req, res) => {
  try {
    const { uuid, start_time, end_time } = req.body.event;
    const scheduleEvent = { uuid, start_time, end_time };
    const { email } = req.body.invitee;
    const user = await User.findOne({ email });
    if (user.canScheduleInterview) {
      const interview = await Interview.create({
        user: user._id,
        scheduleEvent
      });
      user.interview = interview.id;
      await user.save();
    }
    res.end();
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "error in Interview Schedule Interview"
    });
  }
});

module.exports = Router;
