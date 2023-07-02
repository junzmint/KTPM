"use client";
import React from "react";
import Navbar from "@/components/navbar";
const Dashboard = () => {
  
  const jobMenu = {
    data: [
      {
        id: 1,
        name: 'Trang chủ',
        path: '/accountant',
      },
      {
        id: 2,
        name: 'Khoản phí/ đóng góp',
        path: '/accountant/fee',
      },
      {
        id: 3,
        name: 'Khoản thu',
        path: '/accountant/transaction',
      },
    ],
  };
  return (
    <React.Fragment>
      <div className="flex flex-row">
        <div className="flex flex-col w-[20%]">
          <Navbar data={jobMenu}></Navbar>
        </div>
        <div className="flex flex-col w-[80%]">
           <h1>Dashboard</h1>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
