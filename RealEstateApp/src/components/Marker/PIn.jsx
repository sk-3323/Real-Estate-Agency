import { Link } from "react-router-dom";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import "./marker.scss";
const PIn = ({ item }) => {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.img} alt="" />
          <div className="textContainer">
            <Link to={`/item/${item.id}`}>{item.title}</Link>
            <span className="bed">{item.bedroom} Bed</span>
            <b>${item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default PIn;
