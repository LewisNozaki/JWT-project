const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  
  // check jwt exists in cookies and is verified
  if (token) {
    jwt.verify(token, )
  } else {
    res.redirect("/login");
  }

  next();
};

module.exports = requireAuth;