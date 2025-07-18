import './App.css';
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import Homepage from "./pages/Homepage";
import Homepage from './pages/Homepage.jsx';
// import ChatBot from './pages/ChatBot.jsx';
import Createpage from "./pages/Createpage";
import Adminpage from './adminpage.jsx';
import Navbar from "./compon/navbar.jsx";
import Login from "./pages/login.jsx";
import Signup from './pages/signup.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProducts from './pages/AllProducts.jsx';
import Profile from './pages/profile.jsx';
import Footer from './pages/footer.jsx';
import { LoginProvider } from './logincontext.jsx'; 
import {EmailProvider} from './emailcontext.jsx'
import Product_details from './pages/productdetails.jsx';
import CatPage from "./pages/catalist.jsx";
import Cart from "./pages/cart.jsx";

import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";


import PlantDiseasePredictor from './pages/PlantDiseasePredictor.jsx';



function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600); // Check for mobile
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile); // Recheck on resize

    return () => window.removeEventListener("resize", checkMobile); // Cleanup
  }, []);

  return (
    <Box minH={"100vh"}>
    <LoginProvider>
    <EmailProvider>

      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/product" element={<Product_details/>}/>
        <Route path="/get" element={<AllProducts />} />
        <Route path="/admin" element ={<Adminpage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/catlist" element={<CatPage />} />
        <Route path="/disease-predictor" element={<PlantDiseasePredictor />} />


<Route path="/order-confirmation" element={<OrderConfirmation />} />
<Route path="/order-success" element={<OrderSuccess />} />
        
      </Routes>
      <ToastContainer
  position="top-center"
  autoClose={2000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
  className="custom-toast-container"
  style={{
    position: 'fixed', // 🔥 Makes it float above everything
    top: isMobile ? '100px' : '70px', // 🔼 Increased top position
    left: '50%',
    transform: 'translateX(-50%)', // ✅ Perfect horizontal center
    width: isMobile ? '80%' : '300px',
    fontSize: isMobile ? '14px' : '16px',
    zIndex: 99999 // 🧱 Ensure it's above navbars/modals etc
  }}
/>

      <Footer />
        </EmailProvider>
        </LoginProvider>
    </Box>
  );
}

export default App;
