import jwt from "jsonwebtoken";
import User from "../models/user.js";
import registerSchema from "./validations/users.validations.js";

//find a user by Email
const findUserByEmail = async (email) => {
    return await User.findOne({ email }).exec();
};

// Generate JWT token
const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("Missing JWT_SECRET in environment variables");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Get user details
export const getUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User details fetched", user: user });
    } catch (error) {
        console.log("getUser error: ", error);
        return res.status(500).json({ success: false, message: "Error fetching user", error: error });
    }
};

// Register user
export const registerUser = async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);

        if (error) {
            console.error("Validation failed:", error.details[0].message);
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        //check if user already exists
        const existingUser = await findUserByEmail(req.body.email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const newUser = new User(value);

        const registerUser = await User.register(newUser, req.body.password);
        console.log(registerUser);

        req.login(registerUser, (err) => {
            if (err) return next(err);
            return res.status(201).json({ success: true, message: "Register successfully", value: registerUser });
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: "Error registering user" });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const token = generateToken(req.user.id);

        // Log in the user and respond accordingly
        req.login(req.user, (err) => {
            if (err) return next(err);
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: req.user,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Error logging in", error: error.message });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);

        if (error) {
            console.error("Validation failed:", error.details[0].message);
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const updatedUser = await User.findOneAndUpdate({ email: req.body.email }, value, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log(updatedUser);
        return res.json({ success: true, message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("updating error:", error);
        res.status(500).json({ success: false, message: "Error updating user", error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        const deletedUser = await User.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found or already deleted" });
        }

        console.log("Deleted user:", deletedUser);

        return res.status(200).json({ success: true, message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ success: false, message: "Error deleting user", error: error.message });
    }
};
