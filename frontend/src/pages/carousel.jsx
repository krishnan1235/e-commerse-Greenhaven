import React from "react";
import Slider from "react-slick";
import "./styles/Carousel.css"; // Optional: Add custom styling in a separate CSS file

// Custom Arrow Components
const CustomPrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      display: "flex",
      justifyContent:"center",
      alignItems:"center",
      background: "red", // Change to your desired color
      borderRadius: "50%", // Example: make it circular
      zIndex: 1 // Ensure it's above slides
    }}
    onClick={onClick}
  />
);

const CustomNextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      display: "flex",
      justifyContent:"center",
      alignItems:"center",
      // background: "blue", // Change to your desired color
      borderRadius: "50%", // Example: make it circular
    }}
    onClick={onClick}
  />
);

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <Slider {...settings}>
        <div>
        <img
            className="poster_image"
            src="images\Thank.png"
            alt="poster 1"
          />
       
        </div>
        <div>
        <img
            className="poster_image"
            src="images\Global.png"
            alt="poster 1"
          />
        </div>
        <div>
        <img
            className="poster_image"
            src="images\Green H.png"
            alt="poster 1"
          />
       
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
