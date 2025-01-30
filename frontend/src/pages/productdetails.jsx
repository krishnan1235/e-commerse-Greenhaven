
import React from "react";
import { useLocation } from 
"react-router-dom";
import { FaStar } from "react-icons/fa";
import "./styles/productdetailsstyle.css";

const Product_details = () => {
    const location = useLocation();
    const { name, price, image } = location.state; 
  var logPrice =(price/500)*5;
  if (logPrice<=3)
  {
    logPrice=3.8;
  }
  else if(logPrice>5)
  {
    logPrice=4.70;
  }
  const stars = Array(5).fill(false).map((_, index) => index < logPrice);
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
                    <FaStar key={index} color={filled ? "yellow" : "gray"} />
                ))}
            <div>{logPrice.toFixed(2)}</div>
            </div>
            <div className="p_price">
                <p><del>{price*2}</del> ₹{price}</p>
                </div>
            <button id="b1">BUY IT NOW</button>
            <button id="b2">ADD TO CART</button>
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


