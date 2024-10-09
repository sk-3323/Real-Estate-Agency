import "./List.scss";
import React from "react";
import "../../routes/ListPage/Listpage.scss";
import { listData } from "../../lib/dummydata";
import Card from "../Card/Card";
import { useLoaderData } from "react-router-dom";

const List = () => {
  return (
    <div className="wrapper mt-5 h-full pb-11">
      {data.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default List;
