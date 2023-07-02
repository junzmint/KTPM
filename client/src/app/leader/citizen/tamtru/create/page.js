"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import BlueButton from "@/components/button/blue-button";

const CreateNewForm = () => {
  const [citizen, setCitizen] = useState([]);
  const [citizenName, setCitizenName] = useState([]);
  const [citizenDate, setCitizenDate] = useState([]);
  const [citizenReason, setCitizenReason] = useState([]);
  const [userRoles, setUserRoles] = useState({});

  //   useEffect(() => {
  //     (async () => {
  //       const token =
  //         localStorage.getItem("access_token") ||
  //         sessionStorage.getItem("access_token");
  //       try {
  //         const response = await fetch(
  //           `http://localhost:4000/stay/detail/${params.params.id}`,
  //           {
  //             method: "GET",
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );

  //         const data = await response.json();
  //         const citizen = data.data.stay;
  //         setCitizen(citizen.citizen_id);
  //         setCitizenName(citizen.citizen_id.name);
  //         setCitizenDate(citizen.date);
  //         setCitizenReason(citizen.reason);

  //         setUserRoles(localStorage.role);
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     })();
  //   }, []);
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
        name: "Trang chủ",
        path: "/leader",
        auth: userRoles,
      },
      {
        id: 2,
        name: "Nhân khẩu",
        path: "/leader/citizen",
        auth: userRoles,
      },
      {
        id: 3,
        name: "Hộ dân cư",
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
          <h1 className="mb-2 text-4xl font-bold text-center">Tạo tạm trú</h1>
          <h3 className="mb-12 text-xl font-bold text-center text-slate-600">
            {citizenName.firstName} {citizenName.lastName}
          </h3>
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
                onChange={handleChange}
              />
              <div className="flex space-x-12">
                <div className="mr-8 w-full">
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Ma
                  </label>
                  <input
                    type="text"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="dob"
                    placeholder="Ngay sinh"
                    onChange={handleChange}
                  />
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    From
                  </label>
                  <input
                    type="text"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="hometown"
                    placeholder="From"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Dia chi
                  </label>
                  <input
                    type="text"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="gender"
                    placeholder="Dia chi"
                    onChange={handleChange}
                  />
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    To
                  </label>
                  <input
                    type="text"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="to"
                    placeholder="To"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <label class="block text-gray-700 text-sm font-bold mb-2">
                Ly do
              </label>
              <div className="w-full">
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="name"
                  placeholder="Ly do"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center w-full"></div>
            <div class="text-center text-sm text-grey-dark mt-4">
              <BlueButton text="Cập nhật"></BlueButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewForm;
