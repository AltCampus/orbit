var express = require("express");
var router = express.Router();
const Auth = require("../utils/auth");
const User = require("../models/User");

//get dashboard
router.get("/dashboard", Auth.verToken, (req, res) => {
  if (req.isAdmin)
    return res
      .status(200)
      .json({ status: true, isAdmin: true, user: req.user });
  res.status(200).json({ status: true, isAdmin: false, user: req.user });
});

module.exports = router;
