const express = require("express");
const Router = express.Router();

const auth = require("./../utils/auth");
const Interview = require("../models/Interview");

Router.get("/", auth.verifyToken, async (req, res) => {
  const data = await Interview.find({ user: null });
  res.json({ data });
});

//Admin create Interview
Router.post("/", auth.verifyAdminToken, async (req, res) => {
  const { time, date } = req.body;
  try {
    if (!time || !date) {
      throw new Error("Time and date are must required.");
    } else {
      const interviewSchedule = await Interview.create({ time, date });
      res.status(201).json({
        sucess: true,
        message: "Interview created",
        interviewSchedule
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, error });
  }
});

Router.put("/:id", auth.verifyToken, async (req, res) => {
  try {
    console.log(req.params.id);
    const { id } = req.params.id;
    const ScheduledInterview = await Interview.findByIdAndUpdate(
      id,
      { user: req.user._id },
      { new: true }
    );
    res.status(201).json({
      status: true,
      message: "Interview Scheduled",
      ScheduledInterview
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, error });
  }
});

module.exports = Router;
