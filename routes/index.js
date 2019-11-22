var express = require("express");
var router = express.Router();
const Auth = require("../utils/auth");

//get dashboard
router.get("/dashboard", Auth.verToken, (req, res, next) => {
  if (req.isAdmin) {
    //TODO: add/render admin dashboard
    console.log("Got admin");
  }
  //TODO: add/ render student dashboard
  res.status(200).json({ status: "success" });
});

module.exports = router;
