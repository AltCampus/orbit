const express = require("express");
const https = require("https");
const router = express.Router();
const axios = require("axios");

const Task = require("../models/Task");
const User = require("../models/User");
const Quiz = require("../models/Quiz");
const Interview = require("../models/Interview");
const auth = require("../utils/auth");
const config = require("../utils/config");
const Timeline = require("../models/Timeline");
const timelineCreator = require("../utils/timelineCreator");

router.get("/all/status", auth.verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.user.task);
    let stageUpdated = false;
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
          reachedStage: false
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
          await Timeline.create({
            user: req.user._id,
            ...timelineCreator("TASK_TWO_ENDED", {
              name: req.user.name,
              endTime: task.codewars.endTime,
              codewarsUsername: task.codewars.codewarsUsername
            })
          });
          await Timeline.create({
            user: req.user._id,
            ...timelineCreator("STAGE_UPDATED_TO_THREE", {
              name: req.user.name
            })
          });
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
              reachedStage: false
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
            reachedStage: false
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
      endTime: task.codewars.forceSubmitTime || task.codewars.endTime
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
            reachedStage: false
          },
          stageUpdated
        });
      } else {
        // If user has started the quiz
        const quiz = await Quiz.findById(req.user.quiz);
        // if (!req.user.canTakeQuiz && quiz.submittedTime) {
        //   // User has submitted the quiz
        //   return res.status(200).json({
        //     html: htmlTaskStatus,
        //     codewars: codewarsTaskStatus,
        //     quiz: {
        //       reachedStage: true,
        //       canTakeQuiz: false,
        //       onGoing: false,
        //       submitted: true,
        //       startTime: quiz.startTime,
        //       submittedTime: quiz.submittedTime
        //     },
        //     interview: {
        //       reachedStage: false,
        //
        //       onGoing: false
        //     },
        //     stageUpdated
        //   });
        // }
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
              reachedStage: false
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
              endTime: quiz.endTime,
              timeLeft: quiz.endTime.valueOf() - Date.now()
            },
            interview: {
              reachedStage: false
            },
            stageUpdated
          });
        }
      }
    }
    const quiz = await Quiz.findById(req.user.quiz);

    const quizStatus = {
      reachedStage: true,
      canTakeQuiz: false,
      onGoing: false,
      submitted: true,
      startTime: quiz.startTime,
      submittedTime: quiz.submittedTime
    };
    if (req.user.stage === 4) {
      if (req.user.canScheduleInterview) {
        return res.status(200).json({
          html: htmlTaskStatus,
          codewars: codewarsTaskStatus,
          quiz: quizStatus,
          interview: {
            reachedStage: true,
            canScheduleInterview: true,
            hasScheduledInterview: false,
            isReviewInProgress: false,
            isFinalReviewInProgress: false,
            rejectedForInterview: false
          }
        });
      }
      if (!req.user.canScheduleInterview) {
        // User can't schdeule interview
        if (req.user.interview) {
          // User has scheduled interview already. Send the details
          const interview = await Interview.findById(req.user.interview);
          if (new Date(interview.endTime).valueOf() < Date.now().valueOf()) {
            // Interview has ended. Application is under final Review
            switch (req.user.status) {
              case "reject":
                return res.status(200).json({
                  html: htmlTaskStatus,
                  codewars: codewarsTaskStatus,
                  quiz: quizStatus,
                  interview: {
                    reachedStage: true,
                    canScheduleInterview: false,
                    hasScheduledInterview: true,
                    isReviewInProgress: false,
                    isFinalReviewInProgress: false,
                    rejectedForInterview: false,
                    startTime: interview.startTime,
                    endTime: interview.endTime,
                    rejectedAfterInterview: true,
                    selectedAfterInterview: false
                  }
                });
              case "pending":
                return res.status(200).json({
                  html: htmlTaskStatus,
                  codewars: codewarsTaskStatus,
                  quiz: quizStatus,
                  interview: {
                    reachedStage: true,
                    canScheduleInterview: false,
                    hasScheduledInterview: true,
                    isReviewInProgress: true,
                    isFinalReviewInProgress: true,
                    rejectedForInterview: false,
                    startTime: interview.startTime,
                    endTime: interview.endTime,
                    rejectedAfterInterview: false,
                    selectedAfterInterview: false
                  }
                });
              case "accept":
                return res.status(200).json({
                  html: htmlTaskStatus,
                  codewars: codewarsTaskStatus,
                  quiz: quizStatus,
                  interview: {
                    reachedStage: true,
                    canScheduleInterview: false,
                    hasScheduledInterview: true,
                    isReviewInProgress: false,
                    isFinalReviewInProgress: false,
                    rejectedForInterview: false,
                    startTime: interview.startTime,
                    endTime: interview.endTime,
                    rejectedAfterInterview: false,
                    selectedAfterInterview: true
                  }
                });
            }
          } else {
            // Interview is yet to take place
            return res.status(200).json({
              html: htmlTaskStatus,
              codewars: codewarsTaskStatus,
              quiz: quizStatus,
              interview: {
                reachedStage: true,
                canScheduleInterview: false,
                hasScheduledInterview: true,
                isReviewInProgress: false,
                isFinalReviewInProgress: false,
                rejectedForInterview: false,
                startTime: interview.startTime,
                endTime: interview.endTime
              }
            });
          }
        } else {
          // User application is under review
          if (req.user.status === "pending") {
            return res.status(200).json({
              html: htmlTaskStatus,
              codewars: codewarsTaskStatus,
              quiz: quizStatus,
              interview: {
                reachedStage: true,
                canScheduleInterview: false,
                hasScheduledInterview: false,
                isReviewInProgress: true,
                isFinalReviewInProgress: false,
                rejectedForInterview: false
              }
            });
          } else {
            // User has been rejected for interview
            return res.status(200).json({
              html: htmlTaskStatus,
              codewars: codewarsTaskStatus,
              quiz: quizStatus,
              interview: {
                reachedStage: true,
                canScheduleInterview: false,
                hasScheduledInterview: false,
                isReviewInProgress: false,
                isFinalReviewInProgress: false,
                rejectedForInterview: true
              }
            });
          }
        }
      }
    }
    // Response was not send
    return res.status(200).json({
      html: htmlTaskStatus,
      codewars: codewarsTaskStatus,
      quiz: quizStatus,
      interview: {
        reachedStage: true,
        canScheduleInterview: false,
        pendingApproval: false,
        hasScheduleInterview: true
      }
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, error: "Something went wrong!" });
  }
});
router.post("/1/save", auth.verifyToken, async (req, res) => {
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
  const csbRegex = /https?:\/\/([a-z0-9]+[.])*csb[.]app/;

  if (url.indexOf("https://codesandbox.io/s") !== 0 && !csbRegex.test(url)) {
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
    // Add to timeline that task 1 was submitted
    await Timeline.create({
      user: req.user._id,
      ...timelineCreator("TASK_ONE_SUBMITTED", {
        name: req.user.name,
        csbLink: url
      })
    });
    return res.status(201).json({ status: true, success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, error: "Something went wrong!" });
  }
});

