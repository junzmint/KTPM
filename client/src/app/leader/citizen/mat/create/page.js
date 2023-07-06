"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import BlueButton from "@/components/button/blue-button";
import { customAlphabet, nanoid } from "nanoid";


const CreateNewForm = () => {
  const inputData = {
    citizen_id: "",
    code: "",
    place: "Hà Nội",
    date: "",
    reason: "",
  };
  const nanoid = customAlphabet("123456789",6);
  const [CitizenName, setCitizenName] = useState();
  const [citizen, setCitizen] = useState(inputData);
  const [userRoles, setUserRoles] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const code = nanoid();
  citizen.code = code;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCitizen((prevCitizen) => ({ ...prevCitizen, [name]: value }));
  };
  const handleChangeName = (e) => {
    const value = e.target.value;
    setCitizenName(() => value);
    getCitizenID();
  };
  const getCitizenID = async (e) => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    try {
      const response = await fetch(
        `http://localhost:4000/citizen/find?key=${CitizenName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      const id = data.data.result[0]._id;
      console.log(id);
      citizen.citizen_id = id;
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    console.log(JSON.stringify(citizen));
    e.preventDefault();
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    const response = await fetch("http://localhost:4000/death/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(citizen),
    });
    if (response.ok) {
      const data = await response.json();
      setIsSuccess(true);
      setSuccessMessage(data.message);
      setCitizen(inputData);
    } else {
      const data = await response.json();
      setIsSuccess(true);
      setSuccessMessage(data.errors.message);
      console.log(data);
      setCitizen(inputData);
    }
  };

  const jobMenu = {
    data: [
      {
        id: 1,
        name: "Trang chủ",
        path: "/leader",
        auth: userRoles,
      },
      {
        id: 2,
        name: "Công dân",
        path: "/leader/citizen",
        auth: userRoles,
      },
      {
        id: 3,
        name: "Hộ khẩu",
        path: "/leader/household",
        auth: userRoles,
      },
    ],
  };
  return (
    <div className="flex">
      <div className="flex-auto w-1/5 bg-slate-500 h-screen">
        <Navbar data={jobMenu} />
      </div>
      <div className="flex w-4/5 bg-slate-100  justify-center">
        <div className="bg-white mt-24 ml-8 mb-8 mr-8 px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-2 text-4xl font-bold text-center">Khai tử</h1>
          <div
            ml-24
            w-4
            max-w-7xl
            h-3
            p-2
            mt-2
            bg-white
            border-gray-200
            rounded-lg
            shadow
          >
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Họ và Tên
            </label>
            <div className="w-full">
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="name"
                placeholder="Họ và tên"
                onChange={handleChangeName}
              />
              <label class="block text-gray-700 text-sm font-bold mb-2">
                Ngày mất
              </label>
              <div className="w-full">
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="date"
                  placeholder="Y-M-D"
                  value={citizen.date}
                  onChange={handleChange}
                />
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Lý do
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="reason"
                    placeholder="Lý do"
                    value={citizen.reason}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex items-center w-full"></div>
              <div class="text-center text-sm text-grey-dark mt-4">
                <BlueButton text="Tạo" onClick={handleSubmit}></BlueButton>
              </div>
              {isSuccess && <div>{successMessage}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewForm;
