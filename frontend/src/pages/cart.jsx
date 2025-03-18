import React, { useEffect, useState } from "react";
import axios from "axios";
import { useEmail} from "../emailcontext";
import "./styles/cartpage.css"; 
import { toast } from 'react-toastify';
const Cart = () => {
    const { email } = useEmail();
    // const [quantity,setquantity]=useState(0);
    const [cartItems, setCartItems] = useState([]);
    
    useEffect(() => {
        if (email) {
            axios.get(`http://localhost:5000/api/cart/${email}`)
                .then(response => setCartItems(response.data))
                .catch(error => console.error("Error fetching cart:", error));
        }
    }, [email]);

    // if (email) {
    //     axios.get(`http://localhost:5000/api/cart/${email}`)
    //         .then(response => setCartItems(response.data))
    //         .catch(error => console.error("Error fetching cart:", error));
    // }
    const addquantity = async (item) => {
        const response = await axios.post("http://localhost:5000/api/cart/add", {
            email: email,
            name:item.name
        });
        if (email) {
            axios.get(`http://localhost:5000/api/cart/${email}`)
                .then(response => setCartItems(response.data))
                .catch(error => console.error("Error fetching cart:", error));
        }
            // console.log("Response:", response.data);
    
            if (response.data.success) {
                toast.success("Added Successfully!");
            } else {
                toast.error("Failed to add");
            }
    }

    const subquantity = async (item) => {
        if (item.quantity >1) {  // Ensure quantity is greater than 0
            try {
                const response = await axios.patch("http://localhost:5000/api/cart/update", {
                    email: email,
                    name:item.name
                });
                // console.log("Updated quantity:", response.data);
            } catch (error) {
                console.error("Error updating quantity:", error);
            }
        } else {
           const respone = await axios.delete(`http://localhost:5000/api/cart/${email}/${item._id}`)
           toast.success("Removed Successfully!");
        }
        
        if (email) {
            axios.get(`http://localhost:5000/api/cart/${email}`)
                .then(response => setCartItems(response.data))
                .catch(error => console.error("Error fetching cart:", error));
        }
            
        
    
      
        }
        
    
   

    return (
        <div className="cart_container">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <div className="listi">
                    {cartItems.map((item, index) => (
                        <div className="cart_card" key={index}>
                            <img src={item.image} alt={item.name}  />
                            <div className="cart_content">
                                <div>

                                    <h2>{item.name} </h2>
                                    <p> Price <del>{item.selling} </del>₹{item.price} </p>
                                 </div>
                                 <div className="quantity">
                                        <div id="add" onClick={() => addquantity(item)}>
                                            +
                                        </div>
                                        <p id="qty">{item.quantity}</p>
                                        <div id="sub" onClick={() => subquantity(item)}>
                                            -
                                        </div>
                                    </div>
                                </div>  
                            {/* <p>lo</p> */}
                        </div>
                    ))}
        
                </div>
            )}
        </div>
    );
};

export default Cart;
