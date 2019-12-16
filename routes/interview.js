const express = require("express");
const Router = express.Router();

const auth = require("./../utils/auth");
// const User = require("./../models/User");
const Interview = require("../models/Interview");
const User = require("../models/User");

Router.post("/", async (req, res) => {
  try {
    const { uuid, start_time, end_time } = req.body.event;
    const scheduleEvent = { uuid, start_time, end_time };
    const { email } = req.body.invitee;
    const user = await User.findOne({ email });
    const Interview = await Interview.create({ user: user._id, scheduleEvent });
    res.status(201).json({ status: true, message: "Create Interview" });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "error in Interview Schedule Interview"
    });
  }
});

module.exports = Router;
