var express = require("express");
const mongoose = require("mongoose");
var path = require("path");
var logger = require("morgan");
var createError = require("http-errors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const userRouter = require("./routes/user");

require("dotenv").config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    err ? console.log(err) : console.log("connected to DB");
  }
);

var app = express();
mongoose.set("useCreateIndex", true);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") {
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config");
  var compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({ message: "Page Not Found" });
});

// error handler
app.use(function(err, req, res, next) {
  res.json({ err });
});

module.exports = app;
