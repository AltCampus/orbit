const express = require("express");
const router = express.Router();
const Auth = require("../utils/auth");

router.get("/dashboard", Auth.verifyToken, (req, res) => {
  if (req.isAdmin) {
    return res
      .status(200)
      .json({ status: true, isAdmin: true, user: req.user });
  }
  res.status(200).json({ status: true, isAdmin: false, user: req.user });
});

module.exports = router;
