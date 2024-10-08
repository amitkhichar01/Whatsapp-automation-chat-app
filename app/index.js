import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import express from "express";
import connectDb from "./database.js";
import user from "./routes/user.js";

const app = express();

connectDb();

// Middleware to parse incoming JSON requests
app.use(express.json());

app.use("/user", user);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
