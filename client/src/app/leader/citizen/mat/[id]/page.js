"use client";
import React from "react";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import BlueButton from "@/components/button/blue-button";
import Image from "next/legacy/image";
import Link from "next/link";

const Dashboard = ({ params }) => {
  const [citizenDetail, setCitizenDetail] = useState([]);
  const [citizenDoB, setCitizenDoB] = useState([]);
  const [citizenName, setCitizenName] = useState([]);
  const [citizenCard, setCitizenCard] = useState([]);
  const [userRoles, setUserRoles] = useState({});

  useEffect(() => {
    (async () => {
      const token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      try {
        const response = await fetch(
          `http://localhost:4000/citizen/profile/${params.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        const citizenData = data.data.citizen;
        setCitizenDetail(citizenData);
        setCitizenName(citizenData.name);
        setCitizenDoB(citizenData.dob.substr(0, 10));
        setCitizenCard(citizenData.card_id);
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
    <div class="flex h-screen">
      <div className="flex-auto w-1/5 bg-slate-500">
        <Navbar data={jobMenu} />
      </div>
      <div className="flex-auto w-4/5 bg-slate-100  h-full flex justify-center flex-col ">
        <div className="ml-24 w-5/6 max-w-7xl h-4/5 p-2 mt-2 bg-white border-gray-200 rounded-lg shadow">
          <div className="flex justify-end px-4 pt-4">
            <button
              id="dropdownButton"
              data-dropdown-toggle="dropdown"
              className="inline-block text-gray-500 hover:bg-gray-100 fo0 rounded-lg text-sm p-1.5"
              type="button"
            >
              <span className="sr-only">Open dropdown</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center pb-5 mb-3">
            <img
              className="w-36 h-36 mb-3 rounded-full shadow-lg"
              src="https://images.iphonephotographyschool.com/24762/560/portrait-photography.jpg"
              alt="Bonnie image"
            />
            <span className="text-3xl">
              {citizenName.firstName} {citizenName.lastName}
            </span>
            <span className="text-md dark:text-gray-400">
              {citizenDetail.gender}
            </span>
          </div>
          <div className="ml-4">
            <p>Căn cước công dân: {citizenCard._id} </p>
            <p>Ngày sinh: {citizenDoB} </p>
            <p>Hộ chiếu: {citizenDetail.passport_id}</p>
            <p>Quê quán: {citizenDetail.hometown}</p>
            <p>Nơi cư trú: {citizenDetail.birthPlace}</p>
            <p>Tôn giáo: {citizenDetail.religion}</p>
            <p>Nghề nghiệp: {citizenDetail.profession}</p>
            <p>Tổ chức: {citizenDetail.workplace}</p>
            <p>Học vấn: {citizenDetail.education}</p>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <div className="flex">
              <Link
                href={
                  "/leader/citizen/nhankhau/" + citizenDetail._id + "/update"
                }
              >
                <BlueButton text="Cập nhật"></BlueButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
