import React, { useState } from 'react'
import "./styles/cstyle.css"
import {Button} from "../components/ui/button.jsx"
import { Link, useNavigate } from "react-router-dom";
import "./styles/login_style.css";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useLogin } from '../logincontext.jsx';
import {useEmail} from "../emailcontext.jsx"

function Login() {
  const [emaili, setemaili] = useState('');
  const [password, setpassword] = useState('');
  const {setLogin}=useLogin();
  const {setemail}=useEmail();
  const navigate=useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(emaili);

      axios.post("http://localhost:5000/api/auth/login", { email: emaili, password })

        .then(response => {
         
          console.log(response.data);
          setLogin(true);
          setemail(emaili);
          navigate("/"); 
        })
        .catch(error => {
          
          console.error("Login error:", error);
          toast.warning("Invalid email or password");
        });
    };
  
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
        type="email" 
        placeholder="Email" 
        value={emaili}
        onChange={(e)=>setemaili(e.target.value)}
        />

        <input type="password"
        placeholder="Password" 
        value={password}
        onChange={(e)=>setpassword(e.target.value)}
        />

        <Button  type="button" className="button1" colorscheme="blue" onClick={handleSubmit}>
            Login
        </Button>

        <p>Don't have an account yet? <Link to={"/signup"}>
        <span className='signup'> Create account</span></Link></p>
        
        </form>
        </div>

</div>

  );
}

export default Login;