const express = require("express");
const router = express.Router();

const { signup, login, logout, guest } = require("../controllers/users");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/guest", guest);

module.exports = router;
