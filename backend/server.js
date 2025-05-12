// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import ProductRoutes from "./routes/product.routes.js";
// import AuthRoutes from "./routes/auth.routes.js";
// import CartRoutes from "./routes/cartRoutes.js"; // Import cart routes

// dotenv.config();

// const app = express();

// app.use(cors({

//     origin: "http://localhost:5173",
//     // origin: "https://greenhaven-liart.vercel.app",
// }));

// app.use(express.json()); // Allows us to accept JSON data in req.body

// const PORT = process.env.PORT || 5000;

// // API Routes
// app.use("/api/v1", ProductRoutes);
// app.use("/api/auth", AuthRoutes);
// app.use("/api/cart", CartRoutes); // Add cart API

// app.listen(PORT, () => {
    //     connectDB();
    //     console.log(`Server started at http://localhost:${PORT}`);
    // });
    
    
import orderRoutes from './routes/order.routes.js';
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import ProductRoutes from "./routes/product.routes.js";
import AuthRoutes from "./routes/auth.routes.js";
import CartRoutes from "./routes/cartRoutes.js"; // Import cart routes'
import wishlistRoutes from "./routes/wishlist.js"

dotenv.config();

const app = express();

// const wishlistRoutes = require("./routes/wishlist");
// Middlewares
app.use(cors({
    origin: "https://greenhaven-liart.vercel.app",
    credentials: true,
}));

app.use(express.json()); // Accept JSON data

// ✅ This fixes "Cannot GET /"
app.get("/", (req, res) => {
    res.send("✅ API is running successfully on localhost!");
});

// API Routes
app.use("/api/v1", ProductRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/wishlist", wishlistRoutes);


// Add this with your other route imports
app.use('/api/orders', orderRoutes);
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    connectDB();
    console.log(`✅ Server started at: http://localhost:${PORT}`);
});
