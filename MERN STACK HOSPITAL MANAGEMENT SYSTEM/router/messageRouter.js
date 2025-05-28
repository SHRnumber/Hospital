import express from "express";  // Send Message
import { getAllMessages, sendMessage } from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAdminAuthenticated, getAllMessages);

export default router;