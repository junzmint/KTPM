"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import BlueButton from "@/components/button/blue-button";

const CreateNewForm = (params) => {
  const [citizen, setCitizen] = useState([]);
  const [citizenName, setCitizenName] = useState([]);
  const [citizenDate, setCitizenDate] = useState([]);
  const [citizenReason, setCitizenReason] = useState([]);
  const [userRoles, setUserRoles] = useState({});

  useEffect(() => {
    (async () => {
      const token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      try {
        const response = await fetch(
          `http://localhost:4000/absence/get/${params.params.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        const citizen = data.data.absence;
        setCitizen(citizen.citizen_id);
        setCitizenName(citizen.citizen_id.name);
        setCitizenDate(citizen.date);
        setCitizenReason(citizen.reason);

        setUserRoles(localStorage.role);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
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
        <div className="bg-white mt-24 ml-8 mb-24 mr-8 px-6 py-8 rounded-xl shadow-md text-black w-full">
          <h1 className="mb-2 text-4xl font-bold text-center">
            Xem tạm vắng
          </h1>
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
            <div className="flex space-x-12">
              <div className="mr-8 w-full">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Giới tính
                </label>
                <label
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                >{citizen.gender}</label>
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  From
                </label>
                <label
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                >{citizenDate.from}</label>
              </div>
              <div className="w-full">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Dia chi
                </label>
                <label
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                >{citizen.accommodation}</label>
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  To
                </label>
                <label
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                >{citizenDate.to}</label>
              </div>
            </div>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Ly do
            </label>
            <div className="w-full">
            <label
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                >{citizenReason}</label>
            </div>
          </div>
          <div class="text-center text-sm text-grey-dark mt-4">
            {/* <BlueButton text="Cập nhật"></BlueButton> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewForm;
