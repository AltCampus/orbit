const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  questions: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Question"
    }
  ],
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  submittedTime: {
    type: Date
  },
  totalScore: {
    type: Number
  },
  maximumScore: {
    type: Number
  },
  answers: [
    {
      question: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Question"
      },
      answerSubmitted: {
        type: String
      },
      score: {
        type: Number
      }
    }
  ]
});

module.exports = mongoose.model("Quiz", quizSchema);
