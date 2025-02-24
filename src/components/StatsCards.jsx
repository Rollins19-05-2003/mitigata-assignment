import React from 'react';
import { FaUsers, FaUserCheck, FaUserTimes, FaUserLock } from 'react-icons/fa';

const StatsCards = ({ total, active, inactive, blocked }) => {
  return (
    <div className="flex justify-between gap-4">
      <div className="flex-1 p-4 bg-white shadow-md rounded-lg flex items-center space-x-3 py-8">
        <FaUsers className="text-blue-500 text-2xl" />
        <div>
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-lg font-semibold">{total}</p>
        </div>
      </div>

      <div className="flex-1 p-4 bg-white shadow-md rounded-lg flex items-center space-x-3 py-8">
        <FaUserCheck className="text-green-500 text-2xl" />
        <div>
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-lg font-semibold">{active}</p>
        </div>
      </div>

      <div className="flex-1 p-4 bg-white shadow-md rounded-lg flex items-center space-x-3 py-8">
        <FaUserTimes className="text-yellow-500 text-2xl" />
        <div>
          <p className="text-sm text-gray-600">Inactive Users</p>
          <p className="text-lg font-semibold">{inactive/total *100}%</p>
        </div>
      </div>

      <div className="flex-1 p-4 bg-white shadow-md rounded-lg flex items-center space-x-3 py-8">
        <FaUserLock className="text-red-500 text-2xl" />
        <div>
          <p className="text-sm text-gray-600">Blocked Users</p>
          <p className="text-lg font-semibold">{blocked/total * 100}%</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
