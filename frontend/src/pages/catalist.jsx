import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './productcard';
import "./styles/cstyle.css";
import Carousel from "./carousel";
import Catagories from './catagery';
// 122
function CatPage() {
  const location = useLocation();
  const { category } = location.state || {};
  const [pro, setPro] = useState([]);
const navigate = useNavigate();
  const handleCardClick = (item) => {
    navigate("/product", { state: item });
  };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/v1/get");
          setPro(res.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);

  return (
    <>
    <div className='cat_container'>
    <Carousel />
      <div className='tit'>
         <h1 className="home_tittle">{category}</h1>
      </div>
      

      <p>Indoor flowering plants bring vibrant colors and natural beauty into your home. From elegant peace lilies to cheerful ixora, these plants add a touch of joy and fragrance to any space. Discover the enchanting world of indoor flowering plants and create a blooming oasis indoors</p>
     <div className="grid-container">
              {pro.map((item, index) => (
                <div key={index} className="card_container" onClick={() => handleCardClick(item)}>
                  <ProductCard products={item} />
                </div>
              ))}
      </div>
    
      </div>
      </>
  );
}

export default CatPage;
