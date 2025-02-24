const DateRangeFilter = ({ dateRange, setDateRange }) => {
  return (
    <div className="flex space-x-2">
      <input
        type="date"
        value={dateRange.from || ""}
        onChange={(e) =>
          setDateRange((prev) => ({ ...prev, from: e.target.value }))
        }
        className="border p-2 rounded"
      />
      <input
        type="date"
        value={dateRange.to || ""}
        onChange={(e) =>
          setDateRange((prev) => ({ ...prev, to: e.target.value }))
        }
        className="border p-2 rounded"
      />
    </div>
  );
};

export default DateRangeFilter;