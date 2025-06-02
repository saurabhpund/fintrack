import React, { useContext, useState } from "react";
import {
  FaBus, FaCar, FaChartLine, FaChevronUp,
  FaHome, FaPhone, FaShoppingCart, FaTimes
} from "react-icons/fa";
import { FaUtensils } from "react-icons/fa6";
import { ModalContext } from "../../context/Context";
import useValidateForm from "../../hook/useValidateForm";
import { toast } from "react-toastify";
import axios from "axios";
import ToggleTransactionType from "./ToggleTransactionType";
import {CategorySelect} from "./CategorySelect";

// Initial state for new transactions
const defaultTransaction = (email) => ({
  transaction_type: "income",
  amount: 0,
  category: "",
  date: new Date().toISOString().split("T")[0],
  time: new Date().toTimeString().slice(0, 5),
  payee: "",
  note: "",
  paymentType: "cash",
  email,
});

const RecordModal = () => {
  const { showRecordModal, toggleRecordModal, setRefreshRecords } = useContext(ModalContext);
  const email = localStorage.getItem("email") || "";
  const [transaction, setTransaction] = useState(defaultTransaction(email));
  const [reOpenModal, setReOpenModal] = useState(false);
  const { errors, validate } = useValidateForm({ transaction });

  if (!showRecordModal) return null;

  const handleInput = (field) => (e) =>
    setTransaction((prev) => ({ ...prev, [field]: e.target.value }));

  const handleAmountInput = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setTransaction((prev) => ({ ...prev, amount: onlyNums }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please correct the highlighted fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/addtransaction", transaction, {
        headers: { authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });

      toast.success("Transaction added successfully!");
      setRefreshRecords((prev) => !prev);
      if (!reOpenModal) toggleRecordModal();
      setTransaction(defaultTransaction(email));
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-4xl p-6 relative">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">ADD RECORD</h2>
            <button type="button" onClick={toggleRecordModal} className="text-gray-500 dark:text-white hover:text-red-500 text-xl">
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            {/* Left */}
            <div className="w-full md:w-2/3 space-y-4 dark:text-white">
              {/* Amount */}
              <div className="flex justify-between items-center">
                <span className="text-4xl font-semibold">
                  {transaction.transaction_type === "income" ? "+" : "-"}
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={transaction.amount}
                  onChange={handleAmountInput}
                  placeholder="0"
                  className="text-4xl text-center bg-transparent outline-none border-0 border-b-2 border-gray-300 focus:border-blue-500 placeholder:text-gray-400 w-full md:w-1/2"
                />
                <ToggleTransactionType transaction={transaction} setTransaction={setTransaction} />
              </div>

              <CategorySelect transaction={transaction} setTransaction={setTransaction} errors={errors} />

              {/* Date & Time */}
              <div className="flex gap-4">
                {["date", "time"].map((field) => (
                  <div key={field} className="w-1/2">
                    <input
                      type={field}
                      value={transaction[field]}
                      onChange={handleInput(field)}
                      className={`w-full p-2 rounded border ${
                        errors[field] ? "border-red-500" : "border-gray-300"
                      } dark:border-none dark:text-white dark:bg-gray-900 focus:border-blue-500 outline-none`}
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4">
                <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                  Add Record
                </button>
                <button
                  type="submit"
                  onClick={() => setReOpenModal(true)}
                  className="text-blue-400 px-4 py-2 rounded"
                >
                  Add and Create Another
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="w-full md:w-1/3 space-y-4">
              {/* Payee */}
              <div>
                <input
                  type="text"
                  placeholder="Payee"
                  value={transaction.payee}
                  onChange={handleInput("payee")}
                  className={`w-full p-2 rounded border ${
                    errors.payee ? "border-red-500" : "border-gray-300"
                  } dark:bg-gray-900 dark:text-white dark:border-none focus:border-blue-500 outline-none`}
                />
                {errors.payee && (
                  <p className="text-red-500 text-sm mt-1">{errors.payee}</p>
                )}
              </div>

              {/* Note */}
              <textarea
                placeholder="Note"
                rows="4"
                value={transaction.note}
                onChange={handleInput("note")}
                className="w-full p-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-none focus:border-blue-500 outline-none resize-none"
              />

              {/* Category */}


              {/* Payment Type */}
              <select
                value={transaction.paymentType}
                onChange={handleInput("paymentType")}
                className="w-full p-2 rounded border border-gray-300 dark:border-none dark:text-white dark:bg-gray-900 focus:border-blue-500 outline-none"
              >
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

export default RecordModal;
