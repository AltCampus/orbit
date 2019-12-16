const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewSchema = Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User"
    },
    scheduleEvent: {
      uuid: String,
      start_time: Date,
      end_time: Date
    }
  },
  { timestamps: true }
);

const interview = mongoose.model("Interview", interviewSchema);

module.exports = interview;
