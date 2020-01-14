const mongoose = require("mongoose");
const { Schema } = mongoose;

const sourcePlatform = [
  "Facebook",
  "Reddit",
  "Quora",
  "Twitter",
  "Email",
  "Search engine",
  "LinkedIn",
  "Instagram",
  "Medium",
  "Word of mouth",
  "Our blog",
  "Other blog"
];

const monthEnum = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const programmingExperience = [
  "Newbie",
  "Trying to learn",
  "Learning for 3 months",
  "Experienced"
];

const screenerSchema = new Schema(
  {
    sourcePlatform: {
      type: String,
      enum: sourcePlatform
    },
    screenerMotivation: { type: String },
    background: { type: String },
    programmingExperience: {
      type: String,
      enum: programmingExperience
    },
    location: { type: String },
    age: { type: Number },
    graduationYear: { type: "Number" },
    graduationDetails: { type: String },
    isCurrentlyEmployed: { type: Boolean, default: false },
    expectedJoiningMonth: { type: String, enum: monthEnum },
    expectedJoiningYear: { type: Number },
    screenerRemarks: { type: String }
  },
  {
    timestamps: true
  }
);

const Screener = mongoose.model("Screener", screenerSchema);

module.exports = Screener;
