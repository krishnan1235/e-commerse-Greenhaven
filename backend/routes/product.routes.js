import { deleteProduct, getProduct, postProduct, putProduct } from "../controllers/product .control.js";
import Product from "../models/product.model.js";
import express from "express";

const router = express.Router();

// Route to add a new product
router.post("/add", postProduct);

// Route to update a product
router.put("/update/:id", putProduct);


// Route to get all products
router.get("/get", getProduct);

// Route to delete a product
router.delete("/delete/:id", deleteProduct);
// Add this route to your existing routes
// In your product routes file (product.route.js)
// Change this route path to match what your frontend is calling
router.get("/related/:category", async (req, res) => {
    try {
        const { category } = req.params;
        
        // Validate category exists
        if (!category || category === 'undefined') {
            return res.status(400).json({ message: "Category is required" });
        }

        const products = await Product.find({ category })
            .limit(4)
            .exec();
            
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Make sure to mount this router with the correct base path in your main server file:
// app.use('/api/product', productRouter);

export default router;
