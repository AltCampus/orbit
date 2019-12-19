const express = require("express");
const https = require("https");
const router = express.Router();

const Task = require("../models/Task");
const User = require("../models/User");
const Quiz = require("../models/Quiz");
const auth = require("../utils/auth");

router.get("/all/status", auth.verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.user.task);
    const stageUpdated = false;
    if (req.user.stage === 1) {
      // user has not submitted any task yet
      return res.status(200).json({
        html: {
          onGoing: true,
          completed: false
        },
        codewars: {
          reachedStage: false,
          onGoing: false
        },
        quiz: {
          reachedStage: false,
          onGoing: false
        },
        interview: {
          reachedStage: false,
          approvedForInterview: false,
          onGoing: false
        }
      });
    }
    const htmlTaskStatus = {
      onGoing: false,
      completed: true,
      submissionLink: task.html.taskUrl,
      submissionTime: task.html.submitTime
    };
    if (req.user.stage === 2) {
      if (task.codewars.endTime && task.codewars.startTime) {
        // User has submitted his username
        if (task.codewars.endTime < Date.now()) {
          // Timer is complete. User is now on stage 3
          await User.findByIdAndUpdate(req.user.id, { stage: 3 });
          req.user.stage = 3;
          stageUpdated = true;
        } else {
          // Timer is currently running
          return res.status(200).json({
            html: htmlTaskStatus,
            codewars: {
              reachedStage: true,
              onGoing: true,
              usernameSubmitted: true,
              completed: false,
              username: task.codewars.codewarsUsername,
              timeLeft: task.codewars.endTime - Date.now(),
              startTime: task.codewars.startTime,
              endTime: task.codewars.endTime
            },
            quiz: {
              reachedStage: false,
              onGoing: false
            },
            interview: {
              reachedStage: false,
              approvedForInterview: false,
              onGoing: false
            }
          });
        }
      } else {
        // User has not submitted his username
        return res.status(200).json({
          html: htmlTaskStatus,
          codewars: {
            reachedStage: true,
            onGoing: false,
            usernameSubmitted: false,
            completed: false
          },
          quiz: {
            reachedStage: false,
            onGoing: false
          },
          interview: {
            reachedStage: false,
            approvedForInterview: false,
            onGoing: false
          }
        });
      }
    }
    const codewarsTaskStatus = {
      reachedStage: true,
      onGoing: false,
      usernameSubmitted: true,
      completed: true,
      username: task.codewars.codewarsUsername,
      startTime: task.codewars.startTime,
      endTime: task.codewars.endTime
    };
    if (req.user.stage === 3) {
      if (!req.user.quiz && req.user.canTakeQuiz) {
        // if user can take the quiz but has not taken yet
        return res.status(200).send({
          html: htmlTaskStatus,
          codewars: codewarsTaskStatus,
          quiz: {
            reachedStage: true,
            canTakeQuiz: true,
            onGoing: false,
            submitted: false,
            message: "You've not taken the quiz yet."
          },
          interview: {
            reachedStage: false,
            approvedForInterview: false,
            onGoing: false
          },
          stageUpdated
        });
      } else {
        // If user has started the quiz
        const quiz = await Quiz.findById(req.user.quiz);
        if (!req.user.canTakeQuiz && quiz.submittedTime) {
          // User has submitted the quiz
          return res.status(200).json({
            html: htmlTaskStatus,
            codewars: codewarsTaskStatus,
            quiz: {
              reachedStage: true,
              canTakeQuiz: false,
              onGoing: false,
              submitted: true,
              startTime: quiz.startTime,
              submittedTime: quiz.submittedTime
            },
            interview: {
              reachedStage: false,
              approvedForInterview: false,
              onGoing: false
            },
            stageUpdated
          });
        }
        if (quiz.endTime.valueOf() < Date.now()) {
          // User has not submitted the quiz on time
          return res.status(200).json({
            html: htmlTaskStatus,
            codewars: codewarsTaskStatus,
            quiz: {
              reachedStage: true,
              canTakeQuiz: false,
              onGoing: false,
              submitted: false,
              failedToSubmit: true,
              startTime: quiz.startTime
            },
            interview: {
              reachedStage: false,
              approvedForInterview: false,
              onGoing: false
            },
            stageUpdated
          });
        }
        if (
          !req.user.canTakeQuiz &&
          !quiz.submittedTime &&
          quiz.endTime.valueOf() > Date.now()
        ) {
          // User quiz is currently ongoing
          return res.status(200).json({
            html: htmlTaskStatus,
            codewars: codewarsTaskStatus,
            quiz: {
              reachedStage: true,
              canTakeQuiz: false,
              onGoing: true,
              submitted: false,
              startTime: quiz.startTime,
              timeLeft: quiz.endTime.valueOf() - Date.now()
            },
            interview: {
              reachedStage: false,
              approvedForInterview: false,
              onGoing: false
            },
            stageUpdated
          });
        }
      }
    }

    // Response was not send
    return res
      .status(403)
      .json({ error: "Some Error occured. Please try again." });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, error: "Some Error Occurred" });
  }
});
router.post("/one/save", auth.verifyToken, async (req, res) => {
  let { url = "" } = req.body;
  let { id } = req.user;
  const updatedTask = {
    taskUrl: url,
    submitTime: Date.now()
  };
  if (req.user.stage !== 1) {
    // Check if user already is on stage 1
    return res.status(400).json({
      status: false,
      error: "You've already send your HTML assignment link"
    });
  }
  if (url.indexOf("https://codesandbox.io/s") !== 0) {
    return res
      .status(400)
      .json({ status: false, error: "Invalid Sandbox Url" });
  }
  try {
    // Update task with submission time and sandbox url
    const newTask = await Task.findById(req.user.task);
    newTask.html = {
      ...newTask.html,
      ...updatedTask
    };
    await newTask.save();

    // Update user stage to 2
    await User.findByIdAndUpdate(req.user.id, { stage: 2 });
    return res.status(201).json({ status: true, success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: "Some Error Occured" });
  }
});

