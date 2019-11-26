const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/*", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res) => {
  res.render("index", { title: 'Orbit'});
});

module.exports = router;
