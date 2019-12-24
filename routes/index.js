const express = require("express");
const router = express.Router();

var cssBundle = process.env.NODE_ENV === 'production' ? '/bundle/bundle.css' : '/static/bundle.css';
var jsBundle = process.env.NODE_ENV === 'production' ? '/bundle/bundle.js' : '/static/bundle.js';

/* GET home page. */
router.get("/*", function(req, res, next) {
  res.render("index", { title: "Orbit | AltCampus", cssBundle, jsBundle });
});

module.exports = router;
