const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User; 