import './App.css';
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Homepage from "./pages/Homepage";
import Createpage from "./pages/Createpage";
import Navbar from "./compon/navbar.jsx";
import Login from "./pages/login.jsx";
import Signup from './pages/signup.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProducts from './pages/AllProducts.jsx';
import Footer from './pages/footer.jsx';
import { LoginProvider } from './logincontext.jsx'; 
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

      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/get" element={<AllProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
          marginTop: isMobile ? '60px' : '10px',
          marginLeft:isMobile? '30px':'',
          width: isMobile ? '80%' : '300px',      
          fontSize: isMobile ? '14px' : '16px',   
        }}
        />  
      <Footer />
        </LoginProvider>
    </Box>
  );
}

export default App;
