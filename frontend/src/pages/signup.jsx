
import React, { useState } from 'react'
import "./styles/cstyle.css"
import {Button} from "../components/ui/button.jsx"
import { Link, useNavigate } from "react-router-dom";
import "./styles/signup.css";
import { toast } from 'react-toastify';
// import e from 'cors';
// import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';



const Signup = () => {
        const navigate=useNavigate();
        const [email, setemail] = useState('');
        const [name, setname] = useState('');
        const [phone, setphone] = useState('');
        const [password, setpassword] = useState('');

      const handlesubmit = async (e) => {
        e.preventDefault(); // Prevent form submission
        const num = parseInt(phone, 10);
        if (name=="" || phone=="" || email=="" || password=="")
        {
          toast.warning("Enter all Fields")
        }
        else if (phone.length<10 || phone.length>10 && (!isNaN(num) && String(num) === phone))
        {
          toast.warning("In valid Phone number");
        }
        else if(email.indexOf(".")==-1 || email.indexOf("@")==-1 )
        {
          toast.warning("In valid Email");
        }
        else if(password.length<6)
        {
          toast.warning("Password Must be 6 characters")
        }
        else{
              try {
                  const res = await axios.post("https://e-commerse-greenhaven.onrender.com/api/auth/register", { 
                      name, 
                      phone, 
                      email, 
                      password 
                  });
    
                      if (res.data.success) {
                          toast.success("Register Successful!");
                          setemail('');
                          setname('');
                          setphone('');
                          setpassword('');
                          navigate('/login');
                          console.log(res);
                        } else {
                            toast.error("Error Adding");
                        }
                    } catch (err) {
                        console.error(err);
                        toast.error("An error occurred!");
                    }
      }
    };
    
  return (
    <div className="signup_container">
    {/* 1 */}
    <div className='form_container_signup'>
    {/* 2 */}
    <div className="signup_heading">Create Account</div>

    <form  className="signup_form" action="">
    <input  
    type="text" 
    placeholder="Name" 
    value={name}
    onChange={(e)=>{setname(e.target.value)}}
    />
    <input 
    type="text" 
    placeholder="phone Number" 
    value={phone}
    onChange={(e)=>{setphone(e.target.value)}}
    />
    <input 
    type="email" 
    placeholder="Email" 
    value={email}
    onChange={(e)=>{setemail(e.target.value)}}
    />
    <input type="password"
    placeholder="Password" 
    value={password}
    onChange={(e)=>{setpassword(e.target.value)}}
    />
    <Button type="button" className="button2" colorscheme="blue" onClick={handlesubmit}>
    Register
    </Button>

    {/* <p>Don't have an account yet? <Link to={"/signup"}>
    <span className='signup'> sign up </span></Link></p> */}
    
    </form>
    </div>

</div>
  )
}

export default Signup