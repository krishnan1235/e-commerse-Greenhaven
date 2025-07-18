import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './productcard';
import './styles/cstyle.css';

function CatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract category from the location state, if available
  const { category } = location.state || {};
  
  const [pro, setPro] = useState([]); // Store filtered products

  // Handle card click to navigate to the product detail page
  const handleCardClick = (item) => {
    navigate("/product", { state: item });
  };

   const getCategoryDescription = (cat) => {
    switch (cat) {
      case "flowers":
        return "Indoor flowering plants bring vibrant colors and natural beauty into your home. From elegant peace lilies to cheerful ixora, these plants add a touch of joy and fragrance to any space. Discover the enchanting world of indoor flowering plants and create a blooming oasis indoors.";
      case "airpurify":
        return "Air-purifying plants help clean your indoor air by absorbing toxins and releasing oxygen. They're not just green—they're smart too!";
      case "indoor":
        return "Indoor plants make your space feel alive and fresh. They're great for decor and even better for mental wellness.";
      case "lowmaintenance":
        return "Perfect for busy lives, low-maintenance plants require minimal care and thrive in a variety of environments.";
      case "medicional":
        return "Medicinal plants like Tulsi and Aloe Vera have healing properties and are essential for a natural lifestyle.";
      case "Low Light Plants":
        return "Low-light plants thrive even in shaded areas of your home, making them ideal for offices, bedrooms, and bathrooms.";
      default:
        return "Explore our wide variety of plants to brighten up your home and improve your lifestyle!";
    }
  };


  // Fetch products from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/get"); // Your product endpoint
        // const res = await axios.get("https://e-commerse-greenhaven.onrender.com/api/v1/get"); // Your product endpoint
        const allProducts = res.data.data;
        console.log(category)
        // If category is provided, filter products based on the category
        const filteredProducts = category
          ? allProducts.filter(
              (item) =>
                item.category &&
                item.category.toLowerCase() === category.toLowerCase()
            )
          : allProducts; // If no category, return all products

        setPro(filteredProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [category]); // Re-run whenever category changes

  return (
    <div className="cat_container">
      <div className="tit">
        <h1 className="home_tittle">{category || "Category"}</h1>
      </div>

      <p>
       {getCategoryDescription(category)}
      </p>

      {/* If no products in the selected category */}
      {pro.length === 0 ? (
        <div className="no-products">
          <p>No products found in this category.</p>
          <button
            className="view-products"
            onClick={() => navigate("/")} // Navigate to homepage
          >
            View All Products
          </button>
        </div>
      ) : (
        <div className="grid-container">
          {pro.map((item, index) => (
            <div
              key={index}
              className="card_container"
              onClick={() => handleCardClick(item)}
            >
              <ProductCard products={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CatPage;
