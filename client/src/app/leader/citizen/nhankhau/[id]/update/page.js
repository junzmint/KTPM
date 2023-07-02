"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import BlueButton from "@/components/button/blue-button";

const CreateNewForm = (params) => {
  const [citizen, setCitizen] = useState([]);
  const [citizenName, setCitizenName] = useState([]);
  const [userRoles, setUserRoles] = useState({});

  useEffect(() => {
    (async () => {
      const token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      try {
        const response = await fetch(
          `http://localhost:4000/citizen/profile/${params.params.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        const citizen = data.data.citizen;
        setCitizen(citizen);
        setCitizenName(citizen.name);
        console.log(citizen);

        setUserRoles(localStorage.role);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCitizen({ ...citizen, [name]: value });
  };
  const handleChangeName = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCitizenName({ ...citizenName, [name]: value });
  };
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
    <div className="flex">
      <div className="flex-auto w-1/5 bg-slate-500 h-screen">
        <Navbar data={jobMenu} />
      </div>
      <div className="flex w-4/5 bg-white justify-center">
        <div className="bg-white mt-24 px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-12 text-4xl font-bold text-center">
            Cập nhật công dân
          </h1>
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
                  name="_id"
                  placeholder="Họ"
                  value={citizenName.firstName}
                  onChange={handleChangeName}
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
                  name="_id"
                  placeholder="Ten"
                  value={citizenName.lastName}
                  onChange={handleChangeName}
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
                  Nơi sinh
                </label>
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="birthPlace"
                  placeholder="Noi sinh"
                  value={citizen.birthPlace}
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
              </div>
            </div>
          </div>
          <div className="flex items-center w-full"></div>
          <div class="text-center text-sm text-grey-dark mt-4">
            <BlueButton text="Cập nhật"></BlueButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewForm;
