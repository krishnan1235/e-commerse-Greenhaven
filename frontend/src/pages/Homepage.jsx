import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './productcard';
import Carousel from "./carousel";
import Catagories from './catagery';

function Homepage() {
  // const [allData, setAllData] = useState([]);

  const [pro,setpro]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/get");
            // console.log(res)
            setpro(res.data.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
  }, []);
  
  // console.log(pro)
  return (
    <>
     
    <Catagories/>
    <div className="carousel_container">
    <Carousel/>
    </div>
    <div className='intro'>
      <h>Plants</h>
      <p>Plants make for the best house companions, suitable for all your moods and every aesthetic. Ugaoo brings you the widest variety of plants to choose from so you can buy plants online from the comfort of your home!</p>
    </div>

    <div className="home_container">
    <div className="contains">
      <p className="home_tittle">Current Products</p>
      {pro.length === 0 ? (
        <h1 className="home_res">
          No Products found❗ 
          <span id="gotocreate">
            <Link to="/create">Create page</Link>
          </span>
        </h1>
      ) : (
        <div className="grid-container">
          {pro.map((item, index) => (
            <div key={index} className="card_container">
              <ProductCard products={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  </>
);
}

export default Homepage;
