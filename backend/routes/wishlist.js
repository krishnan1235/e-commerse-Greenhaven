import express from "express";
import Wishlist from "../models/Wishlist.js"; // ✅ Correct spelling

const router = express.Router();

// Add to wishlist
router.post("/add", async (req, res) => {
    try {
        const { email, name, price, image } = req.body;

        const newItem = new Wishlist({ email, name, price, image });
        await newItem.save();

        res.status(201).json({ success: true, message: "Item added to wishlist" });
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Get wishlist for a user
router.get("/:email", async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ email: req.params.email });
        res.json(wishlist);
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
