// Import Mongoose
const { Schema, model } = require("mongoose");

const emailReq = {
  type: String,
  required: [true, "Please enter an email."],
  unique: true,
  lowercase: true,
  validate: [(val) => {  }, "Please enter a valid email."]
};

const passwordReq = {
  type: String,
  required: [true, "Please enter a password."],
  minLength: [6, "The minimum password length is 6 characters."]
};

const userSchema = new Schema({
  email: emailReq,
  password: passwordReq
}, { timestamps: true });

const User = model("user", userSchema);

module.exports = User;