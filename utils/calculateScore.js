const User = require("../models/User");
const config = require("./config");

const calculateScore = async userId => {
  try {
    let user = await User.findById(
      { _id: userId },
      "-password -hashMail -__v -isAdmin -isProfileClaimed"
    )
      .populate("task")
      .populate("interview")
      .populate("quiz");

    let totalScore = 0;
    if (user.task) {
      if (user.task.html && user.task.html.score != null) {
        totalScore =
          totalScore + (user.task.html.score / 10) * config.SCORE_FOR_HTML;
      }
      if (user.task.codewars && user.task.codewars.score != null) {
        totalScore =
          totalScore +
          (user.task.codewars.score / 10) * config.SCORE_FOR_CODEWARS;
      }
    }
    if (user.quiz) {
      if (user.quiz.totalScore != null) {
        totalScore =
          totalScore +
          (user.quiz.totalScore / user.quiz.maximumScore) *
            config.SCORE_FOR_QUIZ;
      }
    }
    if (user.interview) {
      if (user.interview.score != null) {
        totalScore =
          totalScore + (user.interview.score / 10) * config.SCORE_FOR_INTERVIEW;
      }
    }
    console.log(totalScore);
    await User.findByIdAndUpdate(userId, { totalScore: totalScore });
  } catch (error) {
    console.log(error);
  }
};

module.exports = calculateScore;
