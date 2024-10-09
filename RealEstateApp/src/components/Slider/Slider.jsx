import React, { useState } from "react";
import "./Slider.scss";
const Slider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(null);
  const navigate = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };
  return (
    <>
      <div className="slider">
        {imageIndex !== null && (
          <div className="fullSlider">
            <div className="arrow">
              <img src="/arrow.png" alt="" onClick={() => navigate("left")} />
            </div>
            <div className="imgContainer">
              <img src={images[imageIndex]} alt="" />
            </div>
            <div className="arrow">
              <img
                src="/arrow.png"
                alt=""
                className="rotate-180"
                onClick={() => navigate("right")}
              />
            </div>
            <div
              className="close text-zinc-900"
              onClick={() => setImageIndex(null)}
            >
              X
            </div>
          </div>
        )}
        <div className="bigimg">
          <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
        </div>
        <div className="smallimg">
          {images.slice(1).map((image, index) => (
            <img src={image} onClick={() => setImageIndex(index + 1)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Slider;
