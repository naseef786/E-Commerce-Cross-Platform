import React from "react";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-2xl font-bold border-b">My Dashboard</div>
        <nav className="mt-6">
          <ul>
            <li className="flex items-center p-4 text-gray-700 hover:bg-gray-200 cursor-pointer">
              <FiHome className="mr-3" /> Home
            </li>
            <li className="flex items-center p-4 text-gray-700 hover:bg-gray-200 cursor-pointer">
              <FiUsers className="mr-3" /> Users
            </li>
            <li className="flex items-center p-4 text-gray-700 hover:bg-gray-200 cursor-pointer">
              <FiSettings className="mr-3" /> Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Navbar */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add New
          </button>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-gray-500 text-sm">Users</h2>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-gray-500 text-sm">Sales</h2>
            <p className="text-2xl font-bold">$5,678</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-gray-500 text-sm">Orders</h2>
            <p className="text-2xl font-bold">432</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-gray-500 text-sm">Feedback</h2>
            <p className="text-2xl font-bold">98</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-gray-700 font-bold mb-4">Monthly Revenue</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            {/* Placeholder for chart */}
            Chart goes here
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
