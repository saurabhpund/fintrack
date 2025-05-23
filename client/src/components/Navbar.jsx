import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <header className="text-gray-600 body-font">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <img src={logo} className="aspect-square w-10" alt="" />
        <span className="ml-3 text-xl">FinTrack</span>
      </a>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <a className="mr-5 hover:text-gray-900 cursor-pointer">Home</a>
      <a className="mr-5 hover:text-gray-900 cursor-pointer">About Us</a>
      
    </nav>
    </div>
  </header>
  );
};

export default Navbar;
