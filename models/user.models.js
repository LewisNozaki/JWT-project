// Import Mongoose
const { Schema, model } = require("mongoose");

// Import the validator package
const { isEmail } = require("validator");

const emailReq = {
  type: String,
  required: [true, "Please enter an email."],
  unique: true,
  lowercase: true,
  validate: [isEmail, "Please enter a valid email."]
};

const passwordReq = {
  type: String,
  required: [true, "Please enter a password."],
  minlength: [6, "The minimum password length is 6 characters."]
};

const userSchema = new Schema({
  email: emailReq,
  password: passwordReq
}, { timestamps: true });

// Tell Mongoose to fire a function after each document is saved to the DB. 
userSchema.post("save", function (doc, next) {

  next();
});

// Tell Mongoose to fire a function before each document is saved to the DB. 
// Hash the password using bcrypt before saving in the DB.
userSchema.pre("save", function (next) {

  next();
});

const User = model("user", userSchema);

module.exports = User;