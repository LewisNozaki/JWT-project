const signup_get = (req, res) => {
  console.log(req.body);
  res.render("signup");
};

const signup_post = (req, res) => {
  res.send("New signup");
};

const login_get = (req, res) => {
  res.render("login");
};

const login_post = (req, res) => {
  res.send("User login");
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post
};