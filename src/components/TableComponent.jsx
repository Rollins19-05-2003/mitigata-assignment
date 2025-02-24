import React, { useState, useEffect, useMemo, useRef } from "react";
import { MaterialReactTable } from "material-react-table";
import StatusFilter from "./StatusFilter";
import ActionButton from "./ActionButton";
import GlobalSearch from "./GlobalSearch";
import DateRangeFilter from "./DateRangeFilter";
import { records } from "../utils/records";
import { debounce } from "lodash";
import { parseDate } from "../utils/parseDate";

const TableComponent = ({ usersData, setUsersData }) => {
  // State variables to manage filtered and visible data
  const [visibleData, setVisibleData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const tableContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Initialize table with given user data
  useEffect(() => {
    setFilteredData(usersData);
    setVisibleData(usersData.slice(0, 5)); // Show initial 5 records
    setCurrentIndex(5);
  }, [usersData]);

  // Function to load more data when scrolling
  const loadMoreData = () => {
    if (!hasMore) return;
    const newData = filteredData.slice(currentIndex, currentIndex + 5);
    setVisibleData((prevData) => [...prevData, ...newData]);
    setCurrentIndex((prevIndex) => prevIndex + 5);
    if (currentIndex + 5 >= filteredData.length) setHasMore(false);
  };

  // Infinite scrolling effect to load more data
  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const handleScroll = debounce(() => {
      if (
        hasMore &&
        container.scrollHeight - container.scrollTop <= container.clientHeight * 1.5
      ) {
        loadMoreData();
      }
    }, 300);

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentIndex, hasMore]);

  // Filtering logic: filters data based on search term, status, and date range
  useEffect(() => {
    setLoading(true);

    // Load from localStorage if available, otherwise use records
    const savedData = localStorage.getItem("usersData");
    const dataToFilter = savedData ? JSON.parse(savedData) : records;

    let filtered = dataToFilter.filter((record) => {
      const recordDate = parseDate(record.details.date);
      const fromDate = dateRange.from ? new Date(dateRange.from) : null;
      const toDate = dateRange.to ? new Date(dateRange.to) : null;

      // Date range filter
      const isWithinDateRange =
        (!fromDate || recordDate >= fromDate) &&
        (!toDate || recordDate <= toDate);

      // Global search filter (name & email)
      const searchMatch = searchTerm
        ? record.about.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.about.email.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      // Status filter
      const statusMatch = selectedStatus
        ? record.about.status === selectedStatus
        : true;

      return isWithinDateRange && searchMatch && statusMatch;
    });

    // Update filtered data and reset visible data for pagination
    setFilteredData(filtered);
    setVisibleData(filtered.slice(0, 5));
    setCurrentIndex(5);
    setHasMore(filtered.length > 5);

    setTimeout(() => setLoading(false), filtered.length === 0 ? 1000 : 0);
  }, [searchTerm, selectedStatus, dateRange, records]);

  // Calculate percentage of inactive and blocked users
  const savedData = localStorage.getItem("usersData");
  const totalUsers = savedData ? JSON.parse(savedData) : records;
  const inactiveCount = totalUsers.filter((r) => r.about.status === "INACTIVE").length;
  const blockedCount = totalUsers.filter((r) => r.about.status === "BLOCKED").length;
  const inactivePercentage = ((inactiveCount / totalUsers.length) * 100).toFixed(2);
  const blockedPercentage = ((blockedCount / totalUsers.length) * 100).toFixed(2);

  // Define table columns
  const columns = useMemo(() => [
    { accessorKey: "about.name", header: "Name", sortingFn: "alphanumeric" },
    { accessorKey: "about.email", header: "Email" },
    { accessorKey: "details.date", header: "Start Date", sortingFn: "datetime", Filter: DateRangeFilter },
    { accessorKey: "details.invitedBy", header: "Invited By" },
    {
      accessorKey: "about.status",
      header: "Status",
      filterFn: "equals",
      Filter: StatusFilter,
      Cell: ({ row }) => {
        const status = row.original.about.status;
        const statusColors = {
          INACTIVE: "text-blue-500 bg-blue-100 px-2 py-2 border border-blue-500",
          BLOCKED: "text-red-500 bg-red-100 px-2 py-2 border border-red-500",
          ACTIVE: "text-green-500 bg-green-100 px-4 py-2 border border-green-500",
        };

        return <span className={`font-semibold rounded-md ${statusColors[status] || "text-gray-500 bg-gray-100"}`}>{status}</span>;
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => <ActionButton row={row} setUsersData={setUsersData} />,
    },
  ], []);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {/* Filter Components */}
      <div className="flex space-x-4 mb-4">
        <GlobalSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
        <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => {
          setSearchTerm("");
          setSelectedStatus("");
          setDateRange({ from: "", to: "" });
        }}>Clear Filters</button>
      </div>

      {/* Table Component */}
      {loading ? <div className="text-center py-4 text-gray-500">Loading...</div> :
        visibleData.length === 0 ? <div className="text-center py-4 text-gray-500">No data found</div> :
        <MaterialReactTable columns={columns} data={visibleData} manualFiltering manualSorting enablePagination={false} state={{ isLoading: visibleData.length === 0 }} muiTableContainerProps={{ ref: tableContainerRef, sx: { maxHeight: "280px", minHeight: "150px", overflowY: "auto", borderRadius: "8px" }}} />}

      <div className="mt-4 text-gray-700">Inactive Users: {inactivePercentage}% | Blocked Users: {blockedPercentage}%</div>
    </div>
  );
};

export default TableComponent;