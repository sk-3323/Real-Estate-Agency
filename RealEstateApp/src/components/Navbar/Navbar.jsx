import React, { useContext, useEffect } from "react";
import "./Navbar.scss";
import logo from "../../assets/home.png";
import SignupBtn from "./SignupBtn";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";
import { easeIn, easeInOut, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNotification } from "../../lib/notificationStore.js";
const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  // const [notifi, setNotification] = useState(0);
  const menuAction = () => {
    setOpen(!isOpen);
  };

  const fetch = useNotification((state) => state.fetch);
  fetch();
  const number = useNotification((state) => state.notification);

  // setNotification(number);
  // if (currentUser) {
  //   fetch();
  // }
  console.log(number);

  return (
    <>
      <nav>
        <div className="left">
          <ul className="navitems">
            <li>
              <a href="/" className="logo">
                <img src={logo} alt="" />
                <span className="logo">LuxeLiving</span>
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
            <>
              <h1>Welcome,</h1>
              <Link
                to={`/profile`}
                className="user relative px-4 py-2 bg-[#FECE51] rounded-lg"
              >
                {number !== 0 && (
                  <div className="h-6 w-6 bg-red-500 flex justify-center items-center rounded-full text-white absolute -top-3 -right-2">
                    {number}
                  </div>
                )}
                <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
                <span>{currentUser.username}</span>
              </Link>
            </>
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
