var express = require("express");
var router = express.Router();

// on first login reset Password
router.post("/set-password/:hashMail", async (req, res) => {
  let { password } = req.body;
  try {
    const user = await User.findOne({ hashMail });
    user.password = password;
    const UpdatedUser = await user.save();
    res.status(201).json({ status: true, UpdatedUser });
  } catch (err) {
    res.status(301).json({ success: false, err });
  }
});

module.exports = router;