const express = require("express");
const router = express.Router();

const auth = require("./../utils/auth");
const Question = require("./../models/Question");

// list all questions
router.get("/", auth.verifyAdminToken, async (req, res) => {
  // Admin Protected route for getting all questions
  try {
    const questions = await Question.find({});
    return res.status(200).json({ status: true, questions });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, error: "Something went wrong!" });
  }
});
router.post("/", auth.verifyAdminToken, async (req, res) => {
  // Admin Protected route for adding new question
  try {
    const {
      questionTitle,
      isRandom,
      isActive,
      point,
      type,
      options = {},
      answer = ""
    } = req.body;

    if (questionTitle.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Question" });
    }
    if (typeof isRandom !== "boolean") {
      return res.status(400).json({
        status: false,
        message: "You must specify that question is random or compulsory."
      });
    }
    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        status: false,
        message: "You must specify that question is active or not."
      });
    }
    if (!Number.isInteger(point) || !point > 0) {
      // Admin must specify point for correct answer
      return res.status(400).json({
        status: false,
        message:
          "You must specify the point that should be given to user for correct answer."
      });
    }
    if (type !== "MCQ" && type !== "subjective") {
      // Admin must specify the type of question
      return res.status(400).json({
        status: false,
        message:
          "You must specify the type of question wether it is subjective or MCQ."
      });
    }
    if (
      type === "MCQ" &&
      !(options && options.a && options.b && options.c && options.d)
    ) {
      // If type of question is MCQ, Admin must specify 4 options
      return res.status(400).json({
        status: false,
        message: "You must specify 4 options if type of question is MCQ."
      });
    }
    if (
      type === "MCQ" &&
      !(answer !== "" && ["a", "b", "c", "d"].includes(answer))
    ) {
      // Answer is compulsory for MCQ question
      return res.status(400).json({
        status: false,
        message: "You must select answer from available options."
      });
    }
    const newQuestion = await Question.create({
      questionTitle,
      type,
      options: {
        a: options.a,
        b: options.b,
        c: options.c,
        d: options.d
      },
      answer,
      point,
      isActive,
      isRandom
    });

    return res.status(200).json({ status: true, newQuestion });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, error: "Something went wrong!" });
  }
});
router.get("/:id", auth.verifyAdminToken, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question)
      return res
        .status(400)
        .json({ status: false, error: "Question not found" });
    return res.status(200).json({ status: true, question });
  } catch (error) {
    res.status(400).json({ status: false, error: "Something went wrong!" });
  }
});
router.put("/:id", auth.verifyAdminToken, async (req, res) => {
  try {
    const updates = {};
    const {
      questionTitle,
      isRandom,
      isActive,
      point,
      type,
      options,
      answer
    } = req.body;

    if (questionTitle) {
      // If questionTitle is to be updated
      if (questionTitle.length === 0) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid Question" });
      }
      updates.questionTitle = questionTitle;
    }
    if (isRandom) {
      // If isRandom is to be updated
      if (typeof isRandom !== "boolean") {
        return res.status(400).json({
          status: false,
          message: "You must specify that question is random or compulsory."
        });
      }
      updates.isRandom = isRandom;
    }
    if (isActive) {
      // If isActive is to be updated
      if (typeof isActive !== "boolean") {
        return res.status(400).json({
          status: false,
          message: "You must specify that question is active or not."
        });
      }
      updates.isActive = isActive;
    }
    if (point) {
      // If point is to be updated
      if (!Number.isInteger(point) || !point > 0) {
        // Admin must specify point for correct answer
        return res.status(400).json({
          status: false,
          message:
            "You must specify the point that should be given to user for correct answer."
        });
      }
      updates.point = point;
    }
    if (type) {
      // If type of question is to be updated
      if (type !== "MCQ" && type !== "subjective") {
        // Admin must specify the type of question
        return res.status(400).json({
          status: false,
          message:
            "You must specify the type of question wether it is subjective or MCQ."
        });
      }

      updates.type = type;

      if (type === "MCQ") {
        if (!(options && options.a && options.b && options.c && options.d)) {
          // If type of question is MCQ, Admin must specify 4 options
          return res.status(400).json({
            status: false,
            message: "You must specify 4 options if type of question is MCQ."
          });
        }
        if (!(answer !== "" && ["a", "b", "c", "d"].includes(answer))) {
          // Answer is compulsory for MCQ question
          return res.status(400).json({
            status: false,
            message: "You must select answer from available options."
          });
        }
        updates.answer = answer;
        updates.options = {
          a: options.a,
          b: options.b,
          c: options.c,
          d: options.d
        };
      }
    }
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      updates
    );

    res.status(200).json({ status: true, updatedQuestion });
  } catch (error) {
    res.status(400).json({ status: false, error: "Something went wrong!" });
  }
});
router.delete("/:id", auth.verifyAdminToken, async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: "Question deleted." });
  } catch (error) {
    res.status(400).json({ status: false, error: "Something went wrong!" });
  }
});

module.exports = router;
