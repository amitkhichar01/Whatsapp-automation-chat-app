const mongoose = require("mongoose");

const connectDb = async () => {
     await mongoose
     .connect("mongodb://localhost:27017/user")
     .then(() => {
            console.log("Connected to DataBase");
     })
     .catch((err) => console.log(err));
} 

module.exports = connectDb;