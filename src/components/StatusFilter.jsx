const StatusFilter = ({ selectedStatus, setSelectedStatus }) => {
  return (
    <select
      value={selectedStatus} // Controlled input
      onChange={(e) => setSelectedStatus(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="">All</option>
      <option value="ACTIVE">Active</option>
      <option value="INACTIVE">Inactive</option>
      <option value="BLOCKED">Blocked</option>
    </select>
  );
};

export default StatusFilter;
