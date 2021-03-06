const mongoose = require("mongoose");

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User"
    },
    html: {
      taskUrl: {
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
      endTime: {
        type: Date
      },
      forceSubmitTime: {
        type: Date
      },
      katasSolved: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    quiz: { type: mongoose.SchemaTypes.ObjectId, ref: "Quiz" }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
