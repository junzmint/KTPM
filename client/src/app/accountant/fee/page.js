'use client';
import Navbar from '@/components/navbar';
import React, { useState, useEffect } from 'react';



const Fee = () => {
  const [fee, setFeeList] = useState([]);
  const [donation, setDonationList] = useState([]);
  const HandleDelete = (id) => {
    const token =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');
    try {
      const response = fetch(`http://localhost:4000/fee/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok){
      
      }else{
        //Handle error
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    (async () => {
      const token =
        localStorage.getItem('access_token') ||
        sessionStorage.getItem('access_token');
      try {
        const response = await fetch('http://localhost:4000/fee/list', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const feeList = data.data.list.fee;
        const donationList = data.data.list.donation;
        setDonationList(donationList);
        setFeeList(feeList);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
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
  return (
    <React.Fragment>
      <div className="flex flex-row">
        <div className="flex flex-col w-[20%] bg-red-200">
          <Navbar data={jobMenu}></Navbar>
        </div>
        <div className="flex flex-col w-[80%] bg-blue-200">
          <div className="flex flex-row">
            <div className="flex flex-col">
              <h2>Fee</h2>
            </div>
          </div>
          <div className="flex flex-row ">
            <div className="flex flex-col w-1/2 bg-red-100">
              <h1>List of fees</h1>
            </div>
            <div className="flex flex-col w-1/2 bg-blue-500">
              <button>Create fee</button>
            </div>
          </div>

          <div className="flex flex-col bg-yellow-200">
            <table className="border border-black-green ">
              <tr>
                <th>Name</th>
                <th>Cost</th>
              </tr>
              {fee.map((u, index) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.required}</td>
                  <td>
                    <button type="button" className="bg-green-600">Update</button>
                    <button type="button" className="bg-red-600" onClick={HandleDelete(u._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <h2>Donation</h2>
            </div>
          </div>
          <div className="flex flex-row ">
            <div className="flex flex-col w-1/2 bg-red-100">
              <h1>List of donations</h1>
            </div>
            <div className="flex flex-col w-1/2 bg-blue-500">
              <button>Create donation</button>
            </div>
          </div>

          <div className="flex flex-col bg-yellow-200">
            <table className="border border-black-green ">
              <tr>
                <th>Name</th>
                <th>Cost</th>
              </tr>
              {donation.map((u, index) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.required}</td>
                  <td>
                    <button type="button" className="bg-green-600">Update</button>
                    <button type="button" className="bg-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Fee;
