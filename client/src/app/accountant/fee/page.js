'use client';
import BlueButton from '@/components/button/blue-button';
import Navbar from '@/components/navbar';
import { Html } from 'next/document';
import React, { useState, useEffect } from 'react';

const Fee = () => {
  const feeMem = {
    name: '',
    required: '',
    memberPayment: false,
  };
  const [fee, setFeeList] = useState([]);
  const [donation, setDonationList] = useState([]);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [updateUnit, setUpdateUnit] = useState();
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalUpdate2, setShowModalUpdate2] = useState(false);

  const [name, setName] = useState('');
  const [required, setRequired] = useState('');
  const [memberPayment, setmemberPayment] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const updateDonation = async ({ _id }) => {
    const token =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');
    const response = await fetch(`http://localhost:4000/fee/update/${_id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, required, memberPayment }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      setIsSuccess(true);
      setSuccessMessage(data.message);
      donation.forEach((item) => {
        if (item._id === _id) {
          item.name = name;
          item.required = required;
          item.memberPayment = memberPayment;
        }
        return item;
      });
      setDonationList([...donation]);
      setName('');
      setRequired('');
      setmemberPayment(false);
     
    } else {
      setIsSuccess(true);
      setSuccessMessage(data.errors.message);
    }
    setShowModalUpdate2(false);
  };

  const updateFee = async ({ _id }) => {
    const token =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');
    const response = await fetch(`http://localhost:4000/fee/update/${_id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, required, memberPayment }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      setIsSuccess(true);
      setSuccessMessage(data.message);
      fee.forEach((item) => {
        if (item._id === _id) {
          item.name = name;
          item.required = required;
          item.memberPayment = memberPayment;
        }
        return item;
      });
      setFeeList([...fee]);
      setName('');
      setRequired('');
      setmemberPayment(false);
      window.alert(successMessage);
    } else {
      setIsSuccess(true);
      setSuccessMessage(data.errors.message);
      window.alert(successMessage);
    }
    setShowModalUpdate(false);
  };

  const createFee = async (event) => {
    event.preventDefault();
    const token =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');
    const response = await fetch('http://localhost:4000/fee/create', {
      method: 'POST',
      body: JSON.stringify({ name, required, memberPayment }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    setName('');
    setRequired('');
    setmemberPayment(false);
    feeMem.name = name;
    feeMem.required = required;
    feeMem.memberPayment = memberPayment;
    const data = await response.json();
    if (response.ok) {
      fee.push(feeMem);
      setIsSuccess(true);
      setSuccessMessage(data.message);
      window.alert(successMessage);
    } else {
      setSuccessMessage(data.errors.message);
      setIsSuccess(true);
      window.alert(successMessage);
    }
    setShowModalCreate(false);
  };

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
        name: 'Trang chủ',
        path: '/accountant',
      },
      {
        id: 2,
        name: 'Khoản phí - đóng góp',
        path: '/accountant/fee',
      },
      {
        id: 3,
        name: 'Khoản thu',
        path: '/accountant/transaction',
      },
    ],
  };
  return (
    <div className="flex">
      <div className="flex-auto w-1/5 h-screen">
        <Navbar data={jobMenu} />
      </div>

      <div className="flex justify-center w-4/5 bg-blue">
        
        <div className="w-4/5 overflow-x-auto rounded stroke-1 drop-shadow-md ">
          <div className="flex-auto !border-none	  drop-shadow-md mt-20 bg-gray-100 px-8 py-6">
            <h1 className="text-2xl font-bold">
              Danh sách các khoản phí, đóng góp
            </h1>
            <div className="mt-20">
              <BlueButton
                text="Tạo một khoản phí/đóng góp mới"
                onClick={() => setShowModalCreate(true)}
              ></BlueButton>
              {showModalCreate ? (
                <div className="inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                  <div className="relative w-auto max-w-3xl mx-auto my-6">
                    {/*content*/}
                    <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                        <h3 className="text-3xl font-semibold">
                          Tạo một khoản phí/đóng góp
                        </h3>
                      </div>
                      <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                        <div className="relative w-full">
                          <input
                            type="text"
                            id="floating_filled"
                            value={name}
                            onChange={(event) => {
                              setName(event.target.value);
                            }}
                            className="rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                          />
                          <label
                            for="floating_filled"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                          >
                            Tên
                          </label>
                        </div>
                      </div>

                      <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                        <div className="relative w-full">
                          <input
                            type="text"
                            id="floating_filled"
                            className="rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={required}
                            onChange={(event) => {
                              setRequired(event.target.value);
                            }}
                          />
                          <label
                            for="floating_filled"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                          >
                            Yêu cầu
                          </label>
                        </div>
                      </div>

                      <div className="flex p-5 border-b border-solid rounded-t border-slate-200">
                        <div className="flex items-center h-5">
                          <input
                            checked={memberPayment}
                            onChange={(event) =>
                              setmemberPayment(event.target.checked)
                            }
                            id="helper-checkbox"
                            aria-describedby="helper-checkbox-text"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                        <div className="ml-2 text-sm">
                          <label
                            for="helper-checkbox"
                            className="font-medium text-gray-900 dark:text-gray-500"
                          >
                            Tính theo số người
                          </label>
                          <p
                            id="helper-checkbox-text"
                            className="text-xs font-normal text-gray-500 dark:text-gray-500"
                          >
                            Phí = Yêu cầu x Số người trong hộ khẩu
                          </p>
                        </div>
                      </div>

                      {/*footer*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                        <button
                          className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                          type="button"
                          onClick={() => setShowModalCreate(false)}
                        >
                          Đóng
                        </button>
                        <button
                          className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                          type="button"
                          onClick={createFee}
                        >
                          Tạo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <table className="flex-auto !border-none	 min-w-full drop-shadow-md mt-20">
            <thead className="bg-white border-b">
              <tr className="bg-gray-100 border-b">
                <th
                  scope="col"
                  colSpan="5"
                  className="!border-none text-lg font-medium text-gray-900 px-8 py-6 text-left"
                >
                  Các khoản phí bắt buộc
                </th>
                <th
                  scope="col"
                  colSpan="1"
                  className="!border-none text-lg font-medium text-gray-900 px-8 py-6 "
                ></th>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="col"
                  className="text-sm font-medium !border-none text-gray-900 px-8 py-6 text-left"
                >
                  Tên
                </th>
                <th
                  scope="col"
                  colSpan="2"
                  className="text-sm font-medium !border-none text-gray-900 px-8 py-6 text-left"
                >
                  Yêu cầu
                </th>
                <th
                  scope="col"
                  colSpan="3"
                  className="text-sm font-medium !border-none text-gray-900 px-8 py-6 text-left"
                >
                  Tính theo đầu người
                </th>
              </tr>
            </thead>
            <tbody>
              {fee.map((unit, index) => (
                <tr key={index} className="bg-gray-100 !border-none border-b">
                  <td
                    colSpan="2"
                    className="text-sm text-gray-900 !border-none font-medium px-8 py-6 whitespace-nowrap"
                  >
                    {unit.name}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-sm !border-none font-medium text-gray-900">
                    {unit.required}
                  </td>
                  <th
                    scope="col"
                    colSpan="2"
                    className="text-sm font-medium !border-none text-gray-900 px-8 py-6 text-left"
                  >
                    {!unit.memberPayment ? 'Không' : 'Có'}
                  </th>

                  <td
                    colSpan="2"
                    className="text-sm text-gray-900 !border-none font-medium px-8 py-6 whitespace-nowrap flex justify-end"
                  >
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => {
                          setUpdateUnit(unit);
                          setName(unit.name);
                          setRequired(unit.required);
                          setmemberPayment(unit.memberPayment);
                          setShowModalUpdate(true);
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 "
                      >
                        Sửa
                      </button>
                      {showModalUpdate ? (
                        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                          <div className="relative w-auto max-w-3xl mx-auto my-6">
                            {/*content*/}
                            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                              {/*header*/}
                              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                                <h3 className="text-3xl font-semibold">
                                  Sửa khoản phí
                                </h3>
                              </div>
                              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                                <div className="relative w-full">
                                  <input
                                    type="text"
                                    id="floating_filled"
                                    value={name}
                                    onChange={(event) => {
                                      setName(event.target.value);
                                    }}
                                    className="rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                  />
                                  <label
                                    for="floating_filled"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                  >
                                    Tên
                                  </label>
                                </div>
                              </div>

                              <div className="items-start justify-between p-5 border-b border-solid rounded-t lex border-slate-200">
                                <div className="relative w-full">
                                  <input
                                    type="text"
                                    id="floating_filled"
                                    className="rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    value={required}
                                    onChange={(event) => {
                                      setRequired(event.target.value);
                                    }}
                                  />
                                  <label
                                    for="floating_filled"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                  >
                                    Yêu cầu
                                  </label>
                                </div>
                              </div>

                              <div className="flex p-5 border-b border-solid rounded-t border-slate-200">
                                <div className="flex items-center h-5">
                                  <input
                                    checked={memberPayment}
                                    onChange={(event) =>
                                      setmemberPayment(event.target.checked)
                                    }
                                    id="helper-checkbox"
                                    aria-describedby="helper-checkbox-text"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  />
                                </div>
                                <div className="ml-2 text-sm">
                                  <label
                                    for="helper-checkbox"
                                    className="font-medium text-gray-900 dark:text-gray-500"
                                  >
                                    Tính theo số người
                                  </label>
                                  <p
                                    id="helper-checkbox-text"
                                    className="text-xs font-normal text-gray-500 dark:text-gray-500"
                                  >
                                    Phí = Yêu cầu x Số người trong hộ khẩu. 
                                  </p>
                                  <p
                                    id="helper-checkbox-text"
                                    className="text-xs font-normal text-gray-500 dark:text-gray-500"
                                  >
                                     Nếu yêu cầu bằng 0 thì sẽ trở thành một khoản đóng góp, nếu yêu cầu lớn hơn không sẽ trở thành một khoản phí.
                                  </p>
                                </div>
                              </div>

                              {/*footer*/}
                              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                                <button
                                  className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                  type="button"
                                  onClick={() => setShowModalUpdate(false)}
                                >
                                  Đóng
                                </button>
                                <button
                                  className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                  type="button"
                                  onClick={() => updateFee(updateUnit)}
                                >
                                  Cập nhật
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 "
                        onClick={() => handleDelete(unit)}
                      >
                        Xóa
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
                  colSpan="5"
                  className="!border-none text-lg font-medium text-gray-900 px-8 py-6 text-left"
                >
                  Các khoản đóng góp tùy tâm
                </th>
                <th
                  scope="col"
                  colSpan="1"
                  className="!border-none text-lg font-medium text-gray-900 px-8 py-6 "
                ></th>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="col"
                  className="text-sm font-medium !border-none text-gray-900 px-8 py-6 text-left"
                >
                  Tên
                </th>
                <th
                  scope="col"
                  colSpan="2"
                  className="text-sm font-medium !border-none text-gray-900 px-8 py-6 text-left"
                ></th>
                <th
                  scope="col"
                  colSpan="3"
                  className="text-sm font-medium !border-none text-gray-900 px-8 py-6 text-left"
                ></th>
              </tr>
            </thead>
            <tbody>
              {donation.map((unit, index) => (
                <tr key={index} className="bg-gray-100 !border-none border-b">
                  <td
                    colSpan="2"
                    className="text-sm text-gray-900 !border-none font-medium px-8 py-6 whitespace-nowrap"
                  >
                    {unit.name}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-sm !border-none font-medium text-gray-900"></td>
                  <th
                    scope="col"
                    colSpan="2"
                    className="text-sm font-medium !border-none text-gray-900 px-8 py-6 text-left"
                  ></th>

                  <td
                    colSpan="2"
                    className="text-sm text-gray-900 !border-none font-medium px-8 py-6 whitespace-nowrap flex justify-end"
                  >
                    <div className="flex">
                      <button
                      onClick={() => {
                        setUpdateUnit(unit);
                        setName(unit.name);
                        setRequired(unit.required);
                        setmemberPayment(unit.memberPayment);
                        setShowModalUpdate(true);
                      }}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 "
                      >
                        Sửa
                      </button>
                      {showModalUpdate2 ? (
                        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                          <div className="relative w-auto max-w-3xl mx-auto my-6">
                            {/*content*/}
                            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                              {/*header*/}
                              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                                <h3 className="text-3xl font-semibold">
                                  Sửa khoản đóng góp
                                </h3>
                              </div>
                              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                                <div className="relative w-full">
                                  <input
                                    type="text"
                                    id="floating_filled"
                                    value={name}
                                    onChange={(event) => {
                                      setName(event.target.value);
                                    }}
                                    className="rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                  />
                                  <label
                                    for="floating_filled"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                  >
                                    Tên
                                  </label>
                                </div>
                              </div>

                              <div className="items-start justify-between p-5 border-b border-solid rounded-t lex border-slate-200">
                                <div className="relative w-full">
                                  <input
                                    type="text"
                                    id="floating_filled"
                                    className="rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    value={required}
                                    onChange={(event) => {
                                      setRequired(event.target.value);
                                    }}
                                  />
                                  <label
                                    for="floating_filled"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                  >
                                    Yêu cầu
                                  </label>
                                </div>
                              </div>

                              <div className="flex p-5 border-b border-solid rounded-t border-slate-200">
                                <div className="flex items-center h-5">
                                  <input
                                    checked={memberPayment}
                                    onChange={(event) =>
                                      setmemberPayment(event.target.checked)
                                    }
                                    id="helper-checkbox"
                                    aria-describedby="helper-checkbox-text"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  />
                                </div>
                                <div className="ml-2 text-sm">
                                  <label
                                    for="helper-checkbox"
                                    className="font-medium text-gray-900 dark:text-gray-500"
                                  >
                                    Tính theo số người
                                  </label>
                                  <p
                                    id="helper-checkbox-text"
                                    className="text-xs font-normal text-gray-500 dark:text-gray-500"
                                  >
                                    Phí = Yêu cầu x Số người trong hộ khẩu. 
                                  </p>
                                  <p
                                    id="helper-checkbox-text"
                                    className="text-xs font-normal text-gray-500 dark:text-gray-500"
                                  >
                                     Nếu yêu cầu bằng 0 thì sẽ trở thành một khoản đóng góp, nếu yêu cầu lớn hơn không sẽ trở thành một khoản phí.
                                  </p>
                                </div>
                              </div>

                              {/*footer*/}
                              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                                <button
                                  className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                  type="button"
                                  onClick={() => setShowModalUpdate2(false)}
                                >
                                  Đóng
                                </button>
                                <button
                                  className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                  type="button"
                                  onClick={() => updateDonation(updateUnit)}
                                >
                                  Cập nhật
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 "
                        onClick={() => handleDelete(unit)}
                      >
                        Xóa
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
export default Fee;
