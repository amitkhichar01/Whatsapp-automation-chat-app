const Joi = require("joi");

const registerSchema = Joi.object({
    first_name: Joi.string().trim().alphanum().min(3).max(30).required().messages({
        "string.base": "First name must be a string",
        "string.empty": "First name is required",
        "string.alphanum": "First name must only contain alphanumeric characters",
        "string.min": "First name must be at least 3 characters long",
        "string.max": "First name must not exceed 30 characters",
        "any.required": "First name is required",
    }),

    last_name: Joi.string().trim().alphanum().min(3).max(30).required().messages({
        "string.base": "Last name must be a string",
        "string.empty": "Last name is required",
        "string.alphanum": "Last name must only contain alphanumeric characters",
        "string.min": "Last name must be at least 3 characters long",
        "string.max": "Last name must not exceed 30 characters",
        "any.required": "Last name is required",
    }),

    phone: Joi.string().trim().length(10).pattern(/^\d+$/).required().messages({
        "string.base": "Phone number must be a string",
        "string.empty": "Phone number is required",
        "string.length": "Phone number must be exactly 10 digits",
        "string.pattern.base": "Phone number must contain only digits",
        "any.required": "Phone number is required",
    }),

    email: Joi.string().email().trim().lowercase().required().messages({
        "string.base": "Email must be a string",
        "string.email": "Email must be a valid email address",
        "string.empty": "Email is required",
        "any.required": "Email is required",
    }),

    password: Joi.string().trim().min(8).pattern(new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])")).required().messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters long",
        "string.pattern.base": "Password must contain at least one letter, one number, and one special character (!@#$%^&*)",
        "any.required": "Password is required",
    }),
});

module.exports = registerSchema;
