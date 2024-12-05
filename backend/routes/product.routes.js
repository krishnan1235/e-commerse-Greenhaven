import { deleteProduct, getProduct, postProduct, putProduct } from "../controllers/product .control.js";
import Product from "../models/product.model.js";
import express from "express";

const router=express.Router();

router.post("/add",postProduct);

router.put("/:id", putProduct);

router.get("/get",getProduct);

router.delete("/:id",deleteProduct);
export default router;