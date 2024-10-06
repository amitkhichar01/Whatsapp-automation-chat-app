// Validate user input Middleware
const validateUserInput = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All registration details are required - (username, email, password)" });
    }
    next();
};

module.exports = {validateUserInput};
