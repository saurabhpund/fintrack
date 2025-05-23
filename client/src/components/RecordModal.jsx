import React from 'react'
import { FaTimes } from 'react-icons/fa'

const RecordModal = ({showModal, setShowModal}) => {

  return (
    <>
    {/* create modal with title ADD RECORD at last close icon below it two divs one with 70% with containing two divs horizontally flex col one contains input for amount and select type of transaction income or expense then below div contain category date and time and add record button div which is right to it contains payee note or description payment type cash or online  */}
    
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl p-6 relative">

        {/* Modal Title and Close Button */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-semibold dark:text-gray-800">ADD RECORD</h2>
          <button onClick={() => setShowModal(!showModal)} className="text-gray-500 hover:text-red-500 text-xl"><FaTimes /></button>
        </div>

        {/* Modal Content */}
        <div className="flex mt-6 space-x-4">

          {/* Left Section (70%) */}
          <div className="w-7/10 flex flex-col space-y-4">

            {/* Amount & Transaction Type */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="number"
                placeholder="Amount"
                className="w-full md:w-1/2 border p-2 rounded"
              />
              <select className="w-full md:w-1/2 border p-2 rounded dark:text-black">
                <option value="">Select Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Category, Date, Time, Add Button */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="text"
                placeholder="Category"
                className="w-full md:w-1/4 border p-2 rounded"
              />
              <input
                type="date"
                className="w-full md:w-1/4 border p-2 rounded"
              />
              <input
                type="time"
                className="w-full md:w-1/4 border p-2 rounded"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-1/4">
                Add Record
              </button>
            </div>
          </div>

          {/* Right Section (30%) */}
          <div className="w-3/10 flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Payee"
              className="border p-2 rounded"
            />
            <textarea
              placeholder="Note / Description"
              className="border p-2 rounded resize-none"
              rows="3"
            />
            <select className="border p-2 rounded dark:text-black">
              <option value="">Payment Type</option>
              <option value="cash">Cash</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default RecordModal