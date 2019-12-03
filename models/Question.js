const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: { type: String, required: true },
  type: { type: String, required: true },
  options: {
    A: { type: String },
    B: { type: String },
    C: { type: String },
    D: { type: String }
  },
  answer: { type: String },
  point: { type: Number },
  isActive: { type: Boolean, default: false },
  isRandom: { type: Boolean, default: true }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
