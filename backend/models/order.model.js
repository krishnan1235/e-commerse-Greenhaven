// models/orderModel.js
import mongoose from "mongoose";

import { v4 as uuidv4 } from 'uuid';

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,  // Ensures that orderId is unique across all orders
        default: () => uuidv4()  // Generates a unique orderId by default
    },
    userEmail: String,
    productId: String,
    productName: String,
    productImage: String,
    price: Number,
    paymentMode: String,
    status: {
        type: String,
        enum: ["Processing", "Dispatched", "Delivered"],
        default: "Processing"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model("Order", orderSchema);
