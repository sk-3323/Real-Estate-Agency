import { useContext, useEffect, useState } from "react";
import "./layout.scss";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.jsx";
function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser ? (
        <div className="layout">
          <div className="navbar">
            <Navbar></Navbar>
          </div>
          <div className="content">
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to={`/login`} />
      )}
    </>
  );
}

function Layout() {
  return (
    <>
      <div className="layout">
        <div className="navbar">
          <Navbar></Navbar>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export { RequireAuth, Layout };
