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
  // TODO: add validations.

  try {
    req.body.hashMail =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    const user = await User.create(req.body);
    //TODO: UnComment to sending mail once user Register
    // const mail = await Mailer.mail(user.email, user.name, user.hashMail);
    // console.log("mailer");
    res.status(201).json({ status: true, user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: false, err });
  }
});

//Login route
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please Fill Both Fields");
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error("User not found!!!");
    }

    if (!user.verifyPassword(password)) {
      throw new Error("Invaild password");
    }

    const authToken = await Auth.generateToken(user.id);

    res.status(200).json({ status: "success", authToken });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "failed", err });
  }
});

module.exports = router;
