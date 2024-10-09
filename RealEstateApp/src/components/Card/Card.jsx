import "./Card.scss";
import React from "react";
import { Link } from "react-router-dom";
const Card = ({ item }) => {
  return (
    <>
      <div className="carditem flex w-full gap-11">
        <Link to={`/item/${item.id}`} className="imgContainer w-1/2">
          <img
            src={item.img}
            alt=""
            className="itemImage"
            height={300}
            width={300}
          />
        </Link>
        <div className="textContainer w-full">
          <div className="desc flex flex-col justify-between h-full gap-4">
            <Link
              to={`/item/${item.id}`}
              className="font-semibold text-xl transition-all ease-in-out delay-75 hover:scale-100"
            >
              {item.title}
            </Link>
            <p className="font-light text-sm flex justify-start gap-2">
              <span>
                <span class="material-symbols-outlined">location_on</span>
              </span>
              <span>{item.address}</span>
            </p>
            <h1 className="font-smibold">
              <span className="bg-yellow-100 px-3 py-2">${item.price}</span>
            </h1>
            <p className="text-gray-500 font-light text-sm flex gap-4">
              <span className="bg-zinc-100 px-3 py-1 rounded-xl">
                {item.bedroom} bedroom
              </span>
              <span className="bg-zinc-100 px-3 py-1 rounded-xl">
                {item.bathroom} bathroom
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
