import { useSearchParams } from "react-router-dom";
import "./Filter.scss";
import React, { useState } from "react";
const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "buy",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: parseInt(searchParams.get("minPrice") || 0),
    maxPrice: parseInt(searchParams.get("maxPrice") || 1000000),
    bedroom: parseInt(searchParams.get("bedroom") || 1),
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };
  return (
    <div className="filter">
      <h1>
        Search Result for <b>{query.city}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            defaultValue={query.city}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            defaultValue={query.type}
            onChange={handleChange}
          >
            <option disabled selected>
              any
            </option>
            <option defaultValue="buy">Buy</option>
            <option defaultValue="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="type">Property</label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            defaultValue={query.property}
          >
            <option disabled selected>
              any
            </option>
            <option defaultValue="apartment">Apartment</option>
            <option defaultValue="house">House</option>
            <option defaultValue="condo">Condo</option>
            <option defaultValue="land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Any"
            onChange={handleChange}
            min={0}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            onChange={handleChange}
            placeholder="Any"
            min={0}
            defaultValue={query.maxPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="Any"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>
        {/* <div className="item"> */}
        <button className="searchicon" onClick={handleFilter}>
          <span class="material-symbols-outlined">search</span>
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Filter;
