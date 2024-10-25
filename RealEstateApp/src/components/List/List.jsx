import "./List.scss";
import React from "react";
import "../../routes/ListPage/Listpage.scss";
import Card from "../Card/Card";

const List = ({ posts }) => {
  console.log(posts);

  return (
    <div className="wrapper mt-5 h-full pb-11">
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default List;
