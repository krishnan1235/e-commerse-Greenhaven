import { useEffect, useState } from "react";
import axios from "axios";
import { useEmail } from "../emailcontext";
import "./styles/cartpage.css";
import { toast } from 'react-toastify';

const Cart = () => {
    const { email } = useEmail();
    const [cartItems, setCartItems] = useState([]);
    
    useEffect(() => {
        if (email) {
            fetchCartItems();
        }
    }, [email]);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/cart/${email}`);
            // const response = await axios.get(`https://e-commerse-greenhaven.onrender.com/api/cart/${email}`);
            setCartItems(response.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const addQuantity = async (item) => {
        try {
            // const response = await axios.post("https://e-commerse-greenhaven.onrender.com/api/cart/add", {
            const response = await axios.post("http://localhost:5000/api/cart/add", {
                email: email,
                name: item.name
            });
            if (response.data.success) {
                toast.success("Added Successfully!");
                fetchCartItems();
            } else {
                toast.error("Failed to add");
            }
        } catch (error) {
            console.error("Error adding quantity:", error);
        }
    };

    const subQuantity = async (item) => {
        try {
            if (item.quantity > 1) {
                // await axios.patch("https://e-commerse-greenhaven.onrender.com/api/cart/update", {
                await axios.patch("http://localhost:5000/api/cart/update", {
                    email: email,
                    name: item.name
                });
            } else {
                // await axios.delete(`https://e-commerse-greenhaven.onrender.com/api/cart/${email}/${item._id}`);
                await axios.delete(`http://localhost:5000/api/cart/${email}/${item._id}`);
                toast.success("Removed Successfully!");
            }
            fetchCartItems();
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="cart_container">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <div>
                    <div className="listi">
                        {cartItems.map((item, index) => (
                            <div className="cart_card" key={index}>
                                <img src={item.image} alt={item.name} />
                                <div className="cart_content">
                                    <div>
                                        <h2>{item.name}</h2>
                                        <p>Price <del>{item.selling}</del> ₹{item.price}</p>
                                    </div>
                                    <div className="quantity">
                                        <div id="add" onClick={() => addQuantity(item)}>+</div>
                                        <p id="qty">{item.quantity}</p>
                                        <div id="sub" onClick={() => subQuantity(item)}>-</div>
                                    </div>
                                </div>  
                            </div>
                        ))}
                    </div>
                    <div className="total_info">
                        <h3>Total Quantity: {totalQuantity}</h3>
                        <h3>Total Price: ₹{totalPrice}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;