// Check status of codewars task
router.get("/2/status", auth.verifyToken, async (req, res) => {
  try {
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
      await Timeline.create({
        user: req.user._id,
        ...timelineCreator("TASK_TWO_ENDED", {
          name: req.user.name,
          endTime: task.codewars.endTime,
          codewarsUsername: task.codewars.codewarsUsername
        })
      });
      await Timeline.create({
        user: req.user._id,
        ...timelineCreator("STAGE_UPDATED_TO_THREE", { name: req.user.name })
      });
      return res.status(200).json({
        stageUpdated: true,
        onGoing: false,
        timeLeft: null,
        completed: true
      });
    }
    if (req.user.stage === 2 && !task.codewars.codewarsUsername) {
      return res.status(200).json({
        stageUpdated: false,
        onGoing: false,
        timeLeft: null,
        completed: false
      });
    }
    res.status(400).json({ error: "Something went wrong!" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, error: "Something went wrong!" });
  }
});

// Save CodeWars username

router.post("/2/save", auth.verifyToken, (req, res) => {
  let { username = "" } = req.body;
  let { id } = req.user;
  // send request to codewars api to validate username
  if (username.indexOf("https://www.codewars.com/users/") === 0) {
    // If it is codewars profile link
    username = username.replace("https://www.codewars.com/users/", "");
  }
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
        if (apiResponse.statusCode === 200) {
          // Username is valid
          // const endTime = new Date(Date.now() + 259200 * 1000);
          const endTime = new Date(
            Date.now() + config.TIME_FOR_CODEWARS_ASSIGNMENT * 86400 * 1000
          );
          const codewarsTask = {
            codewarsUsername: username,
            startTime: Date.now(),
            endTime
          };

          try {
            // Update task with start time and username
            const newTask = await Task.findById(req.user.task);
            newTask.codewars = {
              ...codewarsTask
            };
            await newTask.save();
            await Timeline.create({
              user: req.user._id,
              ...timelineCreator("TASK_TWO_STARTED", {
                name: req.user.name,
                codewarsUsername: username
              })
            });

            return res.status(201).json({
              status: true,
              success: true,
              onGoing: true,
              completed: false,
              timeLeft: endTime - Date.now()
            });
          } catch (error) {
            return res
              .status(400)
              .json({ status: false, error: "Something went wrong!" });
          }
        } else {
          // Username is invalid
          return res
            .status(400)
            .json({ status: false, error: "Invalid Codewars Username" });
        }
      }
    )
    .on("error", e => {
      return res
        .status(400)
        .json({ status: false, error: "Something went wrong!" });
    });
});

