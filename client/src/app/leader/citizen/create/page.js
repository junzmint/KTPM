"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import BlueButton from "@/components/button/blue-button";

const CreateNewForm = () => {
  const inputData = {
    card_id: "",
    location: "Hà Nội",
    date: "2019-01-21",
    expiration: "2023-05-20",
    passport_id: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    birthPlace: "Hà Nội",
    hometown: "",
    residence: "Đâu đó ở Tuyên Quang",
    accommodation: "Số 32222, Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
    religion: "",
    ethic: "",
    profession: "",
    workplace: "",
    education: "",
    moveInDate: "2019-02-22",
    moveInReason: "Định cư",
    moveOutDate: "",
    moveOutReason: "",
  };
  const [citizen, setCitizen] = useState(inputData);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [userRoles, setUserRoles] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCitizen((prevCitizen) => ({ ...prevCitizen, [name]: value }));
  };
  const handleSubmit = async (e) => {
    console.log(JSON.stringify(citizen));
    e.preventDefault();
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    const response = await fetch("http://localhost:4000/citizen/create", {
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
      setSuccessMessage(data.error.message);
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
        <div className="bg-white mt-6 ml-8 mb-8 mr-8 px-6 py-8 rounded-2xl shadow-md text-black w-full">
          <h1 className="mb-8 text-4xl font-bold text-center">Tạo công dân</h1>
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
            <div className="flex space-x-12">
              <div className="mr-8 w-full">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Họ
                </label>
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="firstName"
                  placeholder="Họ"
                  value={citizen.firstName}
                  onChange={handleChange}
                />
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Ngày sinh
                </label>
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="dob"
                  placeholder="Ngay sinh"
                  value={citizen.dob}
                  onChange={handleChange}
                />
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Quê quán
                </label>
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="hometown"
                  placeholder="Que quan"
                  value={citizen.hometown}
                  onChange={handleChange}
                />
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Tôn giáo
                </label>
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="religion"
                  placeholder="Tôn giáo"
                  value={citizen.religion}
                  onChange={handleChange}
                />
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Nghề nghiệp
                </label>
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="profession"
                  placeholder="Nghề nghiệp"
                  value={citizen.profession}
                  onChange={handleChange}
                />
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Trình độ học vấn
                </label>
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="education"
                  placeholder="Trình độ học vấn"
                  value={citizen.education}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Tên
                </label>
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="lastName"
                  placeholder="Ten"
                  value={citizen.lastName}
                  onChange={handleChange}
                />
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Căn cước công dân
                </label>
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="card_id"
                  placeholder="12 so thoi nhe"
                  value={citizen.card_id}
                  onChange={handleChange}
                />
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Hộ chiếu
                </label>
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="passport_id"
                  placeholder="8 chữ số thôi nha"
                  value={citizen.passport_id}
                  onChange={handleChange}
                />
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Giới tính
                </label>
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="gender"
                  placeholder="Giới tính"
                  value={citizen.gender}
                  onChange={handleChange}
                />
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Dân tộc
                </label>
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="ethic"
                  placeholder="Dân tộc"
                  value={citizen.ethic}
                  onChange={handleChange}
                />
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Nơi làm việc
                </label>
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="workplace"
                  placeholder="Nơi làm việc"
                  value={citizen.workplace}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div class="text-center text-sm text-grey-dark mt-4">
            <BlueButton text="Tạo công dân" onClick={handleSubmit}></BlueButton>
          </div>
          {isSuccess && <div>{successMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default CreateNewForm;
