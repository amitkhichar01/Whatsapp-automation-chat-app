const { findUserByEmail } = require("../utilities/functions");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const registerSchema = require("./validations/users.validations");

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const { error, value } = registerSchema.validate(req.body);

        if (error) {
            console.error("Validation failed:", error.details[0].message);
            return res.status(400).json({ message: error.details[0].message });
        } else {
            console.log("Validation successful:", value);
           
        }

        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "Registration successful.", value: value });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error registering user" });
    }
};

exports.loginUser = async (req, res) => {
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
