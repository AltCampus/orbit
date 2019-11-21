var express = require("express");
var router = express.Router();
const Mailer = require("../utils/Mailer");
const User = require("../models/User");

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
    console.log(req.body);
    const user = await User.create(req.body);
    Mailer.mail(req);
    res.status(201).json({ status: true, user });
  } catch (err) {
    res.status(400).json({ status: false, err });
  }
});

module.exports = router;
