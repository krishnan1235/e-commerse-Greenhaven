import React from 'react'
// import { FaStar } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";

// import "./styles/productdetailsstyle.css";
import "./styles/cstyle.css";
const ProductCard = ({products}) => {
  const stars = Array(5).fill(false).map((_, index) => index < 5);
    return(
        <div className="card">
      <img src={products.image} alt={products.name} className="card-image" />
      <div className="card-content">

        <h3>{products.name}</h3>
        <p>₹{products.price}</p>
        <div className='ratings'>
          
        <IoStarSharp  color='#FFD700'/>
        <IoStarSharp  color='#FFD700'/>
        <IoStarSharp  color='#FFD700'/>
        <IoStarSharp  color='#FFD700'/>
        <IoStarSharp  color='#FFD700'/>
        
                          
                          </div>
        <button id="b2">VIEW MORE</button>  
      </div>
    </div>
        
    );
  };
  
  export default ProductCard;
  