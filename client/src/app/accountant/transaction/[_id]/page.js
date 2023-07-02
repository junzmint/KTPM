'use client';
import Navbar from '@/components/navbar';
import React, { useState, useEffect } from 'react';

const HouseholdTransaction = ({ params }) => {
  const [fee_id, setfee_id] = useState('');
  const [amount, setAmount] = useState('');
  const [stage, setStage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [householdTransaction, setHouseholdTransaction] = useState([]);
  const [donationTransaction, setDonationTransaction] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [donation, setDonation] = useState([]);
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

  const createDonation = async (event) => {
    event.preventDefault();
    const token =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');
    const response = await fetch(
      `http://localhost:4000/transaction/donate/${params._id}`,
      {
        method: 'POST',
        body: JSON.stringify({ fee_id, amount, stage }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (response.ok) {
      
        donation.forEach((data) =>{
          if(data._id === fee_id){
            donationTransaction.push({status: amount,fee:{name:data.name},year:"2023"});
          }
        })
      setIsSuccess(true);
      setSuccessMessage(data.message);
      window.alert(successMessage);
    } else {
      setSuccessMessage(data.errors.message);
      setIsSuccess(true);
      window.alert(successMessage);
    }
    setfee_id('');
    setAmount('');
    setStage('');
    setShowModal(false);
  };

  const getDonationList = async () => {
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
      const donationList = data.data.list.donation;
      setDonation(donationList);
    } catch (e) {
      console.error(e);
    }
  };

  const unpayFee = async ({ _id }) => {
    const token =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');
    const response = await fetch(
      `http://localhost:4000/transaction/unpay/${_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setIsSuccess(true);
      setSuccessMessage(data.message);
      householdTransaction.forEach((item) => {
        if (item._id === _id) {
          item.remain = item.status;
          item.status = 0;
        }
        return item;
      });
      setHouseholdTransaction([...householdTransaction]);
      window.alert(successMessage);
    } else {
      setSuccessMessage(data.errors.message);
      setIsSuccess(true);
      window.alert(successMessage);
    }
  };

  const payFee = async ({ _id }) => {
    const token =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');
    const response = await fetch(
      `http://localhost:4000/transaction/pay/${_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setIsSuccess(true);
      setSuccessMessage(data.message);
      householdTransaction.forEach((item) => {
        if (item._id === _id) {
          item.status = item.remain;
          item.remain = 0;
        }
        return item;
      });
      setHouseholdTransaction([...householdTransaction]);
      window.alert(successMessage);
    } else {
      setSuccessMessage(data.errors.message);
      setIsSuccess(true);
      window.alert(successMessage);
    }
  };
  useEffect(() => {
    (async () => {
      const token =
        localStorage.getItem('access_token') ||
        sessionStorage.getItem('access_token');
      try {
        const response = await fetch(
          `http://localhost:4000/transaction/list/${params._id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setHouseholdTransaction(data.data.transaction_list.transactions);
        setDonationTransaction(data.data.transaction_list.donations);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return (
    <div className="flex">
      <div className="flex-auto w-1/5 h-screen ">
        <Navbar data={jobMenu} />
      </div>
      <div className="flex justify-center w-4/5 bg-blue">
        <div className="w-4/5 overflow-x-auto rounded stroke-1 drop-shadow-md">
          <div className="flex-auto !border-none	  drop-shadow-md mt-20 bg-gray-100 px-8 py-6">
            <button
              type="button"
              onClick={() => {
                getDonationList();
                setShowModal(true);
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 "
            >
              Thêm khoản đóng góp
            </button>
            {showModal ? (
              <div className="inset-0 z-50 items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                <div className="relative w-auto max-w-3xl mx-auto my-6">
                  {/*content*/}
                  <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                      <h3 className="text-3xl font-semibold">
                        Tạo khoản đóng góp
                      </h3>
                    </div>
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                      <div className="relative w-full">
                        <select
                          onChange={(event) => {
                            console.log(fee_id);
                            setfee_id(event.target.value);
                          }}
                          className="rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        >
                          {donation.map((d) => (
                            <option key={d.name} value={d._id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                        <label
                          for="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Tên khoản đóng góp
                        </label>
                      </div>
                    </div>

                    <div className="items-start justify-between p-5 border-b border-solid rounded-t lex border-slate-200">
                      <div className="relative w-full">
                        <input
                          type="text"
                          id="floating_filled"
                          value={amount}
                          onChange={(event) => {setAmount(event.target.value);console.log(amount)}}
                          className="rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          for="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Lượng đóng góp
                        </label>
                      </div>
                    </div>

                    <div className="items-start justify-between p-5 border-b border-solid rounded-t lex border-slate-200">
                      <div className="relative w-full">
                        <input
                          type="text"
                          id="floating_filled"
                          value={stage}
                          onChange={(event) => {setStage(event.target.value);console.log(stage)}}
                          className="rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          for="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Quý
                        </label>
                      </div>
                    </div>

                    {/*footer*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                      <button
                        className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Đóng
                      </button>
                      <button
                        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                        type="button"
                        onClick={createDonation}
                      >
                        Tạo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <table className="flex-auto !border-none	 min-w-full drop-shadow-md mt-20">
            <thead className="bg-white border-b">
              <tr className="bg-gray-100 border-b">
                <th
                  scope="col"
                  colSpan="3"
                  className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Danh sách các khoản thu của gia đình
                </th>
                <th
                  scope="col"
                  colSpan="3"
                  className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left"
                ></th>
                <th
                  scope="col"
                  className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left flex justify-end"
                ></th>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="col"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Tên khoản thu
                </th>
                <th
                  scope="col"
                  colSpan="2"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Năm
                </th>
                <th
                  scope="col"
                  colSpan="2"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Yêu cầu
                </th>
                <th
                  scope="col"
                  colSpan="2"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Đã thu
                </th>
              </tr>
            </thead>
            <tbody>
              {householdTransaction.map((unit, index) => (
                <tr key={index} className="bg-gray-100 !border-none border-b">
                  <td className="text-sm text-gray-900 !border-none font-medium px-6 py-4 whitespace-nowrap">
                    {unit.fee.name}
                  </td>
                  <td
                    colSpan="2"
                    className="text-sm text-gray-900 !border-none font-medium px-6 py-4 whitespace-nowrap"
                  >
                    {unit.year}
                  </td>
                  <td
                    scope="col"
                    colSpan="2"
                    className="px-6 py-4 whitespace-nowrap text-sm !border-none font-medium text-gray-900"
                  >
                    {unit.cost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm !border-none font-medium text-gray-900">
                    {unit.status}
                  </td>

                  <td
                    colSpan="3"
                    className="text-sm text-gray-900 !border-none font-medium px-6 py-4 whitespace-nowrap flex justify-end"
                  >
                    <div className="flex">
                      {unit.remain === 0 ? (
                        <label className="text-white bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-grey-600 dark:hover:bg-grey-700 ">
                          Đã thu phí
                        </label>
                      ) : (
                        <button
                          type="button"
                          onClick={() => payFee(unit)}
                          className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 "
                        >
                          Thu phí
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => unpayFee(unit)}
                        className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 "
                      >
                        Hoàn tác thu phí
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="flex-auto !border-none	 min-w-full drop-shadow-md mt-20 mb-20">
            <thead className="bg-white border-b">
              <tr className="bg-gray-100 border-b">
                <th
                  scope="col"
                  colSpan="3"
                  className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Danh sách các khoản đóng góp
                </th>
                <th
                  scope="col"
                  className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left"
                ></th>
                <th
                  scope="col"
                  className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left flex justify-end"
                ></th>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="col"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Tên khoản thu
                </th>
                <th
                  scope="col"
                  colSpan="2"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Năm
                </th>

                <th
                  scope="col"
                  colSpan="2"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Đã đóng góp
                </th>
              </tr>
            </thead>
            <tbody>
              {donationTransaction.map((unit, index) => (
                <tr key={index} className="bg-gray-100 !border-none border-b">
                  <td className="text-sm text-gray-900 !border-none font-medium px-6 py-4 whitespace-nowrap">
                    {unit.fee.name}
                  </td>
                  <td
                    colSpan="2"
                    className="text-sm text-gray-900 !border-none font-medium px-6 py-4 whitespace-nowrap"
                  >
                    {unit.year}
                  </td>

                  <td
                    scope="col"
                    colSpan="2"
                    className="px-6 py-4 whitespace-nowrap text-sm !border-none font-medium text-gray-900"
                  >
                    {unit.status}
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
export default HouseholdTransaction;
