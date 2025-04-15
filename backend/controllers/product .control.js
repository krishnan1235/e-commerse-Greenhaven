import Product from "../models/product.model.js";

// Controller to handle product creation
export const postProduct = async (req, res) => {
  try {
    const product = req.body;

    // Check if all required fields are provided
    const requiredFields = ['name', 'price', 'image', 'selling', 'brand', 'category', 'discription'];
    for (let field of requiredFields) {
      if (!product[field]) {
        return res.status(400).json({ success: false, message: `Please provide all fields. Missing: ${field}` });
      }
    }

    // Create a new product instance
    const newProduct = new Product(product);

    // Save the new product to the database
    await newProduct.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Product added successfully!"
    });

  } catch (error) {
    console.error("Error occurred while adding product:", error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
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

    // Return success response with all products
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
