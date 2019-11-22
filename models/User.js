const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: false, lowercase: true },
    password: String,
    phoneNo: {
      type: Number,
      required: true
    },
    hashMail: { type: String, unique: true },
    socialProfile: { type: String, required: true },
    motivation: { type: String, required: true, maxlength: 200 },
    stage: { type: Number, default: 0 }
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


const User = mongoose.model("User", userSchema);

module.exports = User;
