const mongoose = require("mongoose");

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    html: {
      taskUrl: {
        type: String
      },
       userId: {
         type: String
       },
      startTime: {
        type: Date
      },
      submitTime: {
        type: Date
      },
      score: {
        type: Number
      },
      review: {
        type: String
      }
    },
    codewars: {
      codewarsUsername: {
        type: String
      },
      startTime: {
        type: Date
      },
      timeLimit: {
        type: Number
      },
      katasSolved: {
        type: Number
      },
      score: {
        type: Number
      }
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