// Check status of codewars task
router.get("/two/status", auth.verifyToken, async (req, res) => {
  let { id } = req.user;
  // send request to codewars api to validate username
  if (req.user.stage > 2) {
    // Check if user is not on stage 2
    return res
      .status(200)
      .json({ onGoing: false, completed: true, timeLeft: null });
  }
  const task = await Task.findById(req.user.task);

  if (req.user.stage === 2 && task.codewars.endTime > Date.now()) {
    return res.status(200).json({
      onGoing: true,
      completed: false,
      timeLeft: task.codewars.endTime - Date.now()
    });
  }

  if (req.user.stage === 2 && task.codewars.endTime < Date.now()) {
    // Update user stage to 3
    await User.findByIdAndUpdate(req.user.id, { stage: 3 });
    return res.status(200).json({
      stageUpdated: true,
      onGoing: false,
      timeLeft: null,
      completed: true
    });
  }
  res.json({ error: "Some error occured." });
});

// Save CodeWars username

router.post("/two/save", auth.verifyToken, (req, res) => {
  let { username = "" } = req.body;
  let { id } = req.user;
  // send request to codewars api to validate username
  if (req.user.stage !== 2) {
    // Check if user already is on stage 2
    return res.status(400).json({
      status: false,
      error: "You've already send your codewars username."
    });
  }
  https
    .get(
      `https://www.codewars.com/api/v1/users/${username}`,
      async apiResponse => {
        console.log(apiResponse.statusCode);
        if (apiResponse.statusCode === 200) {
          // Username is valid
          // const endTime = new Date(Date.now() + 259200 * 1000);
          const endTime = new Date(Date.now() + 300000);
          console.log(endTime);
          const codewarsTask = {
            codewarsUsername: username,
            startTime: Date.now(),
            endTime,
            timeLimit: 259200
          };

          try {
            // Update task with start time and username
            const newTask = await Task.findById(req.user.task);
            newTask.codewars = {
              ...codewarsTask
            };
            await newTask.save();

            return res.status(201).json({
              status: true,
              success: true,
              onGoing: true,
              completed: false,
              timeLeft: endTime - Date.now()
            });
          } catch (error) {
            console.log(error);
            return res
              .status(400)
              .json({ status: false, error: "Some Error Occured" });
          }
        } else {
          // Username is invalid
          console.log("invalid");
          return res
            .status(400)
            .json({ status: false, error: "Invalid Codewars Username" });
        }
      }
    )
    .on("error", e => {
      console.error(e);
      return res
        .status(400)
        .json({ status: false, error: "Some Error Occurred" });
    });
});

module.exports = router;
