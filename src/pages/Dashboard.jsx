import React, { useState } from "react";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} /> */}
      <div className="flex-grow bg-gray-200">
        <div className="p-4">
          <h1 className="text-2xl mb-4">Dashboard</h1>
          <p>Welcome to the Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
