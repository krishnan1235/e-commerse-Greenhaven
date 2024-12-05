import React from 'react'
import "./styles/categoriess.css";
const Catagories= () => {
  return (
    <div className='categories'>
      <div className="_plants">
        <img src="images\flower.webp" alt="flower plant" />
        <p>Flower Plants</p>
        
      </div>
      <div className="_plants">
          <img src="images\airpurify.webp" alt="Air Purifying Plants" />
          <p>Air Purifying Plants</p>
          
      </div>
      <div className="_plants">
            <img src="images\hanging.webp" alt="Hanging Plants" />
            <p>Hanging Plants</p>
            
      </div>
      <div className="_plants">
              <img src="images\lowmain.webp" alt="Low Maintenance Plants" />
              <p>Low Maintenance Plants</p>
              
      </div>
      <div className="_plants">
            <img src="images\medic.webp" alt="Medicinal Plants"/>
            <p>Medicinal Plants</p>
            
      </div>
      <div className="_plants">
            <img src="images\lowlig.webp" alt="Low Light Plants"/>
            <p>Low Light Plants</p>
            
      </div>
    </div>
  )
}

export default Catagories