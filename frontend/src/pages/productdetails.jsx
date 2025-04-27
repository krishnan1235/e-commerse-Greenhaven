import React from "react";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./styles/productdetailsstyle.css";
import axios from "axios";
import {useEmail} from "../emailcontext.jsx"
import { useLogin } from "../logincontext.jsx"; // Get logged-in email
import { toast } from 'react-toastify';

const Product_details = () => {
    const location = useLocation();
    const { name, price, image,description } = location.state;
    const {login } = useLogin(); // Get logged-in user email
     const {email}=useEmail();
    var logPrice = (price / 500) * 5;
    logPrice = logPrice <= 3 ? 3.8 : logPrice > 5 ? 4.7 : logPrice;
    const stars = Array(5).fill(false).map((_, index) => index < logPrice);

    const handleAddToCart = async () => {
        if (!login) {
            toast.warning("Please login to add items to the cart!");
            return;
        }
    
        try {
            // console.log("Sending request:", { email: email, name, price, image });
    
            const response = await axios.post("https://e-commerse-greenhaven.onrender.com/api/cart/add", {
                email: email,
                name,
                price,
                image
            });
    
            console.log("Response:", response.data);
    
            if (response.data.success) {
                toast.success("Added to Cart Successfully!");
            } else {
                toast.error("Failed to add to cart.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Error adding to cart. Please try again.");
        }
    };
    

    return (
        <div className="product_details_card">
            <div className="product_details_img">
                <img src={image} alt={name} />
            </div>
            <div className="product_details_discription">
                <div className="p_name">
                    <h1>{name}</h1>
                </div>
                <div className="ratings">
                    {stars.map((filled, index) => (
                        <FaStar key={index} color={filled ? "#FFD700" : "gray"} />
                    ))}
                    <div>{logPrice.toFixed(2)}</div>
                </div>
                <div className="p_price">
                    <p><del>{price * 2}</del> ₹{price}</p>
                </div>
                <button id="b1" >BUY IT NOW</button>
                <button id="b2" onClick={handleAddToCart}>ADD TO CART</button>
                <p className="des">{description}</p>
                <div className="about_product">
                    <div className="shipping">
                        <img src="images/shpii.avif" alt="" />
                        <p>Free Shipping above ₹350</p>
                    </div>
                    <div className="replacement">
                        <img src="images/return.avif" alt="" />
                        <p>Guaranteed Replacements if Damaged</p>
                    </div>
                    <div className="guidence">
                        <img src="images/expert.webp" alt="" />
                        <p>Expert Guidance</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product_details;
