import React from "react";
import { FaTimes } from "react-icons/fa";

const RecordModal = ({ showModal, setShowModal }) => {
  const [transaction, setTransaction] = React.useState({
    type: "income",
    amount: 0,
    category: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    payee: "",
    note: "",
    paymentType: "cash",
  });

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-4xl p-6 relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">ADD RECORD</h2>
          <button
            onClick={() => setShowModal(!showModal)}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Left Section (Main Form) */}
          <div className="w-full md:w-2/3 space-y-4 dark:text-white">
            {/* Amount */}
            <div className="flex flex-col items-center">
              <span className="text-xl">
                {transaction.type === "income" ? "+" : "-"}
              </span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Amount"
                className="text-4xl text-center bg-transparent outline-none border-0 border-b-2 border-gray-300 focus:border-blue-500 placeholder:text-gray-400 w-full md:w-1/2"
              />
            </div>

            {/* Transaction Type Toggle */}
            <div className="flex justify-center">
              <div className="inline-flex rounded overflow-hidden border border-gray-300">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="income"
                    className="hidden peer"
                    defaultChecked
                  />
                  <div className="px-4 py-2 text-sm bg-white text-gray-700 peer-checked:bg-blue-500 peer-checked:text-white">
                    Income
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="expense"
                    className="hidden peer"
                  />
                  <div className="px-4 py-2 text-sm bg-white text-gray-700 peer-checked:bg-red-500 peer-checked:text-white">
                    Expense
                  </div>
                </label>
              </div>
            </div>

            {/* Category */}
            <input
              type="text"
              placeholder="Category"
              className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 outline-none"
            />

            {/* Date & Time */}
            <div className="flex gap-4">
              <input
                type="date"
                className="w-1/2 p-2 rounded border border-gray-300 focus:border-blue-500 outline-none"
              />
              <input
                type="time"
                className="w-1/2 p-2 rounded border border-gray-300 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Add Record
              </button>
              <button className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
                Add and Create Another
              </button>
            </div>
          </div>

          {/* Right Section (Optional Info) */}
          <div className="w-full md:w-1/3 space-y-4">
            <input
              type="text"
              placeholder="Payee"
              className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 outline-none"
            />
            <textarea
              placeholder="Note / Description"
              rows="4"
              className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 outline-none resize-none"
            />
            <select className="w-full p-2 rounded border border-gray-300 dark:text-black focus:border-blue-500 outline-none">
              <option value="">Payment Type</option>
              <option value="cash">Cash</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordModal;
