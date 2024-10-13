import Joi from "joi";

const whatsappConfigValidation = Joi.object({
    title: Joi.string().required().messages({
        "string.base": "Title must be a valid string.",
        "any.required": "Title is required.",
    }),
    phone_id: Joi.string().required().messages({
        "string.base": "Phone ID must be a valid string.",
        "any.required": "Phone ID is required.",
    }),
    token: Joi.string().required().messages({
        "string.base": "Token must be a valid string.",
        "any.required": "Token is required.",
    }),
});

export default whatsappConfigValidation;
