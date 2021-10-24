// Import the User model
const User = require("../models/user.models");

// Error handling and extracting from MongoDB validation
const handleErrors = (err) => {
  console.log(err.message, err.code);
}

////////////
// Signup //
////////////

const signup_get = (req, res) => {
  res.render("signup");
};

const signup_post = async (req, res) => {
  const { email, password } = req.body; 

  try {
    const user = await User.create({ email, password });

    res.status(201).json(user);
  } catch (err) {
    handleErrors(err);

    res.status(400).send("Error: ", err);
  }
};

///////////
// Login //
///////////

const login_get = (req, res) => {
  res.render("login");
};

const login_post = (req, res) => {
  const { email, password } = req.body;

  console.log("email: ", email, "password: ", password);

  res.send("User login");
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post
};