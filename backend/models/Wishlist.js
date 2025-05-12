import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
