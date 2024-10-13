import Joi from "joi";

// Created a custom validation messages object for reuse
const customMessages = {
    "string.base": "{#label} must be a string",
    "string.empty": "{#label} is required",
    "string.alphanum": "{#label} must only contain alphanumeric characters",
    "string.min": "{#label} must be at least {#limit} characters long",
    "string.max": "{#label} must not exceed {#limit} characters",
    "string.length": "{#label} must be exactly {#limit} digits",
    "string.pattern.base": "{#label} must contain only digits",
    "string.email": "Email must be a valid email address",
    "string.pattern.base": "Password must contain at least one letter, one number, and one special character (!@#$%^&*)",
    "any.required": "{#label} is required",
};

// Define the registration schema
const registerSchema = Joi.object({
    first_name: Joi.string()
        .trim()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            ...customMessages,
            "string.min": customMessages["string.min"].replace("{#limit}", 3),
            "string.max": customMessages["string.max"].replace("{#limit}", 30),
        }),

    last_name: Joi.string()
        .trim()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            ...customMessages,
            "string.min": customMessages["string.min"].replace("{#limit}", 3),
            "string.max": customMessages["string.max"].replace("{#limit}", 30),
        }),

    phone: Joi.string()
        .trim()
        .length(10)
        .pattern(/^\d+$/)
        .required()
        .messages({
            ...customMessages,
            "string.length": customMessages["string.length"].replace("{#limit}", 10),
        }),

    email: Joi.string()
        .email()
        .trim()
        .lowercase()
        .required()
        .messages({
            ...customMessages,
            "string.email": customMessages["string.email"],
        }),

    password: Joi.string()
        .trim()
        .min(8)
        .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
        .required()
        .messages({
            ...customMessages,
            "string.min": customMessages["string.min"].replace("{#limit}", 8),
        }),
});

export default registerSchema;
