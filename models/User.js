const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

// function validate email
var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
        "Please fill a valid email address"
      ]
    },
    password: String,
    phoneNo: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 10
    },
    hashMail: { type: String, unique: true },
    socialProfile: { type: String, required: true },
    motivation: { type: String, required: true, maxlength: 200 },
    task: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Task"
    },
    quiz: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Quiz"
    },
    isProfileClaimed: { type: Boolean, default: false },
    canTakeQuiz: { type: Boolean, default: true },
    canScheduleInterview: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    stage: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "reject", "accept"],
      default: "pending"
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  if (this.password) {
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
