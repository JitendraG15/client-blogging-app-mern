import React from "react";
import Sidebar from "../components/comman/Sidebar";
// import LinePlot from "../components/charts/LinePlot";
import ProfilePage from "./ProfilePage";

const AdminPage = () => {
    const data = [
        { label: 'A', value: 10 },
        { label: 'B', value: 20 },
        { label: 'C', value: 15 },
        { label: 'D', value: 25 },
        { label: 'E', value: 30 }
      ];
  return (
    <div className="flex">
      <Sidebar />
      <div className=" w-screen mx-auto mt-1 p-8 border-2 ">
        {/* <h1 className="text-2xl font-semibold mb-4">Dashboard</h1> */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          {/* Main content goes here */}
          <p className="text-center text-2xl">Welcome to the Admin Panel!</p>
          
          <ProfilePage/>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
