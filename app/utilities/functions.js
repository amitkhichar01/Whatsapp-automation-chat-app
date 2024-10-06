const User = require("../models/user");

//find a user by Email
const findUserByEmail = async (email) => {
    return await User.findOne({ email }).exec();
};

module.exports = { findUserByEmail };
