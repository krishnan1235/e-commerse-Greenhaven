import React from 'react'
import "./styles/footerc.css";
import { IoIosLeaf } from "react-icons/io";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

import { GiMonsteraLeaf } from "react-icons/gi";


const Footer = () => {
  return (
    <>
   <div className="lineer">
   <marquee behavior="scroll" direction="left">
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        <IoIosLeaf style={{ marginRight: '5px' }} />
        GreenHaven <GiMonsteraLeaf  style={{ margin: '10px' }}  />
        we're on a mission to make greenery accessible and stylish . Discover our story and explore how we're transforming spaces with nature.
      </span>
    </marquee>
      
   </div>
   <div className="footer_c">
    <div className="f_about">
    <p>About GreenHaven</p>
  Inspired by the harmony of nature, GreenHaven means "flower bed" in English. Cultivate your own sanctuary of serenity right at home. Whether you're a seasoned plant parent or just beginning your green journey, GreenHaven is here to nurture your passion for plants with expert guidance and premium products. Experience the joy of green living with GreenHaven—where every leaf tells a story and every bloom inspires wonder.
    <div id="ico">
    <CiFacebook />
    <FaInstagram />
    <FaXTwitter />
    <FaLinkedinIn />
    <IoLogoYoutube />

    </div>

    </div>
    <div className="f_customer">
    <p>Customer Care</p>
Take The Plant Quiz <br />
Track Order<br />
Shipping Policy<br />
Terms and Conditions<br />
Privacy Policy<br />
FAQs<br />
Terms of Service<br />
Refund policy<br />
    </div>
    <div className="f_contact">
    <p>Get in touch</p>

Address: xxx, PB road,Tamilnadu 008988<br />

Call us for Support: +91 xxxxxxxxxx<br />

Timings: Mon-Sat from 10 am to 6 pm<br />

Email: greenhaven@gmail.com<br />
For Bulk Orders : corporate@greenhaven.com<br />
    </div>
   </div>
    </>
  )
}

export default Footer