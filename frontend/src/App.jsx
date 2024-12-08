import './App.css'
// import { Button } from '@chakra-ui/react';
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "./pages/Homepage";
import Createpage from "./pages/Createpage";
import Navbar from "./compon/navbar.jsx";
import Login from "./pages/login.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProducts from './pages/AllProducts.jsx';
import Footer from './pages/footer.jsx';


function App() {

  return (
     <Box minH={" 100vh"}>
      
         <Navbar>
         </Navbar>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/create" element={<Createpage />} />
                <Route path="/get" element={<AllProducts />} />
                <Route path="/login" element={<Login />} /> 
            </Routes>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <Footer/>
      </Box>

  ); 
}

export default App
