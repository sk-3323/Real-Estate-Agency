import React from "react";
import "./Home.scss";
import bg from "../../assets/bg.png";
import SearchBar from "../../components/searchBar/SearchBar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
function Home() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <>
      <div className="homePage w-full">
        <div className="textContainer">
          <div className="wrapper flex flex-col justify-center gap-7 h-full">
            <h1 className="capitalize lg:text-4xl text-3xl font-bold">
              find real estate & get your dream place
            </h1>
            <p>
              We have the most accurate, up-to-date listings with over 2 million
              properties and all the latest real estate information to help make
              your next move as easy as possible.
            </p>
            <SearchBar></SearchBar>
            <div className="boxes flex justify-around w-full mt-5">
              <div className="box w-1/3">
                <h1 className="lg:text-4xl text-3xl font-bold">16+</h1>
                <h2 className="lg:text-2xl text-sm text-zinc-500 mt-4">
                  Years of Experience
                </h2>
              </div>
              <div className="box w-1/3">
                <h1 className="lg:text-4xl text-3xl font-bold">200+</h1>
                <h2 className="lg:text-2xl text-sm text-zinc-500 mt-4">
                  Award Gained
                </h2>
              </div>
              <div className="box w-1/3">
                <h1 className="lg:text-4xl text-3xl font-bold">2000+</h1>
                <h2 className="lg:text-2xl text-sm text-zinc-500 mt-4">
                  Property Ready
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="imgContainer">
          <img src={bg} alt="" />
        </div>
      </div>
    </>
  );
}

export default Home;
