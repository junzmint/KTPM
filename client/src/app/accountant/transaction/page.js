'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import BlueButton from '@/components/button/blue-button';
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
    <React.Fragment>
      <div className="flex flex-row">
        <div className="flex flex-col w-[20%] bg-red-200">
          <Navbar data={jobMenu}></Navbar>
        </div>
        <div className="flex flex-col flex-auto w-4/5 h-screen overflow-y-scroll mt-9 bg-slate-100">
          <div className="w-full bg-white border-gray-200 rounded-lg shadow max-w-7xl">
            <div className="flex flex-col">
              <table className="border border-black-green ">
              <tr>
                <th>Household ID</th>
                <th>Owner</th>
              </tr>
              {household.map((u, index) => (
                <tr key={u._id}>
                  <td>{u.household_id}</td>
                  <td>{u.owner_id.name.firstName + " " + u.owner_id.name.lastName }</td>
                  <td>
                    <BlueButton text="View"></BlueButton>
                  </td>
                </tr>
              ))}
            </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Transaction;
