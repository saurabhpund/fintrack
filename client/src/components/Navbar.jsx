import React from "react";
import logo from "../assets/logo.svg";

const Navbar = () => {

  return (
    <header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <img src={logo} className="aspect-square w-10" alt="" />
        <span class="ml-3 text-xl">FinTrack</span>
      </a>
      <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      <a class="mr-5 hover:text-gray-900 cursor-pointer">Home</a>
      <a class="mr-5 hover:text-gray-900 cursor-pointer">About Us</a>
      
    </nav>
      <button class="inline-flex items-center bg-primary text-white border-0 py-1 px-3 focus:outline-none hover:opacity-90 rounded text-base mt-4 md:mt-0">Get Started
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </header>
  );
};

export default Navbar;
