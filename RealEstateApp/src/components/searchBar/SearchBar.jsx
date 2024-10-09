import React, { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";
function SearchBar() {
  const types = ["buy", "rent"];

  const [active, setActive] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const toggleActive = (val) => {
    setActive((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setActive((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <div className="searchbar">
        <div className="type">
          {types.map((type) => (
            <button
              onClick={() => toggleActive(type)}
              key={type}
              className={active.type === type ? "active" : ""}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
        <form action="" className="flex">
          <input
            type="text"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            min={0}
            max={1000000}
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            min={0}
            max={1000000}
            onChange={handleChange}
          />
          <Link
            to={`/list/?type=${active.type}&city=${active.city}&minPrice=${active.minPrice}&maxPrice=${active.maxPrice}`}
            className="searchicon"
          >
            <span class="material-symbols-outlined">search</span>
          </Link>
        </form>
      </div>
    </>
  );
}

export default SearchBar;
