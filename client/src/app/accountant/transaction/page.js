"use client";
import React from "react";
import Navbar from "@/components/navbar";
const Transaction = () => {
  const jobMenu = {
    data: [
      {
        id: 1,
        name: "Dashboard",
        path: "/accountant",
      },
      {
        id: 2,
        name: "Fee",
        path: "/accountant/fee",
      },
      {
        id: 3,
        name: "Transaction",
        path: "/accountant/transaction",
      },
    ],
  };
  return (
    <React.Fragment>
      <div className="flex flex-row">
        <div className="flex flex-col w-[20%] bg-red-200">
          <Navbar data={jobMenu}></Navbar>
        </div>
        <div className="flex flex-col w-[80%] bg-blue-200">
           <h1>Transaction</h1>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Transaction;