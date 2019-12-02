const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    html: {
      instruction: {
        type: String,
        required: true
      },
      taskImage: {
        type: String,
        required: true
      },
      resourceLink: {
        type: String,
        required: true
      },
      startTime: {
        type: Date,
        required: true
      },
      submitTime: {
        type: Date,
        required: true
      },
      timeLimit: {
        type: Number,
        required: true
      },
      score: {
        type: Number,
        required: true
      },
      review: {
        type: String,
        required: true
      }
    },
    codewars: {
      instruction: {
        type: String,
        required: true
      },
      resourceLink: {
        type: String,
        required: true
      },
      startTime: {
        type: Date,
        required: true
      },
      timeLimit: {
        type: Number,
        required: true
      },
      katasSolved: {
        type: Number,
        required: true
      },
      score: {
        type: Number,
        required: true
      }
    }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
