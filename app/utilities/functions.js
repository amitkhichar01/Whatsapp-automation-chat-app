import User from "../models/user.js";

//find a user by Email
export const findUserByEmail = async (email) => {
    return await User.findOne({ email }).exec();
};
