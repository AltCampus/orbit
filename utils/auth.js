const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  generateToken: userId => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "14d"
    });
  },
  verifyToken: function(req, res, next) {
    //Note: First character is lower case for some error reasons, authorization.
    let token = req.headers.authorization || "";
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userToken) => {
        if (err) return res.status(401).json({ message: "invalid token" });
        User.findById(
          userToken.userId,
          "-password -createdAt -updatedAt -contact -post -description -__v",
          (err, user) => {
            if (err) return res.status(401).json({ message: "User not found" });
            req.user = user;
            // Admin user request
            if (user.email === process.env.email) {
              req.isAdmin = true;
            }
            next();
          }
        );
      });
    } else res.status(401).json({ message: "unauthorized access" });
  }
};
