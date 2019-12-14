const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewSchema = Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  time: String,
  date: String
});

const interview = mongoose.model("Interview", interviewSchema);

module.exports = interview;
