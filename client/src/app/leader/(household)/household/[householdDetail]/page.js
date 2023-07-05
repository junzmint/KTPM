"use client"

import BlueButton from '@/components/button/blue-button';
import Navbar from '@/components/navbar';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function HouseholdDetailPage({ params }) {
    const [showModal, setShowModal] = React.useState(false);
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
                name: "Hộ khẩu",
                path: "/leader/household",
                auth: userRoles,
            },
        ],
    };

    const handleRemoveCitizen = async (citizenID) => {
        const token =
            localStorage.getItem('access_token') ||
            sessionStorage.getItem('access_token');
        try {
            console.log(household._id)
            const response = await fetch(`http://localhost:4000/household/remove_member?household_id=${household._id}&citizen_id=${citizenID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                window.alert(data.message)
                setShowModal(false)
            } else {
                window.alert(data.error[0].message)
            }
        } catch (error) {
            console.error(error);
        }
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
                        <p>Ngày chuyển đến: {moveIn == null ? "Chưa có" : moveIn.date}</p>
                        <p>Lý do chuyển đến: {moveIn == null ? "Chưa có" : moveIn.reason}</p>
                    </div>
                    <div className='mt-8 flex justify-center items-center'>
                        <div className='flex'>
                            <Link href={"../../../leader/updatehousehold/" + household._id}>
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
                                                <BlueButton onClick={() => setShowModal(true)} text="Tách hộ"></BlueButton>
                                                {showModal ? (
                                                    <>
                                                        <div
                                                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                        >
                                                            <div className="fixed w-auto my-6 mx-auto max-w-3xl">
                                                                {/*content*/}
                                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                                    {/*header*/}
                                                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                                        <h3 className="text-3xl font-semibold">
                                                                            Xác nhận tách
                                                                        </h3>
                                                                        <button
                                                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                            onClick={() => setShowModal(false)}
                                                                        >
                                                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                                x
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                    {/*body*/}
                                                                    <div className="relative p-6 flex-auto">
                                                                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                                            Bạn có muốn tách người này khỏi hộ?
                                                                        </p>
                                                                    </div>
                                                                    {/*footer*/}
                                                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                                        <button
                                                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                            type="button"
                                                                            onClick={() => setShowModal(false)}
                                                                        >
                                                                            Đóng
                                                                        </button>
                                                                        <BlueButton text="Tách hộ" onClick={
                                                                            () => { handleRemoveCitizen(mem.citizen_id._id) }
                                                                        }
                                                                        ></BlueButton>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                                    </>
                                                ) : null}
                                            </th>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='flex'>
                            <Link href={"../../../leader/addnewmember/" + household._id}>
                                <BlueButton text="Thêm thành viên"></BlueButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HouseholdDetailPage