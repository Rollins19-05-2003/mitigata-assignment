import React, { useState, useEffect } from 'react';
import Header from "./Header";
import StatsCards from './StatsCards';
import TableComponent from './TableComponent';
import { records } from '../utils/records';

const Dashboard = () => {
    // Manage users' data at the top level
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        // Load data from localStorage or use default records
        const savedData = localStorage.getItem('usersData');
        const initialData = savedData ? JSON.parse(savedData) : records;
        setUsersData(initialData);
    }, []);

    // Compute statistics dynamically
    const totalUsers = usersData.length;
    const activeUsers = usersData.filter(user => user.about.status === "ACTIVE").length;
    const blockedUsers = usersData.filter(user => user.about.status === "BLOCKED").length;
    const inactiveUsers = totalUsers - (activeUsers + blockedUsers);

    return (
        <div className="p-6 px-10 space-y-6 bg-gray-100">
            <Header />
            <StatsCards 
                total={totalUsers} 
                active={activeUsers} 
                inactive={inactiveUsers} 
                blocked={blockedUsers} 
            />
            <TableComponent usersData={usersData} setUsersData={setUsersData} />
        </div>
    );
};

export default Dashboard;
