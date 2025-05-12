import React from 'react'
import "./styles/categoriess.css";
import { Link } from 'react-router-dom';
const Catagories= () => {
  const functionp=()=>{
    console.log("ppp");
  }
  return (
    <div className='categories' >
      <div className="_plants">

     <Link to="/catlist" state={{ category: "flowers" }}>
      <img src="images/flower.webp" alt="flower plant" />
      <p>Flower Plants</p>
    </Link>
        
      </div>
      <div className="_plants">
      <Link to="/catlist" state={{ category: "airpurify" }}>
          <img src="images\airpurify.webp" alt="Air Purifying Plants" />
          <p>Air Purifying Plants</p>
          </Link>
      </div>
      <div className="_plants">
      <Link to="/catlist" state={{ category: "indoor" }}>
            <img src="images\hanging.webp" alt="Hanging Plants" />
            <p>Hanging Plants</p>
            </Link>
            
      </div>
      <div className="_plants">
      <Link to="/catlist" state={{ category: "lowmaintenance" }}>
              <img src="images\lowmain.webp" alt="Low Maintenance Plants" />
              <p>Low Maintenance Plants</p>
              </Link>
              
      </div>
      <div className="_plants">
      <Link to="/catlist" state={{ category: "medicional" }}>
            <img src="images\medic.webp" alt="Medicinal Plants"/>
            <p>Medicinal Plants</p>
            </Link>
            
      </div>
      <div className="_plants">
      <Link to="/catlist" state={{ category: "Low Light Plants" }}>
            <img src="images\lowlig.webp" alt="Low Light Plants"/>
            <p>Low Light Plants</p>
            </Link>
            
      </div>
    </div>
  )
}

export default Catagories