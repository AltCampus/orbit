var express = require("express");
var router = express.Router();

const mailer = require("../utils/mailer");
const User = require("../models/User");
const Task = require("../models/Task");
const auth = require("../utils/auth");

// Get All Users
router.get("/", auth.verifyAdminToken, async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false })
      .sort({ createdAt: -1 })
      .select("-password")
      .populate("task")
      .populate("quiz");
    if (!users) res.status(200).json({ message: "No users yet", status: true });
    res.status(200).json({ users, status: true });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", status: false });
  }
});

//current Login User
router.get("/me", auth.verifyToken, async (req, res) => {
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
    hashMail =
      Date.now() +
      Math.random()
        .toString(36)
        .substring(2, 15);
    const user = await User.create({
      name,
      email,
      phoneNo,
      socialProfile,
      motivation,
      hashMail
    });

    res.status(201).json({ status: true, user });

    if (process.env.NODE_ENV === "production") {
      setTimeout(() => {
        mailer.mail(
          "40_MINS_AFTER_APPLYING",
          user.email,
          user.name,
          user.hashMail
        );
      }, 1000 * 60 * 40);
    }
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
        .json({ status: false, message: "Account does not exist" });
    }

    if (!user.verifyPassword(password)) {
      return res
        .status(400)
        .json({ status: false, message: "Invaild password" });
    }

    const authToken = await auth.generateToken(user.id);

    return res.status(200).json({ status: "success", authToken });
  } catch (error) {
    return res.status(400).json({ status: "failed", error });
  }
});

// on first login reset Password
router.post("/:hashMail", async (req, res) => {
  let { password } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ status: true, message: "Password must contain 6 letter!" });
  } else {
    try {
      let { hashMail } = req.params;
      const user = await User.findOne({ hashMail });
      if (!user) {
        return res
          .status(400)
          .json({ status: true, message: "Invaild login link" });
      } else if (!user.isProfileClaimed) {
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
        updatedUser.password = "";
        return res.status(201).json({ status: true, user: updatedUser });
      } else {
        return res.status(401).json({
          success: false,
          message: "User already Claimed there account"
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ success: false, message: "Some error from server!" });
    }
  }
});

/* GET User Progress */
router.get("/:id", auth.verifyAdminToken, async (req, res) => {
  const userId = req.params.id;
  try {
    let user = await User.findById(
      { _id: userId },
      "-password -hashMail -__v -isAdmin -isProfileClaimed"
    )
      .populate("task")
      .populate("screener");
    // const task = await Task.findById(user.task)
    res.status(200).json({ user, status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong", status: false });
  }
});

// Admin can accept for interview user route
router.patch("/interview/:id", auth.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findOne({ _id: id });
    if (user.stage > 3) {
      user.canScheduleInterview = true;
      user = await user.save();
      user.password = undefined;
      user.hashMail = undefined;
      res.status(200).json({
        status: true,
        message: `${user.name} now can schedule their interview.`,
        user
      });
      if (process.env.NODE_ENV === "production") {
        mailer.mail("SCHEDULE_INTERVIEW_MAIL_ALERT", user.email, user.name);
      }
    } else {
      return res.status(400).json({
        status: false,
        message: `Previous stages are not completed by ${user.name}`
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: false, message: "some error occurs from Server" });
  }
});

// Admin can accept user route
router.patch("/status/:id", auth.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findOne({ _id: id });
    if (user.interview) {
      user.status = "accept";
      user.selectedForBatch = req.body.selectedForBatch;
      user = await user.save();
      user.password = undefined;
      user.hashMail = undefined;

      res.status(200).json({
        status: true,
        message: `${user.name} now eligible for joining AltCampus`,
        user
      });

      if (process.env.NODE_ENV === "production") {
        mailer.mail(
          "ACCEPTANCE_MAIL_AFTER_INTERVIEW",
          user.email,
          user.name,
          user.selectedForBatch
        );
      }
    } else {
      return res.status(400).json({
        status: false,
        message: `${user.name}, not been through the interview process.`
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: "some error occurs from Server" });
  }
});

// Admin can Reject user route
router.delete("/status/:id", auth.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findOne({ _id: id });
    if (user.stage > 3) {
      user.status = "reject";
      user = await user.save();
      user.password = undefined;
      user.hashMail = undefined;

      res.status(200).json({
        status: true,
        message: `${user.name} not eligible for joining AltCampus!`,
        user
      });

      if (process.env.NODE_ENV === "production") {
        if (user.interview) {
          await mailer.mail(
            "ACCEPTANCE_MAIL_AFTER_INTERVIEW",
            user.email,
            user.name
          );
        } else {
          await mailer.mail(
            "REJECTION_MAIL_BEFORE_INTERVIEW",
            user.email,
            user.name
          );
        }
      }
    } else {
      return res.status(400).json({
        status: false,
        message: `Previous stages are not completed by ${user.name}`
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: "some error occurs from Server" });
  }
});

module.exports = router;
