import express from "express";
import Cart from "../models/cartModel.js"; // Ensure the correct path

const router = express.Router();

// Add to cart
router.post("/add", async (req, res) => {
    const { email, name, price, image } = req.body;

    try {
        let cart = await Cart.findOne({ email });

        if (!cart) {
            cart = new Cart({ email, items: [] });
        }

        // Check if item already exists
        const existingItem = cart.items.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ name, price, image });
        }

        await cart.save();
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding to cart", error });
    }
});




router.patch("/update", async (req, res) => {
    const { email, name, price, image,quantity } = req.body;

    try {
        let cart = await Cart.findOne({ email });

        if (!cart) {
            cart = new Cart({ email, items: [] });
        }

        // Check if item already exists
        const existingItem = cart.items.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity -= 1;
        }
        await cart.save();
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding to cart", error });
    }
});




// Get cart items
router.get("/:email", async (req, res) => {
    const { email } = req.params;
    try {
        const cart = await Cart.findOne({ email });
        res.status(200).json(cart ? cart.items : []);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching cart", error });
    }
});



router.delete("/:email/:productId", async (req, res) => {
    const { email, productId } = req.params;

    try {
        const cart = await Cart.findOne({ email });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        // Filter out the product with the matching _id
        const updatedItems = cart.items.filter(item => item._id.toString() !== productId);

        // If no change occurs, it means the product wasn't found
        if (updatedItems.length === cart.items.length) {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }

        cart.items = updatedItems;

        // Save the updated cart
        await cart.save();

        res.status(200).json({ success: true, message: "Product removed from cart", cart });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting product from cart", error });
    }
});


export default router;
