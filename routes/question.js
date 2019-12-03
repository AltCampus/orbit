const express = require("express");
const router = express.Router();

const auth = require("./../utils/auth");
const Question = require("./../models/Question");

// list all questions
router.get("/", auth.verifyToken, async (req, res) => {
  if (req.user.isAdmin === true) {
    try {
      const questions = await Question.find({});
      res.status(200).json({ status: true, questions });
    } catch (error) {
      res.status(400).json({ status: "failed", error });
    }
  } else {
    res.status(401).json({ status: false, message: "Unauthorized access" });
  }
});
router.post("/", auth.verifyToken, async (req, res) => {
  if (req.user.isAdmin === true) {
    try {
      if (req.body.question.length !== 0) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid Question" });
      }
      if (typeof req.body.isRandom !== "boolean") {
        return res.status(400).json({
          status: false,
          message: "You must specify that question is random or compulsory."
        });
      }
      if (typeof req.body.isActive !== "boolean") {
        return res.status(400).json({
          status: false,
          message: "You must specify that question is active or not."
        });
      }
      if (req.body.point > 0) {
        return res.status(400).json({
          status: false,
          message:
            "You must specify the point that should be given to user for correct answer."
        });
      }

      const question = await Question.create(req.body);

      res.status(200).json({ status: true, questions });
    } catch (error) {
      res.status(400).json({ status: "failed", error });
    }
  } else {
    res.status(401).json({ status: false, message: "Unauthorized access" });
  }
});
router.put("/:id", auth.verifyToken, async (req, res) => {
  if (req.user.isAdmin === true) {
    try {
      const question = await Question.findByIdAndUpdate(req.params.id);

      res.status(200).json({ status: true, questions });
    } catch (error) {
      res.status(400).json({ status: false, error });
    }
  } else {
    res.status(401).json({ status: false, message: "Unauthorized access" });
  }
});

module.exports = Router;
