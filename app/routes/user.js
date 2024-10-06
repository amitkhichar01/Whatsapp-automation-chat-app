const express = require("express");
const router = express.Router();

const { validateUserInput } = require("../utilities/middleware");
const { registerUser, loginUser } = require("../controllers/user.controller");

router.post("/register", validateUserInput, registerUser);
router.post("/login", loginUser);


module.exports = router;