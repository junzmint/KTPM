"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/navbar';
import BlueButton from '@/components/button/blue-button';

const AddNewHouseHold = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [userRoles, setUserRoles] = useState({});
    const [household, setHousehold] = useState({});
    const [name, setName] = useState();
    const [address, setAddress] = useState({});
    const [moveIn, setMoveIn] = useState({});
    const [moveOut, setMoveOut] = useState({});
    const [ownerId, setOwnerId] = useState({});
    const [members, setMembers] = useState([]);
    const handleNameChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setName(value);
    };
    const handleAddressChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAddress({ ...address, [name]: value });
    };
    const handleMoveInChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setMoveIn({ ...moveIn, [name]: value })
    }
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

    const handleAddNewHousehold = () => {
        window.alert("Add new household successfully")
        setShowModal(false)
    }
    return (
        <div className='flex'>
            <div className="flex-auto w-1/5 bg-slate-500 h-screen">
                <Navbar data={jobMenu} />
            </div>
            <div className='flex w-4/5 bg-white justify-center'>
                <div className="bg-white mt-24 px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Tạo hộ khẩu mới</h1>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Họ và tên chủ hộ">
                        Họ và tên chủ hộ
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
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Mã hộ
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="Mã hộ"
                                placeholder="Mã hộ"
                                value={household.household_id}
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Số nhà
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="no"
                                value={address.no}
                                onChange={handleAddressChange}
                                placeholder="Số nhà"
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Ngày chuyển đến
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="date"
                                value={moveIn.date}
                                onChange={handleMoveInChange}
                                placeholder="Ngày chuyển đến"
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Lý do
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="Lý do"
                                value={moveIn.reason == "" ? "Chưa có" : moveIn.reason}
                                onChange={handleMoveInChange}
                                placeholder="Lý do"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Mã vùng
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="Mã vùng"
                                value={household.areaCode}
                                placeholder="Mã vùng"
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Phường
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="ward"
                                value={address.ward}
                                onChange={handleAddressChange}
                                placeholder="Phường"
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Quận
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="district"
                                value={address.district}
                                onChange={handleAddressChange}
                                placeholder="Quận"
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Huyện
                            </label>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="province"
                                onChange={handleAddressChange}
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
                                                    onClick={() => { setShowModal(false) }}
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
                                                <BlueButton text="Cập nhật" onClick={handleAddNewHousehold}></BlueButton>
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
        </div >
    )
}

export default AddNewHouseHold