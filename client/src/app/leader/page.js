"use client";
import React from "react";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";

const Dashboard = () => {
    const [statistic, setStatistic] = useState([]);
    const [citizen, setCitizen] = useState([]);
    const [userRoles, setUserRoles] = useState({});

  useEffect(() => {
    (async () => {
      const token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      try {
        const response = await fetch("http://localhost:4000/citizen/statistic", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response2 = await fetch("http://localhost:4000/citizen/list", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        const statisticResponse = data.data;
        setStatistic(statisticResponse);
        
        const data2 = await response2.json();
        const citizenList = data2.data.list;
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
        path: "/leader/household",
        auth: userRoles,
      },
    ],
  };
    return (
        <div class="flex h-screen">
            <div className="flex-auto w-1/5 bg-slate-500">
                <Navbar data={jobMenu}/>
            </div>
            <div className="flex-auto w-4/5 justify-center ">
              <div class="grid grid-column-5 grid-flow-col gap-8 justify-center bg-slate-200 pt-10 pb-2">
                <div class="box-border h-20 w-48 p-4 border-2 drop-shadow-md hover:drop-shadow-2xl bg-slate-300">
                  <h1 className="font-bold">Total</h1>
                  <h2>{statistic.total}</h2>
                </div> 
                <div class="box-border h-20 w-48 p-4 border-2 drop-shadow-md hover:drop-shadow-2xl bg-slate-300">
                  <h1 className="font-bold">May thang duc rua</h1>
                  <h2>{statistic.maleTotal}</h2>
                </div> 
                <div class="box-border h-20 w-48 p-4 border-2 drop-shadow-md hover:drop-shadow-2xl bg-slate-300">
                  <h1 className="font-bold">May con ghe dit bu</h1>
                  <h2>{statistic.femaleTotal}</h2>
                </div>      
                <div class="box-border h-20 w-48 p-4 border-2 drop-shadow-md hover:drop-shadow-2xl bg-slate-300">
                  <h1 className="font-bold">Be de</h1>
                  <h2>{statistic.otherTotal}</h2>
                </div>    
                <div class="box-border h-20 w-48 p-4 border-2 drop-shadow-md hover:drop-shadow-2xl bg-slate-300">
                  <h1 className="font-bold">Chet con me</h1>
                  <h2>{statistic.deathTotal}</h2>
                </div> 
              </div>
              <div class="overflow-x-auto rounded drop-shadow-md stroke-1 w-1/2 m-20">
              <table class="flex-auto min-w-full drop-shadow-md pt-8">
                        <thead class="bg-white border-b">
                            <tr>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    #
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Name
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Gender
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          {citizen.map((u, index) => (
                            <tr class="bg-gray-100 border-b">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index}</td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {u.name.firstName} {u.name.lastName}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {u.gender}
                                </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                    </div>
            </div>
        </div>
    );
};

export default Dashboard;
