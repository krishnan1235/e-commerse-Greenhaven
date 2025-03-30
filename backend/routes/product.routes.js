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


export default router;
