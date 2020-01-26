const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const User = require("../models/User");
const Question = require("../models/Question");
const Quiz = require("../models/Quiz");
const config = require("../utils/config");
const calculateScore = require("../utils/calculateScore");
const Timeline = require("../models/Timeline");
const timelineCreator = require("../utils/timelineCreator");

router.get("/status", auth.verifyToken, async (req, res, next) => {
  // Route for getting status of stage 3
  try {
    const user = await User.findById(req.user.id);
    if (req.user.stage <= 2) {
      return res.status(200).json({
        canTakeQuiz: false,
        onGoing: false,
        submitted: false,
        message: "You're not eligible for taking quiz yet."
      });
    }
    if (!user.quiz && user.canTakeQuiz) {
      try {
        const questions = await Question.find({ isActive: true }, "time");
        const quizTimeLength = questions.reduce(
          (acc, question) => acc + question.time,
          0
        );
        return res.status(200).send({
          canTakeQuiz: true,
          quizTimeLength,
          onGoing: false,
          submitted: false,
          message: "You've not taken the quiz yet."
        });
      } catch (error) {
        return res
          .status(403)
          .json({ status: false, error: "Something went wrong!" });
      }
    }
    const quiz = await Quiz.findById(user.quiz).populate(
      "questions",
      "questionTitle questionDescription type options"
    );
    if (!user.canTakeQuiz && quiz.submittedTime) {
      return res.status(200).json({
        canTakeQuiz: false,
        onGoing: false,
        submitted: true,
        message: "You've already taken the quiz"
      });
    }
    if (quiz.endTime.valueOf() < Date.now()) {
      if (quiz.answers) {
        await Quiz.findByIdAndUpdate(quiz._id, {
          submittedTime: Date.now()
        });
        // Update user stage to 4
        await User.findByIdAndUpdate(req.user.id, { stage: 4 });
        await Timeline.create({
          user: req.user.id,
          ...timelineCreator("QUIZ_AUTO_SUBMITTED", {
            name: user.name,
            endTime: quiz.endTime
          })
        });
        return res.status(200).json({
          canTakeQuiz: false,
          onGoing: false,
          submitted: true,
          stageUpgraded: true
        });
      }
      return res.status(200).json({
        canTakeQuiz: false,
        onGoing: false,
        submitted: false,
        message: "You've ran out of time."
      });
    }
    if (
      !user.canTakeQuiz &&
      !quiz.submittedTime &&
      quiz.endTime.valueOf() > Date.now()
    ) {
      return res.status(200).json({
        canTakeQuiz: false,
        onGoing: true,
        submitted: false,
        message: "You still have time to submit quiz."
      });
    }

    return res
      .status(403)
      .json({ status: false, error: "Something went wrong!" });
  } catch (error) {
    return res
      .status(403)
      .json({ status: false, error: "Something went wrong!" });
  }
});

