const express = require("express");
const regitsrUser = require("../controllers/register/register");
const loginUser = require("../controllers/login/login");
const router = express.Router();

router.post("/register", regitsrUser);
router.post("/login", loginUser);

module.exports = router;
