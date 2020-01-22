const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  generateToken: userId => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "14d"
    });
  },

  verifyToken: function(req, res, next) {
    let token = req.headers.authorization || "";
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userToken) => {
        if (err) {
          return res
            .status(401)
            .json({ status: false, message: "Invalid token" });
        }
        User.findById(
          userToken.userId,
          "-password -totalScore -updatedAt -hashMail -screener -isProfileClaimed",
          (err, user) => {
            if (err)
              return res
                .status(401)
                .json({ status: false, message: "User not found" });
            req.user = user;
            next();
          }
        );
      });
    } else {
      res.status(401).json({ status: false, message: "Unauthorized access" });
    }
  },
  verifyAdminToken: function(req, res, next) {
    let token = req.headers.authorization || "";
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userToken) => {
        if (err) {
          return res
            .status(401)
            .json({ status: false, message: "Invalid token" });
        }
        User.findById(
          userToken.userId,
          "-password -createdAt -updatedAt -motivation -socialProfile -phoneNo -isProfileClaimed",
          (err, user) => {
            if (err) {
              return res
                .status(401)
                .json({ status: false, message: "User not found" });
            }
            if (!user) {
              return res
                .status(401)
                .json({ status: false, message: "User not found" });
            }
            if (user.isAdmin !== true) {
              return res
                .status(401)
                .json({ status: false, message: "Unauthorized access" });
            }
            req.user = user;
            next();
          }
        );
      });
    } else {
      res.status(401).json({ status: false, message: "Unauthorized access" });
    }
  }
};