router.get("/generate", auth.verifyToken, async (req, res, next) => {
  if (!req.user.canTakeQuiz) {
    return res
      .status(403)
      .json({ status: false, error: "You've already taken the quiz" });
  }
  if (req.user.stage <= 2) {
    return res.status(403).json({
      status: false,
      error: "You're not eligible for taking quiz yet."
    });
  }

  // User is eligible to take quiz. We can generate quiz with questions in random order

  let quizQuestions = [];
  try {
    const fixedQuestions = await Question.find(
      {
        isActive: true
      },
      "_id type options time questionTitle questionDescription"
    );

    const getRandomIndex = array => Math.floor(Math.random() * array.length);
    while (fixedQuestions.length !== 0) {
      const randomIndex = getRandomIndex(fixedQuestions); // Get a random index
      quizQuestions.push(fixedQuestions[randomIndex]); // Push random question to quiz
      fixedQuestions.splice(randomIndex, 1); // Delete that random question from array of random questions
    }
    const totalTime = quizQuestions.reduce((acc, val) => acc + val.time, 0);
    // Add validation that number of questions required are been sent
    const newQuiz = await Quiz.create({
      user: req.user.id,
      questions: quizQuestions.map(question => question.id),
      startTime: Date.now(),
      endTime: new Date(Date.now() + totalTime * 1000)
    });
    await User.findByIdAndUpdate(req.user.id, {
      quiz: newQuiz.id,
      canTakeQuiz: false
    });
    // Add to timeline that user started the quiz
    await Timeline.create({
      user: req.user.id,
      ...timelineCreator("QUIZ_STARTED", {
        name: req.user.name
      })
    });
    res.json({
      questions: quizQuestions,
      timeLeft: newQuiz.endTime.valueOf() - Date.now()
    });
  } catch (error) {
    return res
      .status(403)
      .json({ status: false, error: "Something went wrong!" });
  }
});
router.get("/current", auth.verifyToken, async (req, res, next) => {
  // Route for getting current quiz in case of internet connection failure
  try {
    const user = await User.findById(req.user.id);
    if (!user.quiz) {
      return res.status(403).send({
        status: false,
        error: "You've not taken the quiz yet."
      });
    }
    const quiz = await Quiz.findById(user.quiz).populate(
      "questions",
      "questionTitle questionDescription type options"
    );
    if (quiz.submittedTime) {
      return res
        .status(403)
        .json({ status: false, error: "You've already submitted the quiz." });
    }
    if (quiz.endTime.valueOf() < Date.now()) {
      return res
        .status(403)
        .json({ status: false, error: "You've ran out of time." });
    }
    let questionsToSend = quiz.questions;
    if (quiz.answers && quiz.answers.length > 0) {
      questionsToSend = quiz.questions.map(question => {
        const answerLinked = quiz.answers.filter(answer => {
          return String(answer.question) === String(question._id);
        })[0];
        const {
          _id,
          questionTitle,
          questionDescription,
          type,
          options
        } = question;
        return {
          _id,
          questionTitle,
          type,
          questionDescription,
          options,
          answer: answerLinked && answerLinked.answerSubmitted
        };
      });
    }
    res.status(200).json({
      quiz: { questions: questionsToSend },
      timeLeft: quiz.endTime.valueOf() - Date.now()
    });
  } catch (error) {
    return res
      .status(403)
      .json({ status: false, error: "Something went wrong!" });
  }
});
router.put("/current", auth.verifyToken, async (req, res, next) => {
  // Route for updating current quiz submission
  try {
    const user = await User.findById(req.user.id);
    if (!user.quiz) {
      // User have not taken quiz yet.
      return res.status(403).send({
        status: false,
        error: "You've not taken the quiz yet."
      });
    }

    const quiz = await Quiz.findById(user.quiz);
    if (quiz.submittedTime) {
      // User has already submitted quiz
      return res
        .status(403)
        .json({ status: false, error: "You've already submitted the quiz." });
    }
    if (quiz.endTime.valueOf() + 60000 < Date.now()) {
      // User failed to submit quiz on time
      return res
        .status(403)
        .json({ status: false, error: "You've ran out of time." });
    }
    const questionIds = quiz.questions.map(question => String(question));
    const answers = req.body.answers.map(question => {
      return { question: question.question, answerSubmitted: question.answer };
    });
    if (answers.length !== quiz.questions.length) {
      return res
        .status(403)
        .json({ status: false, error: "Please answer all the questions." });
    }
    for (let i = 0; i < answers.length; i++) {
      if (questionIds.indexOf(answers[i].question) === -1) {
        return res
          .status(403)
          .json({ status: false, error: "Don't try to manipulate with data" });
      }
    }
    const answerIds = answers.map(question => question.question);
    for (let i = 0; i < quiz.questions.length; i++) {
      if (answerIds.indexOf(String(quiz.questions[i])) === -1) {
        return res
          .status(403)
          .json({ status: false, error: "Don't try to manipulate with data" });
      }
    }

    await Quiz.findByIdAndUpdate(quiz._id, {
      answers: answers
    });
    res
      .status(200)
      .json({ success: true, message: "Your answers has been submitted" });
  } catch (error) {
    return res
      .status(403)
      .json({ status: false, error: "Something went wrong!" });
  }
});
router.post("/current", auth.verifyToken, async (req, res, next) => {
  // Route for submitting current quiz
  try {
    const user = await User.findById(req.user.id);
    if (!user.quiz) {
      // User have not taken quiz yet.
      return res.status(403).send({
        status: false,
        error: "You've not taken the quiz yet."
      });
    }

    const quiz = await Quiz.findById(user.quiz);
    if (quiz.submittedTime) {
      // User has already submitted quiz
      return res
        .status(403)
        .json({ status: false, error: "You've already submitted the quiz." });
    }
    if (quiz.endTime.valueOf() + 60000 < Date.now()) {
      // User failed to submit quiz on time
      return res
        .status(403)
        .json({ status: false, error: "You've ran out of time." });
    }
    const questionIds = quiz.questions.map(question => String(question));
    const answers = req.body.answers
      .map(question => {
        return {
          question: question.question,
          answerSubmitted: question.answer
        };
      })
      .filter(question => question.answerSubmitted);
    if (answers.length !== quiz.questions.length) {
      return res
        .status(403)
        .json({ status: false, error: "Please answer all the questions." });
    }
    for (let i = 0; i < answers.length; i++) {
      if (questionIds.indexOf(answers[i].question) === -1) {
        return res
          .status(403)
          .json({ status: false, error: "Don't try to manipulate with data" });
      }
    }
    const answerIds = answers.map(question => question.question);
    for (let i = 0; i < quiz.questions.length; i++) {
      if (answerIds.indexOf(String(quiz.questions[i])) === -1) {
        return res
          .status(403)
          .json({ status: false, error: "Don't try to manipulate with data" });
      }
    }
    await Quiz.findByIdAndUpdate(quiz._id, {
      submittedTime: Date.now(),
      answers: answers
    });
    // Update user stage to 4
    await User.findByIdAndUpdate(req.user.id, { stage: 4 });
    await Timeline.create({
      user: req.user.id,
      ...timelineCreator("QUIZ_SUBMITTED", {
        name: user.name
      })
    });
    res
      .status(200)
      .json({ success: true, message: "Your answers has been submitted" });
  } catch (error) {
    return res
      .status(403)
      .json({ status: false, error: "Something went wrong!" });
  }
});
router.get("/all", auth.verifyAdminToken, async (req, res) => {
  const allQuiz = await Quiz.find({});
  res.json({ allQuiz });
});

