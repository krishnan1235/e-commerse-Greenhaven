import express from "express";
import axios from "axios";

const router = express.Router();
const DISEASE_API_URL = "http://localhost:5002/predict"; // Flask disease prediction API

router.post("/", async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "No imageBase64 provided" });
    }

    console.log("📨 Sending image to Flask...");

    const response = await axios.post(DISEASE_API_URL, { imageBase64 });

    console.log("✅ Received response from Flask:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Flask API error:", error.message);
    if (error.response) {
      console.error("❌ Flask returned:", error.response.data);
    }

    res.status(500).json({
      error: "Disease prediction service error",
      details: error.response?.data || error.message,
    });
  }
});

export default router;
