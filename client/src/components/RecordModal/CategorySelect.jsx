import React from "react";
import {
  FaUtensils,
  FaShoppingCart,
  FaHome,
  FaCar,
  FaBus,
  FaPhone,
  FaChartLine,
  FaChevronUp,
} from "react-icons/fa";

const categories = [
  { icon: <FaUtensils />, label: "Food", value: "food" },
  { icon: <FaShoppingCart />, label: "Shopping", value: "shopping" },
  { icon: <FaHome />, label: "Housing", value: "housing" },
  { icon: <FaCar />, label: "Transportation", value: "transportation" },
  { icon: <FaBus />, label: "Vehicle", value: "vehicle" },
  { icon: <FaPhone />, label: "Communication", value: "communication" },
  { icon: <FaChartLine />, label: "Investment", value: "investment" },
];

const CategorySelect = ({ transaction, setTransaction, errors }) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const selectedCategory = categories.find(
    (cat) => cat.value === transaction.category
  );

  const handleCategoryChange = (category) => {
    setShowDropdown(false);
    setTransaction((prev) => ({
      ...prev,
      category: category.value,
    }));
  };

  return (
    <>
    <div className="flex flex-col dark:text-white rounded dark:bg-gray-900 flex-1">
      <div className="relative">
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          type="button"
          className="w-full p-2 rounded border border-gray-300 dark:border-none dark:bg-gray-900 flex items-center justify-between"
        >
          <span className="flex items-center gap-3 capitalize">
            {!transaction.category || <span>{selectedCategory?.icon}</span>}
            {transaction.category || "Select Category"}
          </span>
          <FaChevronUp
            className={`text-gray-500 transition-transform ${
              showDropdown ? "" : "rotate-180"
            }`}
          />
        </button>

        {showDropdown && (
          <div className="absolute z-10 bg-gray-900 border border-gray-300 rounded shadow-lg w-full mt-1">
            {categories.map((category) => (
              <div
                key={category.value}
                onClick={() => handleCategoryChange(category)}
                className="flex items-center p-2 hover:bg-gray-800 cursor-pointer"
              >
                {category.icon}
                <span className="ml-3">{category.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    {errors.category && (
      <p className="text-red-500 text-sm">{errors.category}</p>
    )}
    </>
  );
};

export {CategorySelect, categories};