router.get("/:id", auth.verifyAdminToken, async (req, res) => {
  // Route for getting any quiz submission
  try {
    const quizId = req.params.id;
    let quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ status: false, error: "Quiz not found." });
    }
    if (quiz.answers) {
      quiz = await Quiz.findById(quizId).populate("answers.question");
    } else {
      return res.status(200).json({
        status: {
          onGoing: false,
          timeOut: false,
          submitted: false
        }
      });
    }
    if (quiz.submittedTime) {
      return res.status(200).json({
        status: {
          onGoing: false,
          timeOut: false,
          submitted: true
        },
        user: quiz.user,
        totalScore: quiz.totalScore,
        maximumScore: quiz.maximumScore,
        submittedTime: quiz.submittedTime,
        startTime: quiz.startTime,
        answers: quiz.answers
      });
    } else {
      if (quiz.endTime < Date.now()) {
        return res.status(200).json({
          status: {
            onGoing: false,
            timeOut: true,
            submitted: false
          },
          startTime: quiz.startTime,
          answers: quiz.answers
        });
      } else {
        return res.status(200).json({
          status: {
            onGoing: true,
            timeOut: false,
            submitted: false
          }
        });
      }
    }
  } catch (error) {
    return res
      .status(403)
      .json({ status: false, error: "Something went wrong!" });
  }
});

router.post("/:id", auth.verifyAdminToken, async (req, res) => {
  // Route for rating quiz submission
  try {
    const quizId = req.params.id;
    let quiz = await Quiz.findById(quizId).populate("questions");
    if (!quiz) {
      return res.status(404).json({ status: false, error: "Quiz not found." });
    }
    if (!quiz.answers) {
      return res.status(403).json({
        status: false,
        error: "Quiz has no answers to rate this quiz submission."
      });
    }
    if (!quiz.submittedTime) {
      return res
        .status(403)
        .json({ status: false, error: "Quiz was never submitted by user." });
    }
    for (let i = 0; i < quiz.answers.length; i++) {
      quiz.answers[i].score = req.body[quiz.answers[i].question];
    }
    quiz.totalScore = Object.values(req.body).reduce(
      (acc, val) => acc + val,
      0
    );
    quiz.maximumScore = quiz.questions.reduce((acc, val) => acc + val.point, 0);
    await quiz.save();
    await calculateScore(quiz.user);
    await Timeline.create({
      user: quiz.user,
      ...timelineCreator("QUIZ_REVIEWED", {
        adminName: req.user.name,
        score: quiz.totalScore,
        maximumScore: quiz.maximumScore
      })
    });
    res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(403)
      .json({ status: false, error: "Something went wrong!" });
  }
});
module.exports = router;
