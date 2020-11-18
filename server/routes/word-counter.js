"use strict";

const express = require("express");

const { countOIEAppearance } = require("../controllers/word-counter");
const { validatorMiddleware } = require("../middleware/word-counter-validator");

const router = express.Router();

router.post("/", validatorMiddleware, countOIEAppearance);

module.exports = router;
