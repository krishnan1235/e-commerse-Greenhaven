import React, { useState } from 'react';
import "./styles/cstyle.css";
import { Button } from "../components/ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import "./styles/login_style.css";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useLogin } from '../logincontext.jsx';
import { useEmail } from "../emailcontext.jsx";

function Login() {
  const [emaili, setemaili] = useState('');
  const [password, setpassword] = useState('');
  const { setLogin } = useLogin();
  const { setemail } = useEmail();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  axios
    .post("http://localhost:5000/api/auth/login", { email: emaili, password })
    .then(response => {
      if (response.status === 200) {
        const token = response.data.token;

        if (token) {
          localStorage.setItem("token", token); // ✅ Save token
          console.log("Saved token:", token);
        } else {
          console.warn("No token received in response.");
        }

        setLogin(true);
        setemail(emaili);
        navigate("/");
        toast.success("Login successful");
      }
    })
    .catch(error => {
      console.error("Login error:", error);
      toast.warning("Invalid email or password");
    });
};


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
            onChange={(e) => setemaili(e.target.value)}
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          
          <Button
            type="button"
            className="button111"
            colorscheme="blue"
            onClick={handleSubmit}
          >
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
