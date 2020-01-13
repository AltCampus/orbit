const express = require("express");
const router = express.Router();

const Screener = require("./../models/Screener");
const User = require("./../models/User");
const auth = require("./../utils/auth");

//get screener data
router.post("/:id", auth.verifyAdminToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.screener) {
      await Screener.findByIdAndUpdate(user.screener, req.body);
    } else {
      const screenerData = await Screener.create(req.body);
      await User.findByIdAndUpdate(
        req.params.id,
        { screener: screenerData._id },
        { new: true }
      );
    }
    res.status(201).json({ status: true, message: "User data recorded" });
  } catch (error) {
    res.json({ status: false, message: "Some error from console" });
  }
});

module.exports = router;
