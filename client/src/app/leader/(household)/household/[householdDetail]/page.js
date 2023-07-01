"use client"

import BlueButton from '@/components/button/blue-button';
import Navbar from '@/components/navbar';
import Image from 'next/legacy/image';
import RemoveModal from '@/components/removehouseholdmodal';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function HouseholdDetailPage({ params }) {
    const [household, setHousehold] = useState({});
    const [name, setName] = useState();
    const [address, setAddress] = useState({});
    const [moveIn, setMoveIn] = useState({});
    const [members, setMembers] = useState([]);
    const [ownerId, setOwnerId] = useState();
    const [userRoles, setUserRoles] = useState({});
    const [isOpen, setIsOpen] = useState(false)
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
                setOwnerId(data.data.household.owner_id)
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

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
        <div className='flex  h-full'>
            <div className="flex-auto w-1/5 bg-slate-500 ">
                <Navbar data={jobMenu} />
            </div>
            <div className="flex-auto w-4/5 bg-slate-100  h-full flex justify-center flex-col">
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
                            <Link href="../../../leader/updatehousehold">
                                <BlueButton text="Cập nhật"></BlueButton>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="ml-28 mb-16 w-4/5 max-w-7xl h-full p-2 mt-5 bg-white border-gray-200 rounded-lg shadow">
                    <div className='p-10'>
                        <table className="flex-auto !border-none min-w-full drop-shadow-md mt-5">
                            <thead className="bg-white border-b">
                                <tr className="bg-gray-100 border-b">
                                    <th scope="col" className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left">
                                        Tên
                                    </th>
                                    <th scope="col" colSpan="3" className="!border-none text-lg font-medium text-gray-900 px-6 py-4 text-left">
                                        Mối quan hệ
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    members.map((mem, index) => (
                                        <tr key={index} className="bg-white border-b">
                                            <th scope="col" className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left">
                                                {mem.citizen_id.name.firstName + " " + mem.citizen_id.name.lastName}
                                            </th>
                                            <th scope="col" colSpan="2" className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left">
                                                {mem.relation}
                                            </th>
                                            <th scope="col" colSpan="2" className="text-sm font-medium !border-none text-gray-900 px-6 py-4 text-left flex justify-end">
                                                <Link href={"/leader/citizen/nhankhau/" + mem.citizen_id._id}>
                                                    <BlueButton text="Xem"></BlueButton>
                                                </Link>
                                                <RemoveModal></RemoveModal>
                                            </th>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='flex'>
                            <BlueButton text="Thêm thành viên"></BlueButton>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HouseholdDetailPage