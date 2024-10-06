if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const connectDb = require("./database");

const app = express();

const user = require("./routes/user");

// Middleware to parse incoming JSON requests
app.use(express.json());

app.use("/user", user);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDb();
});
