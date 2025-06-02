import React from "react";
import { categories } from "./RecordModal/CategorySelect";

const DisplayRecords = ({ records = [] }) => {
  const [selectedRecords, setSelectedRecords] = React.useState([]);
  const checkAllRef = React.useRef();

  const handleCheckboxChange = (id) => {
    setSelectedRecords((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalAmount = records.reduce((sum, record) => {
    const value = parseFloat(record.amount) || 0;
    return record.transaction_type === "income" ? sum + value : sum - value;
  }, 0);

  const formatAmount = (amount, type) => {
    const color = type === "income" ? "text-green-500" : "text-red-500";
    const sign = type === "income" ? "+" : "-";
    return <span className={`font-semibold ${color}`}>{sign}₹{Math.abs(amount)}</span>;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedRecords.length === records.length && records.length > 0}
            ref={checkAllRef}
            onChange={() =>
              setSelectedRecords(
                selectedRecords.length === records.length
                  ? []
                  : records.map((r) => r.id)
              )
            }
          />
          <label className="text-sm font-medium">{selectedRecords.length > 0 ? "Deselect All" : "Select All"}</label>
        </div>

        {selectedRecords.length > 0 && 
            <p>{selectedRecords.length} selected record <button  className="rounded-full text-sm px-4 bg-red-500">Delete</button></p>}

        <div className="text-sm font-semibold">
          Total:{" "}
          <span className={totalAmount >= 0 ? "text-green-500" : "text-red-500"}>
            ₹{Math.abs(totalAmount).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Records */}
      {records.length === 0 ? (
        <div className="text-center text-gray-500 py-4">No records found.</div>
      ) : (
        <ul className="space-y-2">
          {records.map((record) => (
            <li
              key={record.id}
              className="flex items-center gap-3 text-md bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <input
                type="checkbox"
                checked={selectedRecords.includes(record.id)}
                onChange={() => handleCheckboxChange(record.id)}
              />
                <span className="flex items-center gap-2">
                    {categories.find((cat) => cat.value === record.category)?.icon || "📁" }
                </span>
              <span className="capitalize font-medium w-20 truncate">{record.category}</span>

              {record.payee && (
                <span className="text-gray-500 truncate w-32">Payee: {record.payee}</span>
              )}

              {record.note && (
                <span className="text-gray-500 truncate w-32">Note: {record.note}</span>
              )}

              <span className="text-gray-500 w-20 ml-auto">{record.paymentType}</span>

              <span>
                {formatAmount(record.amount, record.transaction_type)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayRecords;
