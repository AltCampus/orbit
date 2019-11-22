var express = require("express");
var router = express.Router();
// const Mailer = require("../utils/Mailer");
const User = require("../models/User");
const Auth = require("../utils/auth");

//current Login User
router.get("/", function(req, res, next) {
  User.find({}, (err, users) => {
    if (err) return res.status(400).json({ status: false, err });
    res.status(201).json({ status: true, users });
  });
});
/* POST req from altcampus to orbit and create user */
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    // Mailer.mail(req);
    res.status(201).json({ status: true, user });
  } catch (err) {
    res.status(400).json({ status: false, err });
  }
});

//Login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const password = req.body.password;
    if (!user) return res.json({ status: "failed", message: "User not found" });
    if (!user.verifyPassword(password)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invaild password" });
    }
    const token = await Auth.genToken(user.id);
    res.status(200).json({ status: "success", user, token });
  } catch (err) {
    res.status(400).json({ status: "failed", err });
  }
});

module.exports = router;
