const { Router } = require("express");

const router = Router();

const { requireAuth } = require("../helpers/jwt.helper");

const smoothies_get = require("../controllers/smoothies.controllers")

router.get('/smoothies', requireAuth, smoothies_get);

module.exports = router