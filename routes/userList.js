const express = require("express");
const userList = require("../controllers/users/userList");
const auth = require("../middlewars/auth");
const router = express.Router();

router.get("/list", auth, userList);

module.exports = router;
