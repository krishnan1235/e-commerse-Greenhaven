import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import ProductRoutes from "./routes/product.routes.js";
import AuthRoutes from "./routes/auth.routes.js";
import CartRoutes from "./routes/cartRoutes.js"; // Import cart routes

dotenv.config();

const app = express();

app.use(cors({
    origin: "https://greenhaven-liart.vercel.app",
}));

app.use(express.json()); // Allows us to accept JSON data in req.body

const PORT = process.env.PORT || 5000;

// API Routes
app.use("/api/v1", ProductRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/cart", CartRoutes); // Add cart API

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});
