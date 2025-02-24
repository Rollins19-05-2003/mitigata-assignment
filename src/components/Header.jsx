import React from 'react'

const Header = () => (
  <div className="flex justify-between items-center p-4">
    <div>
      <h1 className="text-2xl font-semibold">User Details</h1>
      <p className="text-gray-600">Information about a user including name, email, start date, inviter, status, and available actions.</p>
    </div>
    <button className="bg-black text-white px-4 py-2 rounded-md">Download Report</button>
  </div>
);

export default Header
