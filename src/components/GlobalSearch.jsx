const GlobalSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm} // Controlled input
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border p-2 rounded"
    />
  );
};

export default GlobalSearch;
