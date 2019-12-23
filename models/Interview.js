const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewSchema = Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  date: { type: Date, required: true },
  time: { type: Date, required: true }
});

const interview = mongoose.model("Interview", interviewSchema);

module.exports = interview;
