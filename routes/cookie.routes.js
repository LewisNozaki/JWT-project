const { Router } = require("express");

const router = Router();

// Cookies
router.get("/set-cookies", (req, res) => {
  // this functin sets cookies within the browser
  res.cookie("newUser", true);
  // some extra example properties when setting cookies...
  // maxAge = how long the cookie lasts. Default is sessions. 
  // Secure = only saved when using https.
  // httpOnly = Cannot accessed via browser/javascript
  res.cookie("isEmployee", false, { maxAge: 1000 * 60 * 60 * 24 });
  
  res.send("Successfully set cookies");
});

router.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});

module.exports = router;