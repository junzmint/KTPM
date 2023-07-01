"use client";
import Navbar from "@/components/navbar";
import React, { useState, useEffect } from "react";
export default function Layout({ children }) {
  const [userRoles, setUserRoles] = useState({});
  useEffect(() => {
    setUserRoles(localStorage.role);
  }, []);
  const jobMenu = {
    data: [
      {
        id: 1,
        name: "Đăng kí",
        path: "/admin/signup",
        auth: userRoles,
      },
      {
        id: 2,
        name: "Người dùng",
        path: "/admin",
        auth: userRoles,
      },
    ],
  };
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-[20%] bg-red-200">
        <Navbar data={jobMenu} />
      </div>
      <div className="flex flex-col w-[80%] bg-blue-200">{children}</div>
    </div>
  );
}
