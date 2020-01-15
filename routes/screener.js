const express = require("express");
const router = express.Router();

const Screener = require("./../models/Screener");
const User = require("./../models/User");
const auth = require("./../utils/auth");
const Timeline = require("../models/Timeline");
const timelineCreator = require("../utils/timelineCreator");

//get screener data
router.post("/:id", auth.verifyAdminToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.screener) {
      await Screener.findByIdAndUpdate(user.screener, req.body);
      await Timeline.create({
        user: user._id,
        ...timelineCreator("SCREENER_INFORMATION_EDITED", {
          name: user.name,
          adminName: req.user.name
        })
      });
    } else {
      const screenerData = await Screener.create(req.body);
      await User.findByIdAndUpdate(
        req.params.id,
        { screener: screenerData._id },
        { new: true }
      );
      await Timeline.create({
        user: user._id,
        ...timelineCreator("SCREENER_INFORMATION_ADDED", {
          name: user.name,
          adminName: req.user.name
        })
      });
    }
    res
      .status(201)
      .json({
        status: true,
        message: "Screener information has been updated!"
      });
  } catch (error) {
    res.json({ status: false, message: "Something went wrong!" });
  }
});

module.exports = router;
