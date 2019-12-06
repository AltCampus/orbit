var express = require("express");
var router = express.Router();
// const Mailer = require("../utils/Mailer");
const User = require("../models/User");
const Task = require("../models/Task");
const auth = require("../utils/auth");

//current Login User
router.get("/", auth.verifyToken, function(req, res) {
  try {
    return res.status(201).json({ status: true, user: req.user });
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
});

/* POST req from altcampus to orbit and create user */
router.post("/", async (req, res) => {
  let { name, email, phoneNo, socialProfile, motivation } = req.body;
  try {
    // validations for required profile
    if (!name || !email || !phoneNo || !socialProfile || !motivation) {
      return res.status(400).json({
        status: false,
        message: "Please fill all Required data"
      });
    }
    req.body.hashMail =
      Date.now() +
      Math.random()
        .toString(36)
        .substring(2, 15);
    const user = await User.create({
      name,
      email,
      phoneNo,
      socialProfile,
      motivation
    });
    //TODO: UnComment to sending mail once user Register
    // const mail = await Mailer.mail(user.email, user.name, user.hashMail);
    // console.log("mailer");
    return res.status(201).json({ status: true, user });
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
});

//Login route
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    // validations for required profile
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Please Fill Both Fields" });
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User not found!!!" });
    }

    if (!user.verifyPassword(password)) {
      return res
        .status(400)
        .json({ status: false, message: "Invaild password" });
    }

    const authToken = await auth.generateToken(user.id);
    console.log("done");
    return res.status(200).json({ status: "success", authToken });
  } catch (error) {
    return res.status(400).json({ status: "failed", error });
  }
});

// on first login reset Password
router.post("/:hashMail", async (req, res) => {
  let { password } = req.body;
  let { hashMail } = req.params;
  try {
    const user = await User.findOne({ hashMail });
    if (!user.isProfileClaimed) {
      user.password = password;

      // Start the timer for HTML task and link it to user model.
      const task = await Task.create({
        user: user.id,
        html: {
          startTime: Date.now()
        }
      });
      user.task = task.id;

      // Set User stage to 1
      user.stage = 1;

      // Set user profile to be claimed.
      user.isProfileClaimed = true;
      const updatedUser = await user.save();
      return res.status(201).json({ status: true, user: updatedUser });
    } else {
      return res.status(301).json({
        success: false,
        message: "User already Claimed there account"
      });
    }
  } catch (error) {
    return res.status(301).json({ success: false, error });
  }
});

module.exports = router;
