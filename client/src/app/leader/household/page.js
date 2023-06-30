"use client"
import React, { useEffect, useState } from 'react'
import BlueButton from '@/components/button/blue-button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function HouseHold() {
    const [households, setHouseholds] = useState([]);
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const token =
                localStorage.getItem("access_token") ||
                sessionStorage.getItem("access_token");
            try {
                const response = await fetch("http://localhost:4000/household/list", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const data = await response.json();
                console.log(data.data.list);
                setHouseholds(data.data.list)
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);
    const seeDetail = (id) => {
        router.push(`./household/detail?${id}`)
    }
    return (
        <div className='flex'>
            <div className="flex-auto w-1/5 bg-orange-700 h-screen">
                navbar
            </div>
            <div className='flex w-4/5 bg-blue  justify-center'>
                <div className="overflow-x-auto rounded drop-shadow-md stroke-1 w-2/3">
                    <table className="flex-auto min-w-full drop-shadow-md mt-40">
                        <thead className="bg-white border-b">
                            <tr className="bg-gray-100 border-b">
                                <th scope="col" colSpan="3" className="text-lg font-medium text-gray-900 px-6 py-4 text-left">
                                    Danh sách các hộ gia đình
                                </th>
                                <th scope="col" className="text-lg font-medium text-gray-900 px-6 py-4 text-left">

                                </th>
                                <th scope="col" className="text-lg font-medium text-gray-900 px-6 py-4 text-left flex justify-end">
                                    <BlueButton text="Tạo"></BlueButton>
                                </th>
                            </tr>
                            <tr className="bg-white border-b">
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Số thứ tự
                                </th>
                                <th scope="col" colSpan="2" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Chủ hộ
                                </th>
                                <th scope="col" colSpan="2" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Mã hộ
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {households.map((unit, index) => (
                                <tr key={index} className="bg-gray-100 border-b">
                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td colSpan="2" className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                        {unit.owner_id.name.firstName + " " + unit.owner_id.name.lastName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{unit.household_id}</td>

                                    <td colSpan="3" className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap flex justify-end">
                                        <div className="flex">

                                            <BlueButton onClick={() => { seeDetail(unit._id) }} text="Xem"></BlueButton>
                                            <Link
                                                href={{
                                                    pathname: './household/detail',
                                                    query: { id: `${unit._id}` },
                                                }}
                                            >
                                                <BlueButton text="Xoá"></BlueButton>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div >
    )
}

export default HouseHold