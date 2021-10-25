// Import Mongoose
const { Schema, model } = require("mongoose");

// Import the validator package
const { isEmail } = require("validator");

// Import bcrypt
const bcrypt = require("bcrypt");

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
userSchema.pre("save", async function (next) {
  // Generates a "salt", which is a random string 
  // to attach to the password prior to encrypting
  const salt = await bcrypt.genSalt();

  // The current user instance
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Custom atatic method on user model for login
userSchema.statics.login = async function(email, password) {
  // finds an instance in the db with the same email;
  const user = await this.findOne({ email });

  if (user) {
    // compare the password passed into the static login function & the password found in the db
    // This function will either return true or false
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user
    }

    throw Error("Incorrect password");
  }

  throw Error("Incorrect email");
};

const User = model("user", userSchema);

module.exports = User;