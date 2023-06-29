"use client";
import LogoutButton from "@/components/Logout";
import Link from "next/link";
import React, { useState, useEffect } from "react";
const Dashboard = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    (async () => {
      const token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      try {
        const response = await fetch("http://localhost:4000/user/userList", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const userList = data.data.list;
        setUser(userList);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return (
    <React.Fragment>
      <div className="flex flex-row">
        <div className="flex flex-col w-[20%] bg-red-200">
          <h2 className="text-lg">Admin</h2>
          <div className="flex p-2 rounded hover:bg-red-300">
            <Link href={"/admin"}>Dashboard</Link>
          </div>
          <div className="flex p-2 rounded hover:bg-red-300">
            <Link href={"/admin/signup"}>Sign up</Link>
          </div>
        </div>
        <div className="flex flex-col w-[80%] bg-blue-200">
          <div className="flex flex-row">
            <div className="flex flex-col w-[90%]">
              <h2>Main content</h2>
            </div>
            <div className="flex flex-col w-[10%]">
              <LogoutButton />
            </div>
          </div>
          <div className="bg-yellow-200">
            <table className="border border-black-green">
              <tr>
                <th>STT</th>
                <th>Role</th>
                <th>Status</th>
                <th>Phone num</th>
              </tr>
              {user.map((u, index) => (
                <tr key={u._id}>
                  <td>{index}</td>
                  <td>{u.role}</td>
                  <td>{u.status === true ? "Active" : "Deactive"}</td>
                  <td>{u.phone}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Dashboard;
