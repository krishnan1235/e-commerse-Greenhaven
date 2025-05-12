// routes/orderRoutes.js
import express from "express";
import Order from "../models/order.model.js";

const router = express.Router();

router.post("/place", async (req, res) => {
    try {
        console.log("Incoming Order Data:", req.body); // 🔍 See what you're getting
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ success: true, message: "Order placed!" });
    } catch (err) {
        console.error("Order Save Failed:", err); // 🔍 Log full error
        res.status(500).json({ success: false, error: err.message });
    }
});



router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


router.get("/emailget", async (req, res) => {
  const { email } = req.query;
  console.log("Query email:", email);  

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const orders = await Order.find({ userEmail: email });  // ✅ CORRECT FIELD
    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found for this email" });
    }
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});





export default router;