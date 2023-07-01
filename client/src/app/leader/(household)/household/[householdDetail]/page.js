"use client"

import BlueButton from '@/components/button/blue-button';
import Image from 'next/legacy/image';
import React, { useEffect, useState } from 'react'

function HouseholdDetailPage({ params }) {
    const [household, setHousehold] = useState({});
    const [name, setName] = useState();
    const [address, setAddress] = useState({});
    const [moveIn, setMoveIn] = useState({});
    const [members, setMembers] = useState([]);
    console.log(params)
    useEffect(() => {
        (async () => {
            const token =
                localStorage.getItem("access_token") ||
                sessionStorage.getItem("access_token");
            try {
                const response = await fetch(`http://localhost:4000/household/profile/${params.householdDetail}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const data = await response.json();
                setName(data.data.household.members[0].citizen_id.name.firstName
                    + " " + data.data.household.members[0].citizen_id.name.lastName)
                setHousehold(data.data.household)
                setAddress(data.data.household.address)
                setMoveIn(data.data.household.move_in)
                setMembers(data.data.household.members)
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    return (
        <div className='flex'>
            <div className="flex-auto w-1/5 bg-orange-700 h-screen">
                navbar
            </div>
            <div className="flex-auto w-4/5 bg-slate-100 h-screen flex justify-center flex-col">
                <div className="ml-28 w-4/5 max-w-7xl h-3/4 p-2 mt-24 bg-white border-gray-200 rounded-lg shadow ">
                    <div className="flex justify-end px-4 pt-4">
                        <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 hover:bg-gray-100 fo0 rounded-lg text-sm p-1.5" type="button">
                            <span className="sr-only">Open dropdown</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                        </button>
                    </div>
                    <div className="flex flex-col items-center pb-5">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://images.iphonephotographyschool.com/24762/560/portrait-photography.jpg" alt="Bonnie image" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900">{name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Chủ hộ</span>
                    </div>
                    <div className='ml-10'>
                        <p>Mã hộ: {household.household_id}</p>
                        <p>Địa chỉ: {address.no + ", " + address.ward + ", " + address.district + ", " + address.province}</p>
                        <p>Mã khu vực: {household.areaCode}</p>
                        <p>Ngày chuyển đến: {moveIn.date}</p>
                        <p>Lý do chuyển đến: {moveIn.reason == "" ? "Chưa có" : moveIn.reason}</p>
                    </div>
                    <div className='mt-8 flex justify-center items-center'>
                        <div className='flex'>
                            <BlueButton text="Cập nhật"></BlueButton>
                        </div>
                    </div>
                </div>
                <div className="ml-28 mb-16 w-4/5 max-w-7xl h-96 p-2 mt-24 bg-white border-gray-200 rounded-lg shadow">
                    <div>
                        <table className="flex-auto !border-none	 min-w-full drop-shadow-md mt-12">
                            <thead className="bg-white border-b">
                                <tr className="bg-gray-100 border-b">
                                    <th scope="col" className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left">
                                        Tên
                                    </th>
                                    <th scope="col" colSpan="3" className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left">
                                        Mối quan hệ
                                    </th>
                                </tr>
                                {members.map((mem, index) => (
                                    <tr className="bg-white border-b">
                                        <th scope="col" className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left">
                                            {mem[index].name.firstName}
                                        </th>
                                        <th scope="col" colSpan="2" className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left">
                                            Chủ hộ
                                        </th>
                                        <th scope="col" colSpan="2" className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left flex justify-end">
                                        </th>
                                    </tr>
                                ))
                                }
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HouseholdDetailPage