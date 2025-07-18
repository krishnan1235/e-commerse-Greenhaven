import express from "express";
import axios from "axios";

const router = express.Router();
const CHATBOT_API_URL = "http://localhost:5001/chatbot"; // Flask backend

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await axios.post("http://localhost:5001/chatbot", { message });
    res.json(response.data);
  } catch (error) {
    console.error("Chatbot API error:", error.message);
    res.status(500).json({ error: "Chatbot service error", details: error.message });
  }
});


export default router;
