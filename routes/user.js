var express = require("express");
var router = express.Router();
const User = require("../models/User");
const auth = require("../utils/auth");

/* GET User */
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.status(200).json({ user, status: true });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", status: false });
  }
});

module.exports = router;
