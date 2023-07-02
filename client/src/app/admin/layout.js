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
        name: "Người dùng",
        path: "/admin",
        auth: userRoles,
      },
      {
        id: 2,
        name: "Tạo người dùng mới",
        path: "/admin/signup",
        auth: userRoles,
      },
    ],
  };
  return (
    <div className="flex flex-row h-screen">
      <div className="flex-auto w-1/5 bg-slate-500">
        <Navbar data={jobMenu} />
      </div>
      <div className="flex-auto w-4/5 justify-center">{children}</div>
    </div>
  );
}
