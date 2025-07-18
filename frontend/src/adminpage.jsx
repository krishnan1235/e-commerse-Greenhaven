  import React, { useState, useEffect } from 'react';
  import { useEmail } from "./emailcontext.jsx";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import { toast } from 'react-toastify';
  import "./pages/styles/admin.css";

  const AdminPage = () => {
    const { email } = useEmail(); // ✅ get email from context
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [newProduct, setNewProduct] = useState({
      name: '',
      brand: '',
      category: '',
      discription: '', // Note the 'e' in discription
      price: 0,
      selling: false,
      image: '',
      stocks: 0  // Added stocks field
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      categories: []
    });

    // Fetch all necessary data
    useEffect(() => {
          if (email !== "admin@green.com") {
        toast.error("Access denied. Admins only.");
        navigate("/");
        return; // ⛔ stop execution here
      }
      const fetchData = async () => {
        try {
          setLoading(true);
          
      const token = localStorage.getItem("token"); // ✅ Fix: Get token from localStorage
      if (!token) {
        throw new Error("No token found. Please login again.");
      }
          // Fetch products
          // const productsRes = await axios.get("https://e-commerse-greenhaven.onrender.com/api/v1/get");
          const productsRes = await axios.get("http://localhost:5000/api/v1/get");
          setProducts(productsRes.data.data);

          // Fetch orders (mock data - replace with actual API)
          // const ordersRes = await axios.get("https://e-commerse-greenhaven.onrender.com/api/orders");
          const ordersRes = await axios.get("http://localhost:5000/api/orders");
          setOrders(ordersRes.data);

          // Fetch users (mock data - replace with actual API)
          // const usersRes = await axios.get("https://e-commerse-greenhaven.onrender.com/api/auth/users");
           const usersRes = await axios.get("http://localhost:5000/api/auth/users", {
  headers: {
    Authorization: `Bearer ${token}` // ✅ Correct
  }
});
            setUsers(usersRes.data);

          // Calculate stats
          setStats({
            totalProducts: productsRes.data.data.length,
            totalOrders: ordersRes.data.length,
            totalRevenue: ordersRes.data.reduce((sum, order) => sum + order.total, 0),
            categories: [...new Set(productsRes.data.data.map(p => p.category))]
          });

        } catch (error) {
          toast.error("Failed to load data: " + error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [activeTab]);

    const handleProductChange = (e) => {
      const { name, value } = e.target;
      setNewProduct(prev => ({
        ...prev,
        [name]: name === "price" || name === "selling" ? (value ? parseFloat(value) : "") : value
      }));
    };

    const validateProduct = () => {
      const requiredFields = ['name', 'price', 'brand', 'category'];
      for (const field of requiredFields) {
        if (!newProduct[field]) {
          toast.error(`Please fill in the ${field} field`);
          return false;
        }
      }
      return true;
    };

    const handleProductSubmit = async () => {
      try {
        // Convert data types before sending
        const productToSend = {
          ...newProduct,
          price: Number(newProduct.price),
          stocks: Number(newProduct.stocks),
          selling: Boolean(newProduct.selling)
        };

        if (editingId) {
          await axios.put(`/api/v1/update/${editingId}`, productToSend);
          toast.success("Product updated successfully!");
        } else {
          await axios.post("/api/v1/add", productToSend);
          toast.success("Product added successfully!");
        }

        resetProductForm();
        fetchProducts();
      } catch (error) {
        console.error("Error details:", error.response?.data);
        toast.error(error.response?.data?.message || "Operation failed");
      }
    };

    const resetProductForm = () => {
      setNewProduct({
        name: "",
        price: "",
        image: "",
        brand: "",
        category: "",
        discription: "",
        selling: "",
        stocks: ""
      });
      setEditingId(null);
    };

    const fetchProducts = async () => {
      try {
        // const res = await axios.get("https://e-commerse-greenhaven.onrender.com/api/v1/get");
        const res = await axios.get("http://localhost:5000/api/v1/get");
        setProducts(res.data.data);
        // Update categories in stats
        setStats(prev => ({
          ...prev,
          categories: [...new Set(res.data.data.map(p => p.category))]
        }));
      } catch (error) {
        toast.error("Failed to fetch products");
      }
    };

    const handleEditProduct = (product) => {
      setNewProduct(product);
      setEditingId(product._id);
      setActiveTab('products');
    };

    const handleDeleteProduct = async (id) => {
      if (!window.confirm("Are you sure you want to delete this product?")) return;

      try {
        // await axios.delete(`https://e-commerse-greenhaven.onrender.com/api/v1/delete/${id}`);
        await axios.delete(`http://localhost:5000/api/v1/delete/${id}`);
        toast.success("Product deleted successfully!");
        fetchProducts();
        // Update stats
        setStats(prev => ({
          ...prev,
          totalProducts: prev.totalProducts - 1
        }));
      } catch (error) {
        toast.error("Failed to delete product");
      }
    };

    // Order status update function
    const updateOrderStatus = async (orderId, status) => {
      try {
        // await axios.put(`https://e-commerse-greenhaven.onrender.com/api/orders/${orderId}`, { status });
        await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status });
        toast.success(`Order status updated to ${status}`);
        const updatedOrders = orders.map(order =>
          order._id === orderId ? { ...order, status } : order
        );
        setOrders(updatedOrders);
      } catch (error) {
        toast.error("Failed to update order status");
      }
    };

    // User management functions
    const toggleUserStatus = async (userId, isActive) => {
      try {
        // await axios.put(`https://e-commerse-greenhaven.onrender.com/api/users/${userId}`, { isActive });
        await axios.put(`http://localhost:5000/api/users/${userId}`, { isActive });
        toast.success(`User ${isActive ? 'activated' : 'deactivated'}`);
        const updatedUsers = users.map(user =>
          user._id === userId ? { ...user, isActive } : user
        );
        setUsers(updatedUsers);
      } catch (error) {
        toast.error("Failed to update user status");
      }
    };

    return (
      <div className="admin-container">
        <div className="admin-sidebar">
          <h2>Admin Panel</h2>
          <ul>
            <li
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </li>
            <li
              className={activeTab === 'products' ? 'active' : ''}
              onClick={() => setActiveTab('products')}
            >
              Products
            </li>
            <li
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </li>
            <li
              className={activeTab === 'users' ? 'active' : ''}
              onClick={() => setActiveTab('users')}
            >
              Users
            </li>
          </ul>
        </div>

        <div className="admin-content">
          {loading && <div className="loading-overlay">Loading...</div>}

          {activeTab === 'dashboard' && (
            <div className="dashboard">
              <h1>Admin Dashboard</h1>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Products</h3>
                  <p>{stats.totalProducts}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Orders</h3>
                  <p>{stats.totalOrders}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Revenue</h3>
                  <p>₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
              
              </div>

              {/* <div className="recent-activity">
                <h2>Recent Orders</h2>
                {orders.slice(0, 5).map(order => (
                  <div key={order._id} className="activity-item">
                    <span>Order #{order.orderId}</span>
                    <span>₹{order.total}</span>
                    <span className={`status-${order.status}`}>{order.status}</span>
                  </div>
                ))}
              </div> */}
            </div>
          )}

          {activeTab === 'products' && (
            <div className="products-management">
              <div className="section-header">
                <h1>{editingId ? 'Edit Product' : 'Add New Product'}</h1>
                {editingId && (
                  <button variant="outline" onClick={resetProductForm}>
                    Cancel Edit
                  </button>
                )}
              </div>

              <div className="product-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Product Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={newProduct.name}
                      onChange={handleProductChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Brand*</label>
                    <input
                      type="text"
                      name="brand"
                      value={newProduct.brand}
                      onChange={handleProductChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category*</label>
                    <input
                      type="text"
                      name="category"
                      value={newProduct.category}
                      onChange={handleProductChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="text"
                      name="image"
                      value={newProduct.image}
                      onChange={handleProductChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="discription"
                    value={newProduct.discription}
                    onChange={handleProductChange}
                    rows={4}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Price (₹)*</label>
                    <input
                      type="number"
                      name="price"
                      value={newProduct.price || ""}
                      onChange={handleProductChange}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label>Selling Price (₹)</label>
                    <input
                      type="number"
                      name="selling"
                      value={newProduct.selling || ""}
                      onChange={handleProductChange}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label>Stocks</label>
                    <input
                      type="number"
                      name="stocks"
                      value={newProduct.stocks || ""}
                      onChange={handleProductChange}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button className="ad_add" onClick={handleProductSubmit} disabled={loading}>
                    {loading ? 'Processing...' : editingId ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </div>

              <div className="section-header">
                <h2>Product List</h2>
                <small>{products.length} products found</small>
              </div>

              <div className="products-grid">
                {products.map(product => (
                  <div key={product._id} className="product-card">
                    <div className="product-image">
                      <img
                        src={product.image || 'https://via.placeholder.com/150'}
                        alt={product.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/150';
                        }}
                      />
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <div className="price-row">
                        <span className="selling-price">₹{product.price}</span>
                        {product.selling && product.selling < product.price && (
                          <span className="original-price">₹{product.selling}</span>
                        )}
                      </div>
                      <div className="meta-row">
                        <span className="category">{product.category}</span>
                        <span className="brand">{product.brand}</span>
                      </div>
                      <div className="product-actions">
                        <button className='ad_ed'
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </button>
                        <button className='ad_del'
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-management">
              <h1>Order Management</h1>
              <div className="orders-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>

                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id}>
                        <td>#{order._id}</td>
                        <td>{order.userEmail}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>₹{order.price}</td>
                        <td>
                          <select
                            className={`status-order status-${order.status.toLowerCase()}`}
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                        </td>
                        <td>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-management">
              <h1>User Management</h1>
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <span className={`status-${user.isActive ? 'active' : 'inactive'}`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button
                            size="sm"
                            variant={user.isActive ? 'destructive' : 'outline'}
                            onClick={() => toggleUserStatus(user._id, !user.isActive)}
                          >
                            {user.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default AdminPage;