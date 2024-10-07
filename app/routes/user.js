const express = require("express");
const router = express.Router();

const { getUser, registerUser, loginUser, updateUser, deleteUser } = require("../controllers/user.controller");

router.get("/me", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

module.exports = router;
