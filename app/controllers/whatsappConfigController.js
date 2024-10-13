import WhatsAppConfig from "../models/whatsappConfig.js";
import whatsappConfigValidation from "./validations/whatsappValidations.js";

// Controller to add a WhatsApp configuration
export const addWhatsAppConfig = async (req, res) => {
    try {
        const { error, value } = whatsappConfigValidation.validate(req.body);

        if (error) {
            console.error("Validation failed:", error.details[0].message);
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        // Create a new WhatsApp configuration
        const newConfig = new WhatsAppConfig({
            user_id: req.user._id,
            ...value,
        });

        // Save configuration to the database
        await newConfig.save();

        return res.status(201).json({ success: true, message: "WhatsApp configuration added successfully", config: newConfig });
    } catch (err) {
        console.error("Error saving configuration:", err.message);
        return res.status(500).json({ success: false, message: "Error saving configuration", error: err.message });
    }
};
