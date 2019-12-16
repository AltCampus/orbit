const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const User = require("../models/User");
const Question = require("../models/Question");
const Quiz = require("../models/Quiz");

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
      return res.status(200).send({
        canTakeQuiz: true,
        onGoing: false,
        submitted: false,
        message: "You've not taken the quiz yet."
      });
    }
    const quiz = await Quiz.findById(user.quiz).populate(
      "questions",
      "questionTitle type options"
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
      true;
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
    // console.log(
    //   user.canTakeQuiz,
    //   quiz.submittedTime,
    //   quiz.endTime.valueOf() > Date.now()
    // );
    return res
      .status(403)
      .json({ error: "Some Error occured. Please try again." });
  } catch (error) {
    return res
      .status(403)
      .json({ error: "Some Error occured. Please try again." });
  }
});

router.get("/generate", auth.verifyToken, async (req, res, next) => {
  if (!req.user.canTakeQuiz) {
    return res.status(403).json({ error: "You've already taken the quiz" });
  }
  if (req.user.stage <= 2) {
    return res
      .status(403)
      .json({ error: "You're not eligible for taking quiz yet." });
  }

  // User is eligible to take quiz. We can generate quiz with random questions

  const TOTAL_QUESTION_IN_QUIZ = 5;
  let quizQuestions = [];
  try {
    const fixedQuestions = await Question.find(
      {
        isActive: true,
        isRandom: false
      },
      "_id type options questionTitle"
    );
    quizQuestions = quizQuestions.concat(
      ...fixedQuestions.slice(0, TOTAL_QUESTION_IN_QUIZ)
    );

    const randomQuestions = await Question.find(
      {
        isActive: true,
        isRandom: true
      },
      "_id type options questionTitle"
    );
    const getRandomIndex = array => Math.floor(Math.random() * array.length);
    while (
      quizQuestions.length !== TOTAL_QUESTION_IN_QUIZ &&
      randomQuestions.length !== 0
    ) {
      const randomIndex = getRandomIndex(randomQuestions); // Get a random index
      quizQuestions.push(randomQuestions[randomIndex]); // Push random question to quiz
      randomQuestions.splice(randomIndex, 1); // Delete that random question from array of random questions
    }
    if (quizQuestions.length !== TOTAL_QUESTION_IN_QUIZ) {
      return res
        .status(403)
        .send({ error: "Some error occured. Please try again." });
    }
    // Add validation that number of questions required are been sent
    const newQuiz = await Quiz.create({
      questions: quizQuestions.map(question => question.id),
      startTime: Date.now(),
      endTime: new Date(Date.now() + 1800000)
    });
    await User.findByIdAndUpdate(req.user.id, {
      quiz: newQuiz.id,
      canTakeQuiz: false
    });
    res.json({
      questions: quizQuestions,
      timeLeft: newQuiz.endTime.valueOf() - Date.now()
    });
  } catch (error) {
    return res
      .status(403)
      .json({ error: "Some Error occured. Please try again." });
  }
});
router.get("/current", auth.verifyToken, async (req, res, next) => {
  // Route for getting current quiz in case of internet connection failure
  try {
    const user = await User.findById(req.user.id);
    if (!user.quiz) {
      return res.status(403).send({
        error: "You've not taken the quiz yet."
      });
    }
    const quiz = await Quiz.findById(user.quiz).populate(
      "questions",
      "questionTitle type options"
    );
    if (quiz.submittedTime) {
      return res
        .status(403)
        .json({ error: "You've already submitted the quiz." });
    }
    if (quiz.endTime.valueOf() < Date.now()) {
      return res.status(403).json({ error: "You've ran out of time." });
    }
    res
      .status(200)
      .json({ quiz, timeLeft: quiz.endTime.valueOf() - Date.now() });
    // console.log(user);
  } catch (error) {
    return (
      res -
      Date.now()
        .status(403)
        .json({ error: "Some Error occured. Please try again." })
    );
  }
});
router.post("/current", auth.verifyToken, async (req, res, next) => {
  // Route for submitting current quiz
  try {
    const user = await User.findById(req.user.id);
    if (!user.quiz) {
      // User have not taken quiz yet.
      return res.status(403).send({
        error: "You've not taken the quiz yet."
      });
    }

    const quiz = await Quiz.findById(user.quiz).populate(
      "questions",
      "questionTitle type options"
    );
    if (quiz.submittedTime) {
      // User has already submitted quiz
      return res
        .status(403)
        .json({ error: "You've already submitted the quiz." });
    }
    if (quiz.endTime.valueOf() + 60000 < Date.now()) {
      // User failed to submit quiz on time
      return res.status(403).json({ error: "You've ran out of time." });
    }
    const answers = req.body.answers.map(question => {
      return { question: question.question, answerSubmitted: question.answer };
    });
    console.log(answers);
    for (let i = 0; i < answers.length; i++) {}
    if (answers.length !== quiz.questions.length) {
      return res
        .status(403)
        .json({ error: "Some Error occured. Please try again." });
    }
    await Quiz.findByIdAndUpdate(quiz._id, {
      submittedTime: Date.now(),
      answers: answers
    });
    res
      .status(200)
      .json({ success: true, message: "Your answers has been submitted" });
    // console.log(user);
  } catch (error) {
    return res
      .status(403)
      .json({ error: "Some Error occured. Please try again." });
  }
});

module.exports = router;
