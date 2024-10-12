import mongoose from "mongoose";


const whatsappConfigSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    phone_id: { type: String, required: true },
    token: { type: String, required: true }
});

 const WhatsAppConfig = mongoose.model("WhatsAppConfig", whatsappConfigSchema);

 export default WhatsAppConfig;