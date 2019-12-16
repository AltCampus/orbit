var express = require("express");
var router = express.Router();
// const Mailer = require("../utils/Mailer");
const User = require("../models/User");
const Task = require("../models/Task");
const auth = require("../utils/auth");

//current Login User
router.get("/", auth.verifyToken, async (req, res) => {
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
    // TODO: UnComment to sending mail once user Register
    // const mail = await Mailer.mail('apply',user.email, user.name, user.hashMail);
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

// Get Users
router.get("/get", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) res.status(200).json({ message: "No users yet", status: true });
    res.status(200).json({ users, status: true });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", status: false });
  }
});

/* GET User Progress */
router.get("/:id", auth.verifyAdminToken, async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    const user = await User.findById(userId)
      .populate("task")
      .select("-password, -hashMail");
    console.log(user);
    // const task = await Task.findById(user.task)
    res.status(200).json({ user, status: true });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", status: false });
  }
});

module.exports = router;
