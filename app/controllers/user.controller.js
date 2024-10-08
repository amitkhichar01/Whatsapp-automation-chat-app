import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import registerSchema from "./validations/users.validations.js";
import { findUserByEmail } from "../utilities/functions.js";

export const getUser = async (req, res) => {
    const { email, password } = req.body;

    try {
         const user = await findUserByEmail(email);

         // Check if user exists and verify password
         if (!user) {
             return res.status(400).json({ message: "Invalid email" });
         }

         if (!(await bcrypt.compare(password, user.password))) {
             return res.status(400).json({ message: "Invalid password" });
         }

        return res.status(200).json({ message: "your details", user: user });


    } catch (error) {
         console.log("get user error: ", error);
         return res.status(500).json({ message: "get user error", error: error });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);

        if (error) {
            console.error("Validation failed:", error.details[0].message);
            return res.status(400).json({ message: error.details[0].message });
        } else {
            console.log("Validation successful:", value);
        }

        //check if user already exists
        const existingUser = await User.findOne({ email:req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        const newUser = new User({
            ...req.body,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "Registration successful.", value: value });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error registering user" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);

        // Check if user exists and verify password
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ username: user.username }, process.env.JWT_TOKEN, { expiresIn: "1h" });

        return res.status(200).json({ message: "user login successfully", email: user.email, token });
    } catch (error) {
        console.log("Login error: ", error);
        return res.status(500).json({ message: "Error logging in" });
    }
};

export const updateUser = async (req, res) => {
    try {
        //check if user exists
        const existsUser = await findUserByEmail(req.body.email);
        if (!existsUser) {
            return res.status(400).json({ message: "user not found" });
        }

        const { error, value } = registerSchema.validate(req.body);

        if (error) {
            console.error("Validation failed:", error.details[0].message);
            return res.status(400).json({ message: error.details[0].message });
        } else {
            console.log("Validation successful:", value);
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const findUser = await User.findOneAndUpdate({ email: req.body.email }, { ...req.body, password: hashedPassword }, { new: true });
        console.log(findUser);
        return res.json({ message: "update user", user: findUser });
    } catch (error) {
        console.error("updating error:", error);
        res.status(500).json({ message: "Error when updating user" });
    }
};

export const deleteUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password presence
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await findUserByEmail(email);

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: "Invalid email" }); // Use 401 for unauthorized access
        }

        // Check password validity
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Delete user
        const deletedUser = await User.findOneAndDelete({ email });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found or already deleted" });
        }

        console.log("Deleted user:", deletedUser);

        return res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "An error occurred while deleting the user", error: error.message });
    }
};
