import React from "react";
import "./Listpage.scss";
import { listData } from "../../lib/dummydata";
import Filter from "../../components/Filter/Filter";
import Card from "../../components/Card/Card";
import Map from "../../components/Map/Map";
import { useLoaderData } from "react-router-dom";
const Listpage = () => {
  const data = useLoaderData();
  return (
    <>
      <div className="listPage h-full">
        <div className="listContainer overflow-auto h-full">
          <Filter />
          <div className="wrapper mt-5 h-full pb-11">
            {data.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="mapContainer">
          <Map item={data} />
        </div>
      </div>
    </>
  );
};

export default Listpage;
