const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
        },
        last_name: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
            unique: true,
            match: [/^\d{10}$/, "Phone number must be a valid 10-digit number"], // Basic phone validation (adjust as necessary)
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            unique: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "Email must be valid"], // Basic email validation
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);


const User = mongoose.model("User", userSchema);

module.exports = User; 