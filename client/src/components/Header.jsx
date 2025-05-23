import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { use } from "react";
import useGetEmail from "../hook/useGetEmail";

const Header = ({setShowModal}) => {
    const email = useGetEmail();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/auth/login";
    }
    
  return (
    <>
    <header className="text-gray-600 body-font bg-white dark:bg-gray-900 shadow-md">
  <div className="container mx-auto flex  px-10 py-2 flex-col md:flex-row justify-between items-center">
    <div className="flex">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <img src={logo} className="aspect-square w-10" alt="" />
      <span className="ml-3 text-xl">Fintrack</span>
    </a>
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center dark:text-gray-400">
      {["Dashboard", "Records", "Analytics"].map((item, index) => (
        <NavLink
          key={index}  
            to={`/${item.toLowerCase()}`}
            className="mr-5 hover:text-gray-900 hover:dark:text-gray-800"
            style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "#3b82f6" : "inherit",
            })}
        >
            {item}
        </NavLink>
        ))}

    </nav>
    </div>
    <div className="inline-block">

    <button className="inline-flex mr-3 text-white items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded-full text-base mt-4 md:mt-0" onClick={() => setShowModal(true)}>+ Record </button>
    <div className="inline-flex items-center gap-3 p-2 mt-4 md:mt-0 dark:text-gray-400">
        <picture className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <FaUser className="text-gray-500" />
        </picture>
        <b className="">{email}</b>
    </div>
    <button onClick={handleLogout} className="inline-flex items-center bg-red-500 ml-3  text-white py-2 px-4 rounded-md dark:text-white hover:text-gray-900 dark:hover:text-white">
      Logout
    </button>
  </div>
    </div>
</header>
    </>
  )
}

export default Header;