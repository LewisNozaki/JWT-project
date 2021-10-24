// Import the User model
const User = require("../models/user.models");

// Import Helper functions
const handleErrors = require("../helpers/handleError.helper");
const createToken = require("../helpers/jwt.helper");

////////////
// Signup //
////////////

const signup_get = (req, res) => {
  res.render("signup");
};

const signup_post = async (req, res) => {
  const { email, password } = req.body; 

  try {
    // Create a new user
    const user = await User.create({ email, password });

    // Create token with jwt
    const token = await createToken(user._id);

    // Save the token to the cookies
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 3 * 24 * 60 * 60});
    
    res.status(201).json({ userID: user._id });
  } catch (err) {
    const errors = handleErrors(err);

    res.status(400).json({ errors });
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