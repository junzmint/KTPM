"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/navbar';
import BlueButton from '@/components/button/blue-button';

const UpdateHouseHold = ({ params }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [userRoles, setUserRoles] = useState({});
    const [household, setHousehold] = useState({});
    const [name, setName] = useState();
    const [address, setAddress] = useState({});
    const [moveIn, setMoveIn] = useState({});
    const [members, setMembers] = useState([]);
    useEffect(() => {
        (async () => {
            const token =
                localStorage.getItem("access_token") ||
                sessionStorage.getItem("access_token");
            try {
                const response = await fetch(`http://localhost:4000/household/profile/${params.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const data = await response.json();
                console.log(data.data.household);
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
    const handleNameChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setName(value);
    };
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

        <div className='flex'>
            <div className="flex-auto w-1/5 bg-slate-500 h-screen">
                <Navbar data={jobMenu} />
            </div>
            <div className='flex w-4/5 bg-white justify-center'>
                <div className="bg-white mt-24 px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Cập nhật hộ khẩu</h1>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="Họ và tên chủ hộ">
                        Họ và tên
                    </label>
                    <div className='w-full'>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="name"
                            placeholder="Họ và tên chủ hộ"
                            value={name}
                            onChange={handleNameChange} />
                    </div>
                    <div className="flex space-x-12">
                        <div className='mr-8 w-full'>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Mã hộ
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="Mã hộ"
                                placeholder="Mã hộ"
                                value={household.household_id}
                            />
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Số nhà
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="Số nhà"
                                value={address.no}
                                placeholder="Số nhà"
                            />
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Ngày chuyển đến
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="Ngày chuyển đến"
                                value={moveIn.date}
                                placeholder="Ngày chuyển đến"
                            />
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Lý do
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="Lý do"
                                value={moveIn.reason == "" ? "Chưa có" : moveIn.reason}
                                placeholder="Lý do"
                            />
                        </div>
                        <div className="w-full">
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Mã vùng
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="Mã vùng"
                                value={household.areaCode}
                                placeholder="Mã vùng"
                            />
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Phường
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="Phường"
                                value={address.ward}
                                placeholder="Phường"
                            />
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Quận
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="Quận"
                                value={address.district}
                                placeholder="Quận"
                            />
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Huyện
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="province"
                                value={address.province}
                                placeholder="Huyện"
                            />
                        </div>
                    </div>
                    <div className='flex items-center w-full'>
                    </div>
                    <div className="text-center text-sm text-grey-dark mt-4">
                        <BlueButton onClick={() => setShowModal(true)} text="Cập nhật"></BlueButton>
                        {showModal ? (
                            <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                        {/*content*/}
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                <h3 className="text-3xl font-semibold">
                                                    Xác nhận cập nhật
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
                                                    Bạn có chắc chắn muốn cập nhật hộ khẩu?
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
                                                <BlueButton text="Cập nhật" onClick={() => setShowModal(false)}></BlueButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateHouseHold