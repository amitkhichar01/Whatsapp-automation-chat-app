const express = require("express");
const connectDb = require("./database");

const app = express();
const PORT = 3000;

const user = require("./routes/user")

// Middleware to parse incoming JSON requests
app.use(express.json());

app.use("/user", user);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb ();
});
