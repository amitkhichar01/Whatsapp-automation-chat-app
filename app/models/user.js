import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

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
            match: [/^\d{10}$/, "Phone number must be a valid 10-digit number"], 
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            unique: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "Email must be valid"], 
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Add passport-local-mongoose plugin to the user schema
userSchema.plugin(passportLocalMongoose, {
    usernameField: "email", // Use email as the username field
});

const User = mongoose.model("User", userSchema);

export default User;