router.delete("/2/end", auth.verifyToken, async (req, res) => {
  try {
    let { id } = req.user;
    // send request to codewars api to validate username
    if (req.user.stage !== 2) {
      // Check if user is not on stage 2
      return res
        .status(400)
        .json({ status: false, error: "You're not on stage 2." });
    }

    // Update task with start time and username
    const newTask = await Task.findById(req.user.task);
    newTask.codewars.forceSubmitTime = Date.now();
    await newTask.save();

    // Update user stage to 3
    await User.findByIdAndUpdate(req.user.id, { stage: 3 });
    await Timeline.create({
      user: req.user._id,
      ...timelineCreator("FORCEFULLY_SUBMITTED_TASK_THREE", {
        name: req.user.name
      })
    });
    return res.status(200).json({
      status: true,
      message: "Your CodeWars task was marked as completed!"
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, error: "Something went wrong!" });
  }
});

// Get Number Of Kata's Solved by User

router.post("/two/katas", auth.verifyAdminToken, (req, res) => {
  let task = req.body.props.task;
  let codewars = req.body.props.task.codewars;
  const getKatas = async () => {
    try {
      const response = await axios.get(
        `https://www.codewars.com/api/v1/users/${codewars.codewarsUsername}/code-challenges/completed?page=0`
      );
      const filteredArray = response.data.data.filter(
        kata => kata.completedAt > codewars.startTime
      );
      const refilteredArray = filteredArray.filter(
        kata => kata.completedAt < codewars.endTime
      );
      const katasSolved = refilteredArray.length;

      // Save number of katas solved to backend
      try {
        updatedTask = {
          katasSolved: katasSolved
        };

        const newTask = await Task.findById(task._id);
        newTask.codewars = {
          ...newTask.codewars,
          ...updatedTask
        };
        await newTask.save();
      } catch (err) {}

      return res.status(200).json({
        data: { katasSolved },
        status: true,
        message: "Successfully fetch data from codewars API!"
      });
    } catch (error) {
      return res
        .status(400)
        .json({ status: false, error: "Something went wrong!" });
    }
  };
  getKatas();
});

module.exports = router;
