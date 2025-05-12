import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {  // Changed from 'discription' to 'description'
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    selling: {  // Changed to Boolean if you're using it as a flag
        type: Number,
        required: true,
        
    },
    image: {
        type: String,
        required: true
    },
    stocks: {  // Changed to Number type
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
}, { timestamps: true });


const Product = mongoose.model("e-commerse-website", productSchema);
export default Product;