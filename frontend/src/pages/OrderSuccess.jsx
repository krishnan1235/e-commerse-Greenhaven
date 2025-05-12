import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/ordersuccess.css";

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state || {}; // Get the order details passed from the previous page

    useEffect(() => {
        if (!order.userEmail) {
            navigate("/"); // Redirect to home if no order data is available
        }
    }, [order, navigate]);

    return (
        <div className="order-success-container">
            <div className="order-success-card">
                <h2>Order Placed Successfully!</h2>
                <div className="order-details">
                    <img src={order.productImage} alt={order.productName} className="product-image" />
                    <div className="order-info">
                        <h3>{order.productName}</h3>
                        <p><strong>Price:</strong> ₹{order.price}</p>
                        <p><strong>Payment Mode:</strong> {order.paymentMode === "cod" ? "Cash on Delivery" : "UPI"}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Order ID:</strong> {order._id}</p>
                        <p><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                </div>
                <button className="go-home-button" onClick={() => navigate("/")}>Go to Home</button>
            </div>
        </div>
    );
};

export default OrderSuccess;
