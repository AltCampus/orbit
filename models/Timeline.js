const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timelineSchema = Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now()
  }
});

const interview = mongoose.model("Timeline", timelineSchema);

module.exports = interview;
