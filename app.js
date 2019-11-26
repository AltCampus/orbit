const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const createError = require("http-errors");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const userRouter = require("./routes/user");
const dashboardRouter = require("./routes/dashboard");

require("dotenv").config();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config");
  const compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    err ? console.log(err) : console.log("connected to DB");
  }
);

mongoose.set("useCreateIndex", true);

app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/users", usersRouter);
app.use("/user", userRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({ message: "Page Not Found" });
});

// error handler
app.use(function(err, req, res, next) {
  res.json({ err });
});

module.exports = app;
