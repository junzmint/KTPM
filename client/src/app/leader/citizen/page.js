"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";

const Dashboard = () => {
    const [citizen, setCitizen] = useState([]);
    const [userRoles, setUserRoles] = useState({});

  useEffect(() => {
    (async () => {
      const token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      try {
        const response = await fetch("http://localhost:4000/citizen/list", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        const citizenList = data.data.list;
        setCitizen(citizenList);

        setUserRoles(localStorage.role);
       } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  const jobMenu = {
    data: [
      {
        id: 1,
        name: "Dashboard",
        path: "/leader",
        auth: userRoles,
      },
      {
        id: 2,
        name: "Citizen",
        path: "/leader/citizen",
        auth: userRoles,
      },
      {
        id: 3,
        name: "Household",
        path: "/leader",
        auth: userRoles,
      },
    ],
  };
    return (
        <div className="flex h-screen">
            <div className="flex-auto w-1/5 bg-slate-500">
                <Navbar data={jobMenu}/>
            </div>
            <div className="flex-auto w-4/5 justify-center ">

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full p-10">Citizen</button>
            <Link href="/leader/citizen/tamtru">
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full p-10">Tam tru</button>
            </Link>
            <Link href="leader/citizen/tamvang">
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full p-10">Tam vang</button>
            </Link>
            <Link href="leader/citizen/mat">
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full p-10">Chet cmnr</button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Gender
                        </th>
                        <th>
                            Option
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {citizen.map((u, index) => (
                        <tr>
                            <th>{index+1}</th>
                            <th> {u.name.firstName} {u.name.lastName}</th>
                            <th>{u.gender}</th>
                            <th>
                                <Link href={"citizen/nhankhau/" + u._id}>
                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full p-10">View</button>
                                </Link>
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full p-10">Detele</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default Dashboard;
