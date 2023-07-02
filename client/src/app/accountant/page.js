"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
const Dashboard = () => {
  const jobMenu = {
    data: [
      {
        id: 1,
        name: "Dashboard",
        path: "/accountant",
      },
      {
        id: 2,
        name: "Fee",
        path: "/accountant/fee",
      },
      {
        id: 3,
        name: "Transaction",
        path: "/accountant/transaction",
      },
    ],
  };
  const [statistic, setStatistic] = useState([]);
  useEffect(() => {
    (async () => {
      const token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      try {
        const response = await fetch(
          "http://localhost:4000/transaction/statistic-fee?year=2023",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        const userList = data.data.statistic;
        setStatistic(userList);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return (
    <React.Fragment>
      <div className="flex flex-row">
        <div className="flex flex-col w-[20%]">
          <Navbar data={jobMenu}></Navbar>
        </div>
        <div className="flex flex-col w-[80%] bg-white-200 px-20">
          <div className="flex flex-row">
            <div className="flex flex-col mx-auto pt-5">
              <h1 className="mb-8 text-3xl text-center ">TRANG CHỦ</h1>
            </div>
          </div>
          <div className="overflow-x-auto rounded drop-shadow-md stroke-1 w-5/6  h-[80vh] mx-auto">
            <table className="flex-auto !border-none	 min-w-full drop-shadow-md relative">
              <thead className="sticky top-0">
                <tr className="bg-gray-100 border-b">
                  <th
                    scope="col"
                    colSpan="8"
                    className="!border-none text-xl font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    BẢNG THỐNG KÊ CÁC KHOẢN THU HÀNG THÁNG
                  </th>
                  {/* <th
                    scope="col"
                    className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left"
                  ></th>
                  <th
                    scope="col"
                    className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left flex justify-end"
                  >
                    <BlueButton text="Tạo"></BlueButton>
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
                    colSpan="2"
                    className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                  >
                    TÊN KHOẢN PHÍ
                  </th>
                  <th
                    scope="col"
                    colSpan="1"
                    className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                  >
                    TỔNG SỐ TIỀN
                  </th>
                  <th
                    scope="col"
                    colSpan="3"
                    className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                  >
                    CÁC HỘ CHƯA ĐÓNG
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-auto">
                {statistic?.map((u, index) => {
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
                        scope="col"
                        colSpan="2"
                        className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                      >
                        {u.fee.name}
                      </td>
                      <td
                        colSpan="1"
                        className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                      >
                        {u.total}
                      </td>

                      <td
                        scope="col"
                        colSpan="3"
                        className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center"
                      >
                        {u.unpaid_household?.map((item) => (
                          <tr key={item._id} className={backgroundColor}>
                            <td className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-center mx-auto">
                              {`${item?.owner_name.firstName} ${item?.owner_name.lastName}`}
                            </td>
                          </tr>
                        ))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="sticky bottom-0">
                <tr className="bg-gray-100 border-b">
                  <td
                    scope="col"
                    colSpan="8"
                    className="!border-none text-xl font-medium text-gray-900 px-6 py-4 text-left"
                  ></td>
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
