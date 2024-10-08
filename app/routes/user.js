import express from "express";
const router = express.Router();

import { getUser, registerUser, loginUser, updateUser, deleteUser } from "../controllers/user.controller.js";

router.get("/me", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

export default router;
