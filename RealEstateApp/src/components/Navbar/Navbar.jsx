import React, { useContext } from "react";
import "./Navbar.scss";
import logo from "../../assets/react.svg";
import SignupBtn from "./SignupBtn";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";
import { easeIn, easeInOut, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const menuAction = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <nav>
        <div className="left">
          <ul className="navitems">
            <li>
              <a href="#" className="logo">
                <img src={logo} alt="" />
                <span>RealEstate</span>
              </a>
            </li>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
            <li>
              <a href="">Agents</a>
            </li>
          </ul>
        </div>
        <div className="right bg-white min-h-full flex justify-end lg:bg-[#FCF6F3]">
          {currentUser ? (
            <Link to={`/profile`} className="user">
              <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
              <span>{currentUser.username}</span>
            </Link>
          ) : (
            <ul>
              <li>
                <a href="">
                  <NavLink to={`/login`}>SIGN IN</NavLink>
                </a>
              </li>
              <li>
                <a href="">
                  <NavLink to={`/register`}>
                    <SignupBtn></SignupBtn>
                  </NavLink>
                </a>
              </li>
            </ul>
          )}
          <div className="menu overflow-hidden">
            <div className="menuicon mt-2">
              <Hamburger toggled={isOpen} toggle={menuAction} />
            </div>
            {isOpen ? (
              <motion.div
                className="menu-items bg-zinc-700 h-screen overflow-hidden"
                initial={{ x: -80, opacity: 0.3 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: { duration: 1, ease: easeInOut },
                }}
                // transition={{ duration: 1, easings: "linear" }}
              >
                <ul>
                  <li>
                    <a href="">Home</a>
                  </li>
                  <li>
                    <a href="">About</a>
                  </li>
                  <li>
                    <a href="">Contact</a>
                  </li>
                  <li>
                    <a href="">Agents</a>
                  </li>
                  <li>
                    <a href="">
                      <button>SIGN IN</button>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <SignupBtn></SignupBtn>
                    </a>
                  </li>
                </ul>
              </motion.div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
