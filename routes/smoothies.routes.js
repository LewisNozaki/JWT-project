const express = require("express");
const router = express.Router();

router.get('/smoothies', (req, res) => res.render('smoothies'));

module.exports = router