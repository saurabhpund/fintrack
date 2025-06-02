import React from 'react'
import Header from '../../components/Header'
import { FaSearch } from 'react-icons/fa'
import useSetTitle from '../../hook/useSetTitle'
import { ModalContext } from '../../context/Context'
import DisplayRecords from '../../components/DisplayRecords'
import axios from 'axios'

const Records = () => {
  useSetTitle({ title: "Records - Finance Tracker" });
  return (
    <>
    <Header />
    <RecordContainer />
    </>
  )
}

const RecordContainer = () => {
const [records, setRecords] = React.useState([]);
const [loading, setLoading] = React.useState(true);
const [error, setError] = React.useState(null);
const { refreshRecords } = React.useContext(ModalContext);

const fetchTransactions = async () => {
         await axios.get("http://localhost:8000/gettransaction", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }).then((response) => {
        setRecords(response.data)
        }).catch ((err) => {
        console.error("Error fetching records:", err);
        setError("Failed to load transactions.");
      }).finally(() => {
        setLoading(false);
      })
    };

React.useEffect(() => {
    fetchTransactions();
  }, [refreshRecords]);

  return (
    // create two column one having filters and one having records
    <div className=' px-10 py-3 dark:text-white dark:bg-gray-800 '>
      <div className='flex gap-5 items-center justify-end'>
        <p>Sort By</p>
        <select className='bg-gray-200 outline-none dark:bg-gray-700 p-2 rounded-md'>
          <option value="date">Time (newest first)</option>
          <option value="amount">Time (oldest first)</option>
          <option value="category">Amount (lowest first)</option>
          <option value="category">Amount (highest   first)</option>
        </select>

      </div>
      <div className='flex gap-5 my-3 min-h-screen'>
      <div className='w-1/5 bg-gray-200 dark:bg-gray-700 p-5 rounded-md'>
        <Filters />
      </div>
      <div className='w-full bg-gray-200 dark:bg-gray-700 p-5 rounded-md'>
        <DisplayRecords records={records}  />
      </div>
      </div>
    </div>
  )

}

const Filters = () => {
  const { toggleRecordModal } = React.useContext(ModalContext);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [paymentType, setPaymentType] = React.useState("all");

  const categories = [
    "food", "shopping", "housing", "transportation",
    "vehicle", "communication", "investment"
  ];

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPaymentType("all");
  };

  const isFiltering = () => {
    return (
      searchTerm.trim() !== "" ||
      selectedCategory !== "all" ||
      paymentType !== "all"
    );
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-700 rounded-md flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Filters</h1>

      {/* Add Record Button */}
      <button
        onClick={toggleRecordModal}
        className="w-full text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full"
      >
        + Add
      </button>

      {/* Search Input */}
      <div className="flex items-center bg-gray-300 dark:bg-gray-600 rounded-md px-3 py-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none ml-2 w-full text-sm"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-sm">Category</label>
        <select
          className="p-2 rounded bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Payment Type Filter */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-sm">Payment Type</label>
        <select
          className="p-2 rounded bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-none"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="cash">Cash</option>
          <option value="online">Online</option>
        </select>
      </div>

      {/* Conditionally Render Reset Button */}
      {isFiltering() && (
        <button
          onClick={handleResetFilters}
          className="mt-4 w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};


export default Records