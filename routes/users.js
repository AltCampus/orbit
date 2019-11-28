var express = require("express");
var router = express.Router();
// const Mailer = require("../utils/Mailer");
const User = require("../models/User");
const Auth = require("../utils/auth");

//current Login User
router.get("/", Auth.verifyToken, function(req, res) {
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
      res.json({ status: false, message: "Please fill all Required data" });
    }
    req.body.hashMail =
      Date.now() +
      Math.random()
        .toString(36)
        .substring(2, 15);
    const user = await User.create(req.body);
    //TODO: UnComment to sending mail once user Register
    // const mail = await Mailer.mail(user.email, user.name, user.hashMail);
    // console.log("mailer");
    res.status(201).json({ status: true, user });
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
});

//Login route
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    // validations for required profile
    if (!email || !password) {
      res.json({ status: false, message: "Please Fill Both Fields" });
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.json({ status: false, message: "User not found!!!" });
    }

    if (!user.verifyPassword(password)) {
      res.json({ status: false, message: "Invaild password" });
    }

    const authToken = await Auth.generateToken(user.id);
    console.log("done");
    res.status(200).json({ status: "success", authToken });
  } catch (error) {
    res.status(400).json({ status: "failed", error });
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
      user.isProfileClaimed = true;
      const updatedUser = await user.save();
      res.status(201).json({ status: true, user: updatedUser });
    } else {
      res.status(301).json({
        success: false,
        message: "User already Claimed there account"
      });
    }
  } catch (error) {
    res.status(301).json({ success: false, error });
  }
});

module.exports = router;
