'use client';
import BlueButton from '@/components/button/blue-button';
import Navbar from '@/components/navbar';
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
const Fee = () => {
  const [fee, setFeeList] = useState([]);
  const [donation, setDonationList] = useState([]);

  const handleDelete = async ({ _id }) => {
    const token =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');
    try {
      const response = await fetch(`http://localhost:4000/fee/delete/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setFeeList((prevList) => prevList.filter((item) => item._id !== _id));
        setDonationList((prevList) =>
          prevList.filter((item) => item._id !== _id)
        );
      } else {
        //Handle error
      }
    } catch (error) {
      console.error(error);
    }
    console.log(_id);
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
        <div className="flex flex-col flex-auto w-4/5 h-screen overflow-y-scroll bg-slate-100">
          <div className="w-full bg-white border-gray-200 rounded-lg shadow max-w-7xl">
            <div className="flex flex-row ">
              <div className="flex flex-col w-1/2">
                <h1>List of fees</h1>
              </div>
              <div className="mr-0">
                <Popup
                  trigger={<BlueButton text="Create a fee"></BlueButton>}
                >
                  
                </Popup>
              </div>
            </div>
            <div className="flex flex-col">
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
                      <button type="button" className="bg-green-600">
                        Update
                      </button>
                      <button
                        type="button"
                        className="bg-red-600"
                        onClick={() => handleDelete(u)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
          <div className="w-full mt-5 bg-white border-gray-200 rounded-lg shadow max-w-7xl">
            <div className="flex flex-row ">
              <div className="flex flex-col w-1/2 ">
                <h1>List of donations</h1>
              </div>
              <BlueButton text="Create a donation"></BlueButton>
            </div>

            <div className="flex flex-col">
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
                      <button type="button" className="bg-green-500">
                        Update
                      </button>
                      <button
                        type="button"
                        className="bg-red-500"
                        onClick={() => handleDelete(u)}
                      >
                        Delete
                      </button>
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
export default Fee;
