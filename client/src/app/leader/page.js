"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import BlueButton from "@/components/button/blue-button";
import DoughnutChart from "@/components/chart/doughnut-chart";
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
              <div class="grid grid-column-5 grid-flow-col gap-8 justify-center bg-blue-700 pt-10 pb-2">
                <div class="box-border h-20 w-48 p-4 border-2 drop-shadow-md hover:drop-shadow-2xl bg-slate-100 md:rounded-lg">
                  <h1 className="font-normal md:text-gray-500 font-sans font-family:font-serif">TOTAL</h1>
                  <h2 className="font-bold">{statistic.total}</h2>
                </div> 
                <div class="box-border h-20 w-48 p-4 border-2 drop-shadow-md hover:drop-shadow-2xl bg-slate-100 md:rounded-lg ">
                <h1 className="font-normal md:text-gray-500 font-sans font-family:font-serif">MALE</h1>
                  <h2 className="font-bold">{statistic.maleTotal}</h2>
                </div> 
                <div class="box-border h-20 w-48 p-4 border-2 drop-shadow-md hover:drop-shadow-2xl bg-slate-100 md:rounded-lg">
                  <h1 className="font-normal md:text-gray-500 font-sans font-family:font-serif">FEMALE</h1>
                  <h2 className="font-bold">{statistic.femaleTotal}</h2>
                </div>      
                <div class="box-border h-20 w-48 p-4 border-2 drop-shadow-md hover:drop-shadow-2xl bg-slate-100 md:rounded-lg">
                  <h1 className="font-normal md:text-gray-500 font-sans font-family:font-serif">OTHER</h1>
                  <h2 className="font-bold">{statistic.otherTotal}</h2>
                </div>    
                <div class="box-border h-20 w-48 p-4 border-2 drop-shadow-md hover:drop-shadow-2xl bg-slate-100 md:rounded-lg">
                  <h1 className="font-normal md:text-gray-500 font-sans font-family:font-serif">DEATH</h1>
                  <h2 className="font-bold">{statistic.deathTotal}</h2>
                </div> 
              </div>
              <div>

              </div>
              
              <div className="grid grid-column-2 grid-flow-col gap-8 ">

                  <div className="grid justify-center place-items-center">
                    <DoughnutChart >
                    </DoughnutChart>
                  </div>

                  <div>
                      <div className="overflow-x-auto rounded drop-shadow-md stroke-1 w-5/6" >
              <table className="flex-auto !border-none	 min-w-full drop-shadow-md mt-4">
                        <thead className="bg-white border-b">
                            <tr className="bg-gray-100 border-b">

                              <th
                                scope="col"
                                colSpan="3"
                                className="!border-none text-xl font-medium text-gray-900 px-6 py-3 text-left"
                              >
                                Danh sách nhân khẩu 
                              </th>

                                          <th
                                            scope="col"
                                            className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left flex justify-end"
                                          >
                                              <Link
                                              href={{
                                                pathname: "leader/citizen/"
                                              }}
                                            >
                                              <BlueButton text="Xem"></BlueButton>
                                            </Link>
                                          </th>
                            </tr>

                            <tr>
                                <th                   
                                    scope="col"
                                    className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                                >
                                    #
                                </th>
                                <th 
                                    scope="col"
                                                colSpan="2"
                                    className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                                >
                                    Name
                                </th>
                                <th 
                                    scope="col"
                                                colSpan="2"
                                    className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                                >
                                    Gender
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          {citizen.map((unit, index) => (
                                        <tr key={index} className="bg-slate-50 !border-none border-b">
                                <td className="text-sm text-gray-900 !border-none font-medium px-6 py-4 whitespace-nowrap">
                                  {index + 1}
                                </td>

                                <td
                                  scope="col"
                                              colSpan="2"
                                  className="text-sm text-gray-900 !border-none font-medium px-6 py-4 whitespace-nowrap"
                                >
                                  {unit.name.firstName + " " + unit.name.lastName}
                                </td>

                                            <td
                                              colSpan="3" 
                                              className="px-6 py-4 whitespace-nowrap text-sm !border-none font-medium text-gray-900"
                                              >
                                  {unit.gender}
                                </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                    </div>
                  </div>

            </div>


            </div>
        </div>
    );
};

export default Dashboard;
