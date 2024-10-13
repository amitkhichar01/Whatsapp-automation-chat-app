import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import flash from "connect-flash";
import MongoStore from "connect-mongo";
import cors from "cors";
import connectDb from "./database.js";
import userRoutes from "./routes/user.js";
import whatsappConfigRoutes from "./routes/whatsappConfig.js";
import User from "./models/user.js";

// Load environment variables
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const app = express();
connectDb();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Session store setup
const sessionStore = MongoStore.create({
    mongoUrl: process.env.DATABASE_URL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

sessionStore.on("error", (err) => {
    console.log("Error in MongoDB session store:", err);
});

// Session configuration
const sessionOptions = {
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport Local Strategy
passport.use(
    new LocalStrategy(
        {
            usernameField: "email", // Specify 'email' as the username
            passwordField: "password", // Default is 'password', but can be customized
        },
        User.authenticate()
    )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Define application routes
app.use("/user", userRoutes);
app.use("/whatsapp_config", whatsappConfigRoutes);


// Error handling route
app.get("/error", (req, res) => {
    res.status(400).json({ success: false, message: req.flash("error") });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error: ", err.message);
    res.status(500).json({ success: false, message: err.message });
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
