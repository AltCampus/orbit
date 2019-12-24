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

// Admin list all slot
Router.get("/all", auth.verifyAdminToken, async (req, res) => {
  try {
    const slots = await Interview.find({});
    return res.status(200).json({ status: true, slots });
  } catch (error) {
    return res.status(400).json({ status: "failed", error });
  }
});

Router.get("/scheduled", auth.verifyAdminToken, async (req, res) => {
  try {
    const scheduledInterviews = await Interview.find({
      user: { $ne: null }
    }).populate("user");
    return res.status(200).json({ status: true, scheduledInterviews });
  } catch (error) {
    return res.status(400).json({ status: "failed", error });
  }
});

//Admin create Interview
Router.post("/", auth.verifyAdminToken, async (req, res) => {
  let { date, startTime, endTime } = req.body;
  try {
    if (!date || !startTime || !endTime) {
      return res
        .status(401)
        .json({ status: false, message: "Time and date are must required." });
    }
    // const interviewSchedule = await Interview.create({ dateAndTime });
    const dateOfSlot = new Date(date);
    const startTimeOfSlot = new Date(startTime);
    const endTimeOfSlot = new Date(endTime);
    // Update start time and end time with the selected date
    startTime = new Date(
      dateOfSlot.getFullYear(),
      dateOfSlot.getMonth(),
      dateOfSlot.getDate(),
      startTimeOfSlot.getHours(),
      startTimeOfSlot.getMinutes(),
      0
    );
    endTime = new Date(
      dateOfSlot.getFullYear(),
      dateOfSlot.getMonth(),
      dateOfSlot.getDate(),
      endTimeOfSlot.getHours(),
      endTimeOfSlot.getMinutes(),
      0
    );

    const timeSlotDuration = 1200;
    const possibleSlot = parseInt(
      (endTime - startTime) / (1000 * timeSlotDuration)
    );
    console.log(date, startTime, endTime, possibleSlot);
    for (let i = 0; i < possibleSlot; i++) {
      console.log(
        new Date(startTime.valueOf() + i * timeSlotDuration * 1000),
        new Date(startTime.valueOf() + (i + 1) * timeSlotDuration * 1000)
      );
      const interview = Interview.create({
        startTime: new Date(startTime.valueOf() + i * timeSlotDuration * 1000),
        endTime: new Date(
          startTime.valueOf() + (i + 1) * timeSlotDuration * 1000
        )
      });
    }
    res.status(201).json({
      sucess: true,
      message: "Interview created"
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, error });
  }
});
Router.delete("/:id", auth.verifyAdminToken, async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (interview.user == null) {
      await Interview.findByIdAndDelete(req.params.id);
      return res.status(200).json({ status: true, message: "Slot deleted." });
    } else {
      return res
        .status(400)
        .json({ status: false, error: "Slot has been booked" });
    }
  } catch (error) {
    res.status(400).json({ status: false, error: "Some Error Occured" });
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
