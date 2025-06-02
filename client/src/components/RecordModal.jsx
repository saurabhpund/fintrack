import React from "react";
import { FaBus, FaCar, FaChartLine, FaChevronUp, FaHome, FaPhone, FaShoppingCart, FaTimes } from "react-icons/fa";
import { ModalContext } from "../context/RecordModalContext";
import { FaUtensils } from "react-icons/fa6";

const RecordModal = () => {
  const { showRecordModal, toggleRecordModal } = React.useContext(ModalContext);
  const date = new Date();
  const [transaction, setTransaction] = React.useState({
    type: "income",
    amount: 0,
    category: "",
    date: date.toISOString().split("T")[0],
    time: date.toTimeString().slice(0, 5),
    payee: "",
    note: "",
    paymentType: "cash",
  });
  if (!showRecordModal) return null;


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(transaction);
  }


  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-4xl p-6 relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">ADD RECORD</h2>
          <button
            onClick={() => toggleRecordModal()}
            className="text-gray-500 dark:text-white hover:text-red-500 text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Left Section (Main Form) */}
          <div className="w-full md:w-2/3 space-y-4 dark:text-white">
            {/* Amount */}
            <div className="flex justify-between items-center">
              <span className="text-2xl text-right">
               
              </span>
              <input
                  type="text"
                  
                  inputMode="numeric"         // shows numeric keypad on mobile
                  pattern="[0-9]*"            // limits input to digits
                  value={transaction.amount}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, ""); // remove non-digits
                    setTransaction((prev) => ({ ...prev, amount: onlyNums }))
                  }}
                  placeholder="0"
                  className={`text-4xl text-center bg-transparent outline-none border-0 border-b-2 border-gray-300 focus:border-blue-500 placeholder:text-gray-400 w-full md:w-1/2  before:text-white before:content-[${transaction.type === "income" ? "+" : "-"}]`}
                  />
            {/* Transaction Type Toggle */}
            <ToggleTransactionDiv
              transaction={transaction} 
              setTransaction={setTransaction}
            />      
            </div>


            {/* Category */}
           <CategorySelect setTransaction={setTransaction} transaction={transaction} />

            {/* Date & Time */}
            <div className="flex gap-4">
              <input
                type="date"
                value={transaction.date}
                onChange={(e) => setTransaction((prev) => ({ ...prev, date: e.target.value }))}
                className="w-1/2 p-2 rounded border dark:border-none dark:text-white dark:bg-gray-900 dark:accent-white border-gray-300 focus:border-blue-500 outline-none"
              />
              <input
                type="time"
                value={transaction.time}
                onChange={(e) => setTransaction((prev) => ({ ...prev, time: e.target.value }))}
                className="w-1/2 p-2 rounded border dark:border-none border-gray-300 dark:text-white dark:bg-gray-900 dark:accent-white focus:border-blue-500 outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                Add Record
              </button>
              <button className="text-blue-400 px-4 py-2 rounded">
                Add and Create Another
              </button>
            </div>
          </div>

          {/* Right Section (Optional Info) */}
          <div className="w-full md:w-1/3 space-y-4">
            <input
              type="text"
              placeholder="Payee"
              value={transaction.payee}
              onChange={(e) => setTransaction((prev) => ({ ...prev, payee: e.target.value }))}
              className="w-full p-2 rounded border dark:bg-gray-900 dark:text-white dark:border-none border-gray-300 focus:border-blue-500 outline-none"
            />
            <textarea
              placeholder="Note"
              rows="4"
              value={transaction.note}
              onChange={(e) => setTransaction((prev) => ({ ...prev, note: e.target.value }))}
              className="w-full p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-none focus:border-blue-500 outline-none resize-none"
            />
            <select className="w-full p-2 rounded border border-gray-300 dark:border-none dark:text-white dark:bg-gray-900  focus:border-blue-500 outline-none">
              <option value="">Payment Type</option>
              <option value="cash">Cash</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

const ToggleTransactionDiv = ({ transaction, setTransaction }) => {
  const handleChange = (e) => {
    setTransaction((prev) => ({
      ...prev,
      type: e.target.value,
    }));
  };
  return(
    <div className="flex justify-center">
              <div className="inline-flex rounded overflow-hidden border border-gray-300 dark:border-none">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="income"
                    onChange={handleChange}
                    className="hidden peer"
                    defaultChecked
                  />
                  <div className="px-4 py-2 text-sm bg-white dark:text-white dark:bg-gray-900 text-gray-700 peer-checked:bg-blue-500 peer-checked:text-white">
                    Income
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="expense"
                    onChange={handleChange}
                    className="hidden peer"
                  />
                  <div className="px-4 py-2 text-sm bg-white dark:bg-gray-900 dark:text-white text-gray-700 peer-checked:bg-red-500 peer-checked:text-white">
                    Expense
                  </div>
                </label>
              </div>
            </div>
  )
};

const CategorySelect = ({ transaction, setTransaction }) => {
  // enum('food','shopping','housing','transportation','vehicle','communication','investment')
  const categories = [
    { icon: <FaUtensils />, label: "Food", value: "food" },
    { icon: <FaShoppingCart />, label: "Shopping", value: "shopping" },
    { icon: <FaHome />, label: "Housing", value: "housing" },
    { icon: <FaCar />, label: "Transportation", value: "transportation" },
    { icon: <FaBus />, label: "Vehicle", value: "vehicle" },
    { icon: <FaPhone />, label: "Communication", value: "communication" },
    { icon: <FaChartLine />, label: "Investment", value: "investment" },
  ];

  const [showDropdown, setShowDropdown] = React.useState(false);
  const selectedCategory = categories.find(cat => cat.value === transaction.category);
  const handleCategoryChange = (category) => {
    setShowDropdown(false);
    setTransaction((prev) => ({
      ...prev,
      category: category.value,
    }));
  };

  return (
    <div className="flex flex-col dark:text-white rounded dark:bg-gray-900 flex-1" >

      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          type="button"
          className="w-full p-2 rounded borde focus:border-blue-500 outline-none flex items-center justify-between"
        >
          <span className="flex items-center gap-3 capitalize">{!transaction.category || <span>{selectedCategory.icon}</span>} {transaction.category || "Select Category"}</span>
          {showDropdown ? <FaChevronUp className="text-gray-500" /> : <FaChevronUp className="text-gray-500 rotate-180" />}
        </button>

        {showDropdown && (
          <div className="absolute z-10 bg-gray-900 border dark:border-none border-gray-300 rounded shadow-lg w-full mt-1">
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
  );

}



export default RecordModal;
