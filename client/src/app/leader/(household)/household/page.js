'use client';
import React, { useEffect, useState } from 'react';
import BlueButton from '@/components/button/blue-button';
import Navbar from '@/components/navbar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function HouseHold() {
  const [households, setHouseholds] = useState([]);
  const [userRoles, setUserRoles] = useState({});
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const token =
        localStorage.getItem('access_token') ||
        sessionStorage.getItem('access_token');
      try {
        const response = await fetch('http://localhost:4000/household/list', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setHouseholds(data.data.list);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const jobMenu = {
    data: [
      {
        id: 1,
        name: 'Dashboard',
        path: '/leader',
        auth: userRoles,
      },
      {
        id: 2,
        name: 'Citizen',
        path: '/leader/citizen',
        auth: userRoles,
      },
      {
        id: 3,
        name: 'Household',
        path: '/leader/household',
        auth: userRoles,
      },
    ],
  };

  const seeDetail = (id) => {
    router.push(`./household/${id}`);
  };

  const handleDelete = (id) => {
    households.splice(id, 1); // 2nd parameter means remove one item only

    setHouseholds((households) => households);
  };
  return (
    <div className="flex">
      <div className="flex-auto w-1/5 h-screen bg-slate-500">
        <Navbar data={jobMenu} />
      </div>
      <div className="flex justify-center w-4/5 bg-blue">
        <div className="w-2/3 overflow-x-auto rounded stroke-1 drop-shadow-md">
          <table className="flex-auto !border-none	 min-w-full drop-shadow-md mt-40">
            <thead className="bg-white border-b">
              <tr className="bg-gray-100 border-b">
                <th
                  scope="col"
                  colSpan="3"
                  className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Danh sách các hộ gia đình
                </th>
                <th
                  scope="col"
                  className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left"
                ></th>
                <th
                  scope="col"
                  className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left flex justify-end"
                >
                  <Link href="../../leader/addnewhousehold">
                    <BlueButton text="Tạo"></BlueButton>
                  </Link>
                </th>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="col"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Số thứ tự
                </th>
                <th
                  scope="col"
                  colSpan="2"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Chủ hộ
                </th>
                <th
                  scope="col"
                  colSpan="2"
                  className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left"
                >
                  Mã hộ
                </th>
              </tr>
            </thead>
            <tbody>
              {households.map((unit, index) => (
                <tr key={index} className="bg-gray-100 !border-none border-b">
                  <td className="text-sm text-gray-900 !border-none font-medium px-6 py-4 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td
                    colSpan="2"
                    className="text-sm text-gray-900 !border-none font-medium px-6 py-4 whitespace-nowrap"
                  >
                    {unit.owner_id.name.firstName +
                      ' ' +
                      unit.owner_id.name.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm !border-none font-medium text-gray-900">
                    {unit.household_id}
                  </td>

                  <td
                    colSpan="3"
                    className="text-sm text-gray-900 !border-none font-medium px-6 py-4 whitespace-nowrap flex justify-end"
                  >
                    <div className="flex">
                      <BlueButton
                        onClick={() => {
                          seeDetail(unit._id);
                        }}
                        text="Xem"
                      ></BlueButton>
                      <Link
                        href={{
                          pathname: './household/detail',
                        }}
                      ></Link>
                      <BlueButton
                        onClick={() => {
                          setHouseholds(households.splice(index - 1, 1));
                        }}
                        text="Xoá"
                      ></BlueButton>
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
}

export default HouseHold;
