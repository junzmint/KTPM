'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
const Transaction = () => {
  const [household, setHousehold] = useState([]);
  const jobMenu = {
    data: [
      {
        id: 1,
        name: 'Dashboard',
        path: '/accountant',
      },
      {
        id: 2,
        name: 'Fee',
        path: '/accountant/fee',
      },
      {
        id: 3,
        name: 'Transaction',
        path: '/accountant/transaction',
      },
    ],
  };
  useEffect(() => {
    (async () => {
      const token =
        localStorage.getItem('access_token') ||
        sessionStorage.getItem('access_token');
      try {
        const response = await fetch(`http://localhost:4000/household/list`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setHousehold(data.data.list);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return (
    <div className="flex">
      <div className="flex-auto w-1/5 h-screen bg-slate-500">
        <Navbar data={jobMenu} />
      </div>
      <div className="flex justify-center w-4/5 bg-blue">
        <div className="w-4/5 overflow-x-auto rounded stroke-1 drop-shadow-md">
          <table className="flex-auto !border-none	 min-w-full drop-shadow-md mt-20">
            <thead className="bg-white border-b">
              <tr className="bg-gray-100 border-b">
                <th
                  scope="col"
                  colSpan="3"
                  className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Danh sách các hộ gia đình
                </th>
                <th
                  scope="col"
                  className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left"
                ></th>
                <th
                  scope="col"
                  className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left flex justify-end"
                >
                  
                </th>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="col"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Số thứ tự
                </th>
                <th
                  scope="col"
                  colSpan="2"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Chủ hộ
                </th>
                <th
                  scope="col"
                  colSpan="2"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Mã hộ
                </th>
              </tr>
            </thead>
            <tbody>
              {household.map((unit, index) => (
                <tr key={index} className="bg-gray-100 !border-none border-b">
                  <td className="text-sm text-gray-900 !border-none font-medium px-6 py-4 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td
                    colSpan="2"
                    className="text-sm text-gray-900 !border-none font-medium px-6 py-4 whitespace-nowrap"
                  >
                    {unit.owner_id.name.firstName +
                      ' ' +
                      unit.owner_id.name.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm !border-none font-medium text-gray-900">
                    {unit.household_id}
                  </td>

                  <td
                    colSpan="3"
                    className="text-sm text-gray-900 !border-none font-medium px-6 py-4 whitespace-nowrap flex justify-end"
                  >
                    <div className="flex">
                    <button
                        type="button"
                        onClick={() => {
                          
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 "
                      >
                        Xem
                      </button>
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
export default Transaction;
