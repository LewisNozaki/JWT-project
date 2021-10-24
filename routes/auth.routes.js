const { Router } = require("express");

const router = Router();

const { signup_get, signup_post, login_get, login_post } = require("../controllers/auth.controllers");

////////////
// Signup //
////////////

router.get("/signup", signup_get);

router.post("/signup", signup_post);

///////////
// Login //
///////////

router.get("/login", login_get);

router.post("/login", login_post);

module.exports = router;