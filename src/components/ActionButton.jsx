import React from 'react';
import { FaUserCheck, FaUserTimes, FaUserLock } from 'react-icons/fa';
import { Tooltip } from '@mui/material';

const ActionButton = ({ row, setUsersData }) => {
  const handleAction = (newStatus) => {
    setUsersData((prevData) => {
      const updatedData = prevData.map(user =>
        user.about.email === row.original.about.email
          ? { ...user, about: { ...user.about, status: newStatus } }
          : user
      );

      localStorage.setItem('usersData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  return (
    <div className="flex space-x-3">
      <Tooltip title="Approve">
        <button
          onClick={() => handleAction('ACTIVE')}
          className="text-green-600 hover:text-green-800 border border-green-600 p-2 rounded"
        >
          <FaUserCheck size={18} />
        </button>
      </Tooltip>
      <Tooltip title="Deactivate">
        <button
          onClick={() => handleAction('INACTIVE')}
          className="text-blue-600 hover:text-blue-800 border border-blue-600 p-2 rounded"
        >
          <FaUserTimes size={18} />
        </button>
      </Tooltip>
      <Tooltip title="Block">
        <button
          onClick={() => handleAction('BLOCKED')}
          className="text-red-600 hover:text-red-800 border border-red-600 p-2 rounded"
        >
          <FaUserLock size={18} />
        </button>
      </Tooltip>
    </div>
  );
};

export default ActionButton;