import express from "express";
import passport from "passport"; // Make
import { getUser, registerUser, loginUser, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// Middleware for Passport authentication
const authenticateUser = passport.authenticate("local", {
    failureRedirect: "/error",
    failureFlash: true,
});

// Route to get current user information
router.get("/me", authenticateUser, getUser);

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", authenticateUser, loginUser);

// Route to update user information
router.put("/", authenticateUser, updateUser);

// Route to delete a user account
router.delete("/", authenticateUser, deleteUser);

export default router;
