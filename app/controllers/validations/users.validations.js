const Joi = require("joi");

const registerSchema = Joi.object({
    username: Joi.string().trim().alphanum().min(3).max(30).required().messages({
        "string.base": "Username must be a string",
        "string.empty": "Username is required",
        "string.alphanum": "Username must only contain alphanumeric characters",
        "string.min": "Username must be at least 3 characters long",
        "string.max": "Username must not exceed 30 characters",
        "any.required": "Username is required",
    }),

    email: Joi.string().email().trim().lowercase().required().messages({
        "string.base": "Email must be a string",
        "string.email": "Email must be a valid email address",
        "string.empty": "Email is required",
        "any.required": "Email is required",
    }),

    password: Joi.string().trim().min(8).required().messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters long",
        "any.required": "Password is required",
    }),
});

module.exports = registerSchema;
