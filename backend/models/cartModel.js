import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    email: { type: String, required: true }, // User's email
    items: [
        {
            name: String,
            price: Number,
            image: String,
            quantity: { type: Number, default: 1 }
        }
    ]
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart; // ✅ Use ES Module syntax
