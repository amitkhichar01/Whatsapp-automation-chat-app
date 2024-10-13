import express from "express";
import { addWhatsAppConfig } from "../controllers/whatsappConfigController.js";
import { authenticateJWT } from "../utils/middleware.js";

const router = express.Router();

router.post("/", authenticateJWT, addWhatsAppConfig);

export default router;
