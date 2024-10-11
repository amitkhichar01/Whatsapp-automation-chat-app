import express from "express";
import passport from "passport"; // Make
import { getUser, registerUser, loginUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();


router.get("/me", passport.authenticate("local", { failureRedirect: "/error", failureFlash: true }), getUser);
router.post("/register", registerUser);
router.post("/login", passport.authenticate("local", { failureRedirect: "/error", failureFlash: true }), loginUser);

router.put("/", passport.authenticate("local", { failureRedirect: "/error", failureFlash: true }), updateUser);
router.delete("/", passport.authenticate("local", { failureRedirect: "/error", failureFlash: true }), deleteUser);

export default router;
