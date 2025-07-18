import { useState, useEffect } from 'react';
import "./styles/cstyle.css";
import { Button } from "../components/ui/button.jsx";
import axios from "axios";
import { toast } from 'react-toastify';

function Createpage() {
  const [pro, setPro] = useState([]);
  const [newproduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    brand: "",
    category: "",
    discription: "",
    selling: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state for requests

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const res = await axios.get("https://e-commerse-greenhaven.onrender.com/api/v1/get");
      const res = await axios.get("http://localhost:5000/api/v1/get");
      setPro(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" || name === "selling") {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value ? parseFloat(value) : "", // Handle numeric fields
      }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateProduct = () => {
    // Check if any required field is empty
    for (let key in newproduct) {
      if (newproduct[key] === "" && key !== "image") { // Image can be optional
        toast.error(`Please provide all fields. Missing: ${key}`);
        return false;
      }
    }
    return true;
  };

  const handleAddOrUpdateProduct = async () => {
    try {
      console.log("Submitting product:", newproduct); // Debugging

      if (editingId) {
        console.log("Editing product with ID:", editingId);
        await axios.put(`http://localhost:5000/api/v1/update/${editingId}`, newproduct);
        // await axios.put(`https://e-commerse-greenhaven.onrender.com/api/v1/update/${editingId}`, newproduct);
        toast.success("Product updated successfully!");
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/v1/add", newproduct);
        // await axios.post("https://e-commerse-greenhaven.onrender.com/api/v1/add", newproduct);
        toast.success("Product added successfully!");
      }

      setNewProduct({
        name: "",
        price: "",
        image: "",
        brand: "",
        category: "",
        discription: "",
        selling: "",
      });

      fetchData();
    } catch (error) {
      console.error("Update error:", error.response ? error.response.data : error.message);
      toast.error("An error occurred. Please try again.");
    }
  };


  const handleEdit = (item) => {
    setNewProduct(item);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    console.log("Deleting product with ID:", id); // Check if the ID is valid
    try {
      await axios.delete(`http://localhost:5000/api/v1/delete/${id}`);
      // await axios.delete(`https://e-commerse-greenhaven.onrender.com/api/v1/delete/${id}`);
      toast.success("Product deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Delete error:", error.response ? error.response.data : error.message);
      toast.error("Failed to delete product");
    }
  };


  return (
    <>
      <div style={{ marginTop: "50px", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
        <div className="heading">{editingId ? "Edit Product" : "Create New Product"}</div>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="name" placeholder="Product Name" value={newproduct.name} onChange={handleChange} />
          <input type="text" name="brand" placeholder="Brand Name" value={newproduct.brand} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={newproduct.category} onChange={handleChange} />
          <input type="text" name="discription" placeholder="Description" value={newproduct.discription} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price" value={newproduct.price || ""} onChange={handleChange} />
          <input type="number" name="selling" placeholder="Selling Price" value={newproduct.selling || ""} onChange={handleChange} />
          <input type="text" name="image" placeholder="Image URL" value={newproduct.image} onChange={handleChange} />
          <Button className="button1" onClick={handleAddOrUpdateProduct} disabled={loading}>
            {loading ? "Processing..." : editingId ? "Update Product" : "Add Product"}
          </Button>
        </form>
      </div>

      <div className="grid-container">
        {pro.map((item) => (
          <div key={item._id} className="card_container">
            <div className="card">
              <img src={item.image} alt={item.name} className="card-image" />
              <div className="card-content">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <Button onClick={() => handleEdit(item)}>Edit</Button>
                <Button onClick={() => handleDelete(item._id)}>Delete</Button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Createpage;
