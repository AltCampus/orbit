var express = require("express");
var router = express.Router();

// on first login reset Password
router.post("/:hashMail", async (req, res) => {
  let { password } = req.body;
  let {hashMail} = req.params;
  if(hashMail){
    try {
      const user = await User.findOne({ hashMail });
      user.password = password;
      delete user.hashMail;
      const UpdatedUser = await user.save();
      return res.status(201).json({ status: true, UpdatedUser });
    } catch (err) {
      return res.status(301).json({ success: false, err });
    }
  }
  else{
  res.status(301).json({success:false,message:'User already Claimed there account'});}
});

module.exports = router;