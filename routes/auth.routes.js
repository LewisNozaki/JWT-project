const { Router } = require("express");

const router = Router();

const { signup_get, signup_post, login_get, login_post } = require("../controllers/auth.controllers");

////////////
// Signup //
////////////

router.get("/signup", (req, res) => signup_get);

router.post("/signup", (req, res) => signup_post);

///////////
// Login //
///////////

router.get("/login", (req, res) => login_get);

router.post("/login", (req, res) => login_post);

module.exports = router;