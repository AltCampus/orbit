var express = require('express');
var router = express.Router();

var hash = 'bundle.88d0f718c7476d803c48';

/* GET home page. */
router.get('*', function (req, res, next) {
  const cssPath = process.env.NODE_ENV == 'production' ? `/bundle/${hash}.css` : '/static/bundle.css';
  const jsPath = process.env.NODE_ENV == 'production' ? `/bundle/${hash}.js` : '/static/bundle.js';
  res.render('index', { title: 'Orbit | AltCampus', jsPath, cssPath });
});

module.exports = router;
