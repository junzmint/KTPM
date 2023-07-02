"use client";
import Layout from "./layout";
import { UpdateButton, BlueButton, DeleteButton } from "@/components/button";
import Link from "next/link";
import React, { useState, useEffect } from "react";
const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [userRoles, setUserRoles] = useState({});
  useEffect(() => {
    (async () => {
      const token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      try {
        const response = await fetch("http://localhost:4000/user/userList", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const userList = data.data.list;
        setUser(userList);
        setUserRoles(localStorage.role);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  const handleDelete = async (u) => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    try {
      const response = await fetch(
        `http://localhost:4000/user/delete/${u._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok && data.responseStatus === 1) {
        console.log("delete ok");
        setUser((prevUser) => prevUser?.filter((item) => item._id !== u._id));
      } else {
        console.log("delete fail");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-row h-[100vh]">
        <div className="flex flex-col w-[80vw] bg-blue-200">
          <div className="flex flex-row">
            <div className="flex flex-col">
              <h2>Main content</h2>
            </div>
          </div>
          <div className="overflow-x-auto rounded drop-shadow-md stroke-1 w-5/6 overflow-auto h-[100%]">
            <table className="flex-auto !border-none	 min-w-full drop-shadow-md ">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th
                    scope="col"
                    colSpan="8"
                    className="!border-none text-xl font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Danh sách người dùng
                  </th>
                  {/* <th
                    scope="col"
                    className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left"
                  ></th>
                  <th
                    scope="col"
                    className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left flex justify-end"
                  >
                    <DeleteButton text="Tạo"></DeleteButton>
                  </th> */}
                </tr>
                <tr className="bg-white border-b">
                  <th
                    scope="col"
                    className="text-sm font-medium !border-none text-gray-900 px-4 py-2 text-center"
                  >
                    STT
                  </th>
                  <th
                    scope="col"
                    colSpan="1"
                    className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                  >
                    SỐ ĐIỆN THOẠI
                  </th>
                  <th
                    scope="col"
                    colSpan="2"
                    className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                  >
                    TRẠNG THÁI
                  </th>
                  <th
                    scope="col"
                    colSpan="2"
                    className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                  >
                    VAI TRÒ
                  </th>
                  <th
                    scope="col"
                    colSpan="1"
                    className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                  ></th>
                  <th
                    scope="col"
                    colSpan="1"
                    className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {user.map((u, index) => {
                  const backgroundColor =
                    index % 2 === 0
                      ? "bg-white !border-none border-b"
                      : "bg-gray-100 !border-none border-b";
                  return (
                    <tr key={u._id} className={backgroundColor}>
                      <td
                        scope="col"
                        className="text-sm text-gray-900 !border-none font-medium px-4 py-2 whitespace-nowrap text-center"
                      >
                        {index + 1}
                      </td>
                      <td
                        colSpan="1"
                        className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                      >
                        {u.phone}
                      </td>

                      <td
                        scope="col"
                        colSpan="2"
                        className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                      >
                        {u.status === true ? "Active" : "Deactive"}
                      </td>
                      <td
                        scope="col"
                        colSpan="2"
                        className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                      >
                        {u.role}
                      </td>
                      <td
                        scope="col"
                        colSpan="1"
                        className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                      >
                        <Link href={`/admin/${u._id}`}>
                          <UpdateButton text="Sửa"></UpdateButton>
                        </Link>
                      </td>
                      <td
                        scope="col"
                        colSpan="1"
                        className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                      >
                        <DeleteButton
                          text="Xóa"
                          onClick={() => handleDelete(u)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 border-b">
                  <th
                    scope="col"
                    colSpan="8"
                    className="!border-none text-xl font-medium text-gray-900 px-6 py-4 text-left"
                  ></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Dashboard;
