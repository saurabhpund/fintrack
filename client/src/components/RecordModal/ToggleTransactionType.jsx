const ToggleTransactionType = ({ transaction, setTransaction }) => {
  const handleChange = (e) =>
    setTransaction((prev) => ({ ...prev, transaction_type: e.target.value }));

  return (
    <div className="flex justify-center">
      <div className="inline-flex rounded overflow-hidden border border-gray-300 dark:border-none">
        {["income", "expense"].map((type) => (
          <label key={type} className="cursor-pointer">
            <input
              type="radio"
              name="transaction_type"
              value={type}
              checked={transaction.transaction_type === type}
              onChange={handleChange}
              className="hidden peer"
            />
            <div className={`px-4 py-2 text-sm ${transaction.transaction_type === type ? (type === "income" ? "bg-blue-500 text-white" : "bg-red-500 text-white") : "bg-white text-gray-700 dark:bg-gray-900 dark:text-white"}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ToggleTransactionType;
