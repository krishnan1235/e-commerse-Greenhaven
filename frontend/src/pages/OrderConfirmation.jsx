import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEmail } from "../emailcontext";
import axios from "axios";
import "./styles/orderconfirm.css"; // Your styling

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();  // Hook to navigate to the Home page
    const { email } = useEmail();
    const product = location.state || {};
    const [paymentMode, setPaymentMode] = useState("cod");
    const [orderSuccess, setOrderSuccess] = useState(false); // State to trigger the modal
    const [orderDetails, setOrderDetails] = useState(null); // To store order data

    const handleConfirmOrder = async () => {
        try {
            const order = {
                userEmail: email,
                productId: product._id,
                productName: product.name,
                productImage: product.image,
                price: product.price,
                paymentMode,
                status: "Processing",
                createdAt: new Date(),
            };

            const response = await axios.post("https://e-commerse-greenhaven.onrender.com/api/orders/place", order);
            // const response = await axios.post("http://localhost:5000/api/orders/place", order);
            if (response.data.success) {
                setOrderDetails(order); // Store order details
                setOrderSuccess(true); // Show the order success modal
            }
        } catch (err) {
            console.error("Order failed", err);
            alert("Order could not be placed.");
        }
    };

    const closeOrderSuccessModal = () => {
        setOrderSuccess(false); // Close the modal when the user clicks close
        navigate("/"); // Navigate to the home page
    };

    return (
        <div className="con-confirm">
            <div className="new-confirm-container">
                <h2>Confirm Your Order</h2>
                <div className="new-confirm-card">
                    <img src={product.image} alt={product.name} />
                    <div className="info">
                        <h3>{product.name}</h3>
                        <p>Price: ₹{product.price}</p>
                    </div>
                </div>

                <div className="new-payment-method">
                    <h4>Select Payment Method</h4>
                    <label>
                        <input
                            type="radio"
                            value="cod"
                            checked={paymentMode === "cod"}
                            onChange={(e) => setPaymentMode(e.target.value)}
                        />
                        Cash on Delivery
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="upi"
                            checked={paymentMode === "upi"}
                            onChange={(e) => setPaymentMode(e.target.value)}
                        />
                        UPI (Simulation only)
                    </label>
                </div>

                <button className="new-confirm-button" onClick={handleConfirmOrder}>
                    Place Order
                </button>
            </div>

            {/* Order Success Modal */}
            {orderSuccess && (
                <div className="order-success-modal">
                    <div className="order-success-card">
                        <h2>Order Placed Successfully!</h2>
                        <div className="order-details">
                            <img src={orderDetails.productImage} alt={orderDetails.productName} className="product-image" />
                            <div className="order-info">
                                <h3>{orderDetails.productName}</h3>
                                <p>Price: ₹{orderDetails.price}</p>
                                <p>Payment Mode: {orderDetails.paymentMode}</p>
                                <p>Status: {orderDetails.status}</p>
                            </div>
                        </div>
                        <button onClick={closeOrderSuccessModal} className="go-home-button">
                            Go to Home Page
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderConfirmation;
