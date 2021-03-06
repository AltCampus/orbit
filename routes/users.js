var express = require("express");
var router = express.Router();

const mailer = require("../utils/mailer");
const User = require("../models/User");
const Task = require("../models/Task");
const Timeline = require("../models/Timeline");
const timelineCreator = require("../utils/timelineCreator");
const auth = require("../utils/auth");
const config = require("../utils/config");

var cors = require('cors');


//current Login User
router.get("/me", auth.verifyToken, async (req, res) => {
  try {
    return res.status(201).json({ status: true, user: req.user });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, error: "Something went wrong!" });
  }
});

/* POST req from altcampus to orbit and create user */
router.post("/", cors(), async (req, res) => {

  var auth = req.headers.authorization || req.headers.Authorization;

  if (auth !== 'am-i-a-fool') {
    return res.status(403).send({ message: "Not allowed." });
  }

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
    await Timeline.create({
      user: user._id,
      ...timelineCreator("USER_REGISTERED", { name: user.name })
    });
    if (process.env.NODE_ENV === "production") {
      res.status(201).json({ status: true });

      setTimeout(() => {
        mailer.mail(
          "40_MINS_AFTER_APPLYING",
          user.email,
          user.name,
          user.hashMail
        );
      }, config.TIME_FOR_FIRST_INTRO_MAIL * 1000 * 60);
    } else {
      res.status(201).json({ status: true, user });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, message: "Something went wrong!" });
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
        .json({ status: false, error: "Please Fill Both Fields!" });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ status: false, error: "Account does not exist!" });
    }

    if (!user.verifyPassword(password)) {
      return res
        .status(400)
        .json({ status: false, error: "Invalid password. Please try again!" });
    }

    const authToken = await auth.generateToken(user.id);

    return res.status(200).json({ status: "success", authToken });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, error: "Something went wrong!" });
  }
});

router.post("/password/reset", async (req, res) => {
  let { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Email not found in database!"
      });
    }
    user.hashMail =
      Date.now() +
      Math.random()
        .toString(36)
        .substring(2, 15);
    await user.save();
    res.status(200).json({
      status: true,
      message: "Reset Password Link has been sent to your email!"
    });
    if (process.env.NODE_ENV === "production") {
      mailer.mail(
        "RESET_ACCOUNT_PASSWORD",
        user.email,
        user.name,
        user.hashMail
      );
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, message: "Something went wrong!" });
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
          .json({ status: true, message: "Invalid login link!" });
      } else if (user.hashMail) {
        user.password = password;
        if(!user.isProfileClaimed){
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
        } 
        //set hashmail to null
        user.hashMail = null;

        // Set user profile to be claimed.
        user.isProfileClaimed = true;
        await user.save();
        await Timeline.create({
          user: user._id,
          ...timelineCreator("ACCOUNT_CLAIMED", { name: user.name })
        });
        return res.status(201).json({
          status: true,
          message: "You've successfully updated your account password!"
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "User already claimed his/her account!"
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong!" });
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
      .populate("interview")
      .populate("quiz")
      .populate("screener");
    let timeline = await Timeline.find({ user: userId });
    res.status(200).json({ status: true, user, timeline });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong!", status: false });
  }
});

// Admin can accept for interview user route
router.patch("/interview/:id", auth.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findOne({ _id: id });
    if (user.stage > 3) {
      if (user.canScheduleInterview) {
        return res.status(400).json({
          message: `${user.name} has already been accepted for interview!`
        });
      }
      user.canScheduleInterview = true;
      user = await user.save();
      user.password = undefined;
      user.hashMail = undefined;
      await Timeline.create({
        user: user._id,
        ...timelineCreator("ACCEPTED_FOR_INTERVIEW", {
          name: user.name,
          adminName: req.user.name
        })
      });
      res.status(200).json({
        status: true,
        message: `${user.name} can schedule their interview now.`,
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
    res.status(400).json({ status: false, message: "Something went wrong!" });
  }
});

// Admin can accept user route
router.patch("/status/:id", auth.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById(id);
    if (user.interview) {
      let { dateOfJoining, selectedForBatch } = req.body;
      dateOfJoining = new Date(dateOfJoining);
      user.status = "accept";
      const selectionDetails = {
        batch: selectedForBatch,
        dateOfJoining: new Date(
          dateOfJoining.getFullYear(),
          dateOfJoining.getMonth(),
          dateOfJoining.getDate(),
          12,
          0,
          0
        )
      };
      user.selectionDetails = selectionDetails;

      user = await user.save();
      user.password = undefined;
      user.hashMail = undefined;

      await Timeline.create({
        user: user._id,
        ...timelineCreator("APPLICATION_ACCEPTED", {
          name: user.name,
          adminName: req.user.name,
          joiningDate: selectionDetails.dateOfJoining,
          batch: selectionDetails.batch
        })
      });

      res.status(200).json({
        status: true,
        message: `${user.name} accepted for joining AltCampus`,
        user
      });

      if (process.env.NODE_ENV === "production") {
        mailer.mail(
          "ACCEPTANCE_MAIL_AFTER_INTERVIEW",
          user.email,
          user.name,
          selectionDetails.dateOfJoining.toDateString()
        );
      }
    } else {
      return res.status(400).json({
        status: false,
        message: `${user.name} has not been through the interview process.`
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, message: "Something went wrong!" });
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

      await Timeline.create({
        user: user._id,
        ...timelineCreator("APPLICATION_REJECTED", {
          name: user.name,
          adminName: req.user.name
        })
      });
      res.status(200).json({
        status: true,
        message: `${user.name} rejected for joining AltCampus!`
      });

      if (process.env.NODE_ENV === "production") {
        if (user.interview) {
          await mailer.mail(
            "REJECTION_MAIL_AFTER_INTERVIEW",
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
    return res
      .status(400)
      .json({ status: false, message: "Something went wrong!" });
  }
});

// Get All Users
router.get("/", auth.verifyAdminToken, async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false })
      .sort({ createdAt: -1 })
      .select("-password")
      .populate("task")
      .populate("quiz")
      .populate("interview");

    if (!users) {
      return res.status(200).json({ message: "No users yet", status: true });
    }
    res.status(200).json({ users, status: true });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", status: false });
  }
});

module.exports = router;
