const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionTitle: { type: String, required: true },
  type: { type: String, required: true, enum: ["MCQ", "subjective"] },
  options: {
    a: { type: String },
    b: { type: String },
    c: { type: String },
    d: { type: String }
  },
  answer: { type: String },
  point: { type: Number },
  isActive: { type: Boolean, default: false },
  isRandom: { type: Boolean, default: true }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
