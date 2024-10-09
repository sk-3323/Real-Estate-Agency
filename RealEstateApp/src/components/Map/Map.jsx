import React from "react";
import "./Map.scss";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
// import Marker from "../Marker/PIn.jsx";
import PIn from "../Marker/PIn.jsx";
const Map = ({ item }) => {
  return (
    <MapContainer
      center={
        item.length === 1
          ? [item[0].latitude, item[0].longitude]
          : [52.4797, -1.90269]
      }
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {item.map((item) => (
        <PIn item={item} />
      ))}
    </MapContainer>
  );
};

export default Map;
