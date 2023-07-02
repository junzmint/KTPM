"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import BlueButton from "@/components/button/blue-button";

const Dashboard = () => {
  const [absence, setAbsence] = useState([]);
  const [userRoles, setUserRoles] = useState({});

  useEffect(() => {
    (async () => {
      const token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      try {
        const response = await fetch("http://localhost:4000/absence/list", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        const absenceList = data.data.list;
        setAbsence(absenceList);

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
    <div className="flex h-screen">
      <div className="flex-auto w-1/5 bg-slate-500">
        <Navbar data={jobMenu} />
      </div>
      <div className="flex-auto w-4/5 justify-center ml-20">
        <Link href="/leader/citizen">
          <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full p-10 mt-16 mr-2 ml-2">
            Nhân khẩu
          </button>
        </Link>
        <Link href="/leader/citizen/tamtru">
          <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full p-10 mr-2">
            Tạm trú
          </button>
        </Link>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full p-10 mt-16 mr-2">
          Tạm vắng
        </button>
        <Link href="/leader/citizen/mat">
          <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full p-10 mr-2">
            Xanh cỏ
          </button>
        </Link>
        <div className="overflow-x-auto rounded drop-shadow-md stroke-1 w-5/6">
          <table className="flex-auto !border-none	 min-w-full drop-shadow-md mt-4">
            <thead className="bg-white border-b">
              <tr className="bg-gray-100 border-b">
                <th
                  scope="col"
                  colSpan="7"
                  className="!border-none text-xl font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Danh sách nhân khẩu
                </th>
                <th
                  scope="col"
                  className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left flex justify-end"
                >
                  <BlueButton text="Tạo"></BlueButton>
                </th>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="col"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  STT
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Tên nhân khẩu
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Từ ngày
                </th>
                <th
                  scope="col"
                  colSpan="5"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Tới ngày
                </th>
              </tr>
            </thead>
            <tbody>
              {absence.map((unit, index) => (
                <tr key={index} className="bg-gray-100 !border-none border-b">
                  <td className="text-sm text-gray-900 !border-none font-medium px-6 py-4 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="text-sm text-gray-900 !border-none font-medium px-6 py-4 whitespace-nowrap">
                    {unit.citizen_id.name.firstName +
                      " " +
                      unit.citizen_id.name.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm !border-none font-medium text-gray-900">
                    {unit.date.from.substr(0, 10)}
                  </td>
                  <td
                    colSpan="4"
                    className="px-6 py-4 whitespace-nowrap text-sm !border-none font-medium text-gray-900"
                  >
                    {unit.date.to.substr(0, 10)}
                  </td>
                  <td
                    colSpan="4"
                    className="text-sm text-gray-900 !border-none font-medium py-4 pxgi-6 whitespace-nowrap flex justify-end"
                  >
                    <div className="flex mr-6">
                      <Link
                        href={{
                          pathname: "absence/nhankhau/" + unit._id,
                        }}
                      >
                        <BlueButton text="Xem"></BlueButton>
                      </Link>
                      {/* <BlueButton onClick={() => { setAbsence(absence.splice(index - 1, 1)) }} text="Xóa"></BlueButton> */}
                    </div>
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
