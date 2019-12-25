const express = require("express");
const router = express.Router();

const Screener = require("./../models/Screener");
const User = require("./../models/User");
const auth = require("./../utils/auth");

router.post("/:id", auth.verifyAdminToken, async (req, res) => {
  try {
    const ScreenerData = await Screener.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { screener: ScreenerData._id },
      { new: true }
    );
    res.status(201).json({ status: true, message: "User data recorded" });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: "Some error from console" });
  }
});

module.exports = router;
