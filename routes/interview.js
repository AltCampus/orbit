const express = require("express");
const Router = express.Router();

const auth = require("./../utils/auth");
const User = require("./../models/User");
const Interview = require("../models/Interview");
const Timeline = require("../models/Timeline");
const timelineCreator = require("../utils/timelineCreator");
const calculateScore = require("../utils/calculateScore");

Router.get("/status", auth.verifyToken, async (req, res) => {
  // User route for getting status of interview stage
  try {
    if (req.user.canScheduleInterview) {
      return res.status(200).json({
        canScheduleInterview: true,
        hasScheduledInterview: false,
        isReviewInProgress: false,
        isFinalReviewInProgress: false
      });
    }
    if (!req.user.canScheduleInterview) {
      // User can't schdeule interview
      if (req.user.interview) {
        // User has scheduled interview already. Send the details
        const interview = await Interview.findById(req.user.interview);
        if (new Date(interview.endTime).valueOf() < Date.now().valueOf()) {
          // Interview has ended
          return res.status(200).json({
            canScheduleInterview: false,
            hasScheduledInterview: true,
            isReviewInProgress: true,
            isFinalReviewInProgress: true,
            startTime: interview.startTime,
            endTime: interview.endTime
          });
        } else {
          // Interview is yet to take place
          return res.status(200).json({
            canScheduleInterview: false,
            hasScheduledInterview: true,
            isReviewInProgress: false,
            isFinalReviewInProgress: false,
            startTime: interview.startTime,
            endTime: interview.endTime
          });
        }
      } else {
        // User application is under review
        return res.status(200).json({
          canScheduleInterview: false,
          hasScheduledInterview: false,
          isReviewInProgress: true,
          isFinalReviewInProgress: false
        });
      }
    }
  } catch (error) {
    return res
      .status(403)
      .json({ status: false, error: "Something went wrong" });
  }
});
Router.get("/", auth.verifyToken, async (req, res) => {
  // User route to get list of all available slots to book
  try {
    const data = await Interview.find({
      user: null,
      startTime: { $gt: new Date(Date.now() + 86400 * 1000) }
    });
    res.json({ availableSlots: data });
  } catch (error) {
    return res
      .status(403)
      .json({ status: false, error: "Something went wrong!" });
  }
});

Router.put("/book/:id", auth.verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interview.findById(id);

    if (!req.user.canScheduleInterview) {
      return res.status(403).json({
        status: false,
        error: "You are not authorized to book this Interview slot."
      });
    }

    if (interview) {
      // Interview slot with particular id exists
      if (!interview.user) {
        const scheduledInterview = await Interview.findByIdAndUpdate(
          id,
          { user: req.user._id },
          { new: true }
        );
        await User.findByIdAndUpdate(req.user._id, {
          interview: scheduledInterview._id,
          canScheduleInterview: false
        });
        const { startTime, endTime } = scheduledInterview;
        await Timeline.create({
          user: req.user._id,
          ...timelineCreator("INTERVIEW_BOOKED", {
            name: req.user.name,
            startTime,
            endTime
          })
        });
        res.status(201).json({
          status: true,
          message: "Interview Scheduled",
          slotDetails: {
            id,
            startTime,
            endTime
          }
        });
      } else {
        // Slot is already been booked by other user
        return res.status(403).json({
          status: false,
          error: "Slot is already booked."
        });
      }
    } else {
      return res.status(403).json({
        status: false,
        error: "Could not found the selected Interview slot."
      });
    }
  } catch (error) {
    res.status(400).json({ status: false, error: "Something went wrong!" });
  }
});

/** ADMIN ROUTES */

// Admin list all slot
Router.get("/all", auth.verifyAdminToken, async (req, res) => {
  try {
    const slots = await Interview.find({
      startTime: { $gt: Date.now() }
    }).populate("user");
    return res.status(200).json({ status: true, slots });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, error: "Something went wrong!" });
  }
});

Router.get("/scheduled", auth.verifyAdminToken, async (req, res) => {
  try {
    const scheduledInterviews = await Interview.find({
      user: { $ne: null }
    }).populate("user");
    return res.status(200).json({ status: true, scheduledInterviews });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, error: "Something went wrong!" });
  }
});

// Admin review Interview
Router.put("/review/:id", auth.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interview.findById(id);

    if (interview) {
      // Interview slot with particular id exists
      await Interview.findByIdAndUpdate(interview._id, {
        review: req.body.review,
        score: req.body.score
      });
      await calculateScore(interview.user);
      return res.json({
        success: true,
        message: "Your review has been updated!"
      });
    } else {
      return res.status(403).json({
        status: false,
        error: "Could not found the selected Interview slot."
      });
    }
  } catch (error) {
    res.status(400).json({ status: false, error: "Something went wrong!" });
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
    for (let i = 0; i < possibleSlot; i++) {
      const count = await Interview.find({
        startTime: {
          $gt: new Date(
            startTime.valueOf() + i * timeSlotDuration * 1000 - 10
          ).valueOf(),
          $lt: new Date(
            startTime.valueOf() + (i + 1) * timeSlotDuration * 1000
          ).valueOf()
        }
      });
      if (count.length === 0) {
        const interview = Interview.create({
          startTime: new Date(
            startTime.valueOf() + i * timeSlotDuration * 1000
          ),
          endTime: new Date(
            startTime.valueOf() + (i + 1) * timeSlotDuration * 1000
          )
        });
      }
    }
    res.status(201).json({
      sucess: true,
      message: "Interview created"
    });
  } catch (error) {
    res.status(400).json({ status: false, error: "Something went wrong!" });
  }
});
Router.delete("/:id", auth.verifyAdminToken, async (req, res) => {
  // Admin route for deleting interview slot
  try {
    const interview = await Interview.findById(req.params.id);
    if (interview.user == null) {
      await Interview.findByIdAndDelete(req.params.id);
      return res
        .status(200)
        .json({ status: true, message: "Slot has been deleted." });
    } else {
      return res
        .status(400)
        .json({ status: false, error: "Slot has been booked" });
    }
  } catch (error) {
    res.status(400).json({ status: false, error: "Something went wrong!" });
  }
});

module.exports = Router;
