import React from 'react'

const ProductCard = ({products}) => {
    return(
        <div className="card">
      <img src={products.image} alt={products.name} className="card-image" />
      <div className="card-content">
        <h3>{products.name}</h3>
        <p>₹{products.price}</p>
      </div>
    </div>
        
    );
  };
  
  export default ProductCard;
  