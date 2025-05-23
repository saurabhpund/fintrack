import React, { useRef, useState } from "react";
import { FaCoins } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import BalanceTrendCard from "../../components/Cards/BalanceTrendCard";

const Overview = () => {
  return (
    <>
      <InitialCash />
      <TimelineFilter />
      <div className="flex gap-5 px-10 py-3">
        <BalanceTrendCard />
        </div>
    </>
  );
};

const InitialCash = () => {
  return (
    <div className="bg-gray-200 group dark:bg-gray-700">
      <div className="p-4 bg-slate-200 px-10 dark:bg-gray-800 ">
        <div className=" bg-violet-500 w-1/4 p-3 rounded-md flex items-center text-white">
          <FaCoins className="h-full text-4xl" />
          <div className="flex flex-col ms-3">
            <h1 className="text-xl font-bold">Cash</h1>
            <h1 className="text-xl font-bold">$ 10,000</h1>
          </div>
          <div className="ms-auto items-start group-hover:visible invisible cursor-pointer">
            <MdOutlineEdit className="text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineFilter = () => {
  return (
    <>
      <div className="flex items-center w-full px-10 py-3">
        <div className="flex justify-center gap-2 items-center w-full">
          <FaCaretLeft className="text-black dark:text-white cursor-pointer" />
          <Dropdown />
          <FaCaretRight className="text-black dark:text-white cursor-pointer" />
        </div>
      </div>
    </>
  );
};


const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const [timeFilter, setTimeFilter] = useState("Today");

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        id="dropdownDefaultButton"
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        onBlur={(e) => {
          // Delay to allow clicking dropdown items before closing
          setTimeout(() => {
            if (!buttonRef.current.contains(document.activeElement)) {
              setIsOpen(false);
            }
          }, 100);
        }}
        className="text-gray-700 bg-white border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-900 dark:focus:ring-gray-800"
      >
        {timeFilter}
        <svg
          className="w-2.5 h-2.5 ml-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="dropdown"
          className="absolute left-[-40px] mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-900"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
              Today
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
              Last 7 Days
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                This Week
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                This Month
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                This Year
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Overview;
