import React, { useState } from 'react'
import "./styles/cstyle.css"
import {Button} from "../components/ui/button.jsx"
import { Link, useNavigate } from "react-router-dom";
import "./styles/login_style.css";
import { toast } from 'react-toastify';

function Login() {
  

    // if (res.data.success)
    //   toast.success("Added  product!")
    // else
    //   toast.error("Error Adding")
    // setnewproduct({name:"",price:"",image:""})

    
  return (
    <div className="login_container">
        {/* 1 */}
        <div className='form_container'>
        {/* 2 */}
        <div className="login_heading">Login</div>

        <form className="login_form" action="">
        <input 
        type="text" 
        placeholder="Email" 
        />

        <input type="password"
        placeholder="Password" 
        />
        <Button className="button1"colorscheme='blue'>
            Login
        </Button>

        <p>Don't have an account yet? <Link to={"/"}>
        <span className='signup'> sign up </span></Link></p>
        
        </form>
        </div>

</div>

  );
}

export default Login
