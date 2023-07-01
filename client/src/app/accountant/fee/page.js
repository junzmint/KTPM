'use client';
import BlueButton from '@/components/button/blue-button';
import Navbar from '@/components/navbar';
import React, { useState, useEffect } from 'react';
const Fee = () => {
  const [fee, setFeeList] = useState([]);
  const [donation, setDonationList] = useState([]);
  const [showModal, setShowModal] = useState(false);


  const [name, setName] = useState('');
  const [required, setRequired] = useState('');
  const [memberPayment, setmemberPayment] = useState(false);

  const createFee = async (event) =>{
    event.preventDefault();
    const token =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');
    const response = await fetch('http://localhost:4000/fee/create', {
      method: 'POST',
      body: JSON.stringify({ name, required, memberPayment}),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    const data = await response.json();
    if(response.ok){
      
    }else{
      console.assert(response.body.errors);
    }
    setShowModal(false);
  }

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
          <div className="mr-0">
            <BlueButton
              text="Create a fee"
              onClick={() => setShowModal(true)}
            ></BlueButton>
            {showModal ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                <div className="relative w-auto max-w-3xl mx-auto my-6">
                  {/*content*/}
                  <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                      <h3 className="text-3xl font-semibold">
                        Create a fee/donation
                      </h3>
                    </div>
                    <div class="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                      <div class="relative w-full">
                        <input
                          type="text"
                          id="floating_filled"
                          value={name}
                          onChange={(event) => {
                            setName(event.target.value);
                          }}
                          class="rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          for="floating_filled"
                          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Fee/donation
                        </label>
                      </div>
                    </div>

                    <div class="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                      <div class="relative w-full">
                        <input
                          type="text"
                          id="floating_filled"
                          class="rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={required}
                          onChange={(event) => {
                            setRequired(event.target.value);
                          }}
                        />
                        <label
                          for="floating_filled"
                          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Required
                        </label>
                      </div>
                    </div>

                    <div class="flex p-5 border-b border-solid rounded-t border-slate-200">
                      <div class="flex items-center h-5">
                        <input
                          checked={memberPayment}
                          onChange={(event) => setmemberPayment(event.target.checked)}
                          id="helper-checkbox"
                          aria-describedby="helper-checkbox-text"
                          type="checkbox"
                          value=""
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div class="ml-2 text-sm">
                        <label
                          for="helper-checkbox"
                          class="font-medium text-gray-900 dark:text-gray-500"
                        >
                          Payment by person
                        </label>
                        <p
                          id="helper-checkbox-text"
                          class="text-xs font-normal text-gray-500 dark:text-gray-500"
                        >
                          Fee = Payment x Person
                        </p>
                      </div>
                    </div>

                    {/*footer*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                      <button
                        className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                        type="button"
                        
                        onClick={createFee}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="w-full bg-white border-gray-200 rounded-lg shadow max-w-7xl">
            <div className="flex flex-row ">
              <div className="flex flex-col w-1/2">
                <h1>List of fees</h1>
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
