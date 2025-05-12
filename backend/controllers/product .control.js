import Product from "../models/product.model.js";

// Controller to handle product creation
export const postProduct = async (req, res) => {
  try {
    const product = req.body;

    // Required fields that match the schema
    const requiredFields = [
      'name', 'brand', 'category', 'description', 
      'price', 'selling', 'image', 'stocks'
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter(field => !product[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Type validation
    if (typeof product.price !== 'number' || product.price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a positive number'
      });
    }

    if (typeof product.stocks !== 'number' || product.stocks < 0) {
      return res.status(400).json({
        success: false,
        message: 'Stocks must be a positive number'
      });
    }

    // Create and save product
    const newProduct = new Product({
      ...product,
      // Ensure proper types
      price: Number(product.price),
      stocks: Number(product.stocks),
      selling: Boolean(product.selling)
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully!",
      product: newProduct
    });

  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Controller to handle product update
export const putProduct = async (req, res) => {
  const { id } = req.params;
  const products = req.body;

  console.log("Update request received for ID:", id);
  console.log("Updated data:", products);

  try {
    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const updated = await Product.findByIdAndUpdate(id, products, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Controller to get all products
export const getProduct = async (req, res) => {

  try {
    // Fetch all products
    const products = await Product.find();
   
    return res.status(200).json({
      success: true,
      data: products
    });
    
  } catch (error) {
    console.error("Error occurred while fetching products:", error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("Attempting to delete product with ID:", id);

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      console.log("Product not found in database.");
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
