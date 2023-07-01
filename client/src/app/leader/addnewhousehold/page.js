"use client"
import React, { useState } from 'react'
import Navbar from '@/components/navbar';
import BlueButton from '@/components/button/blue-button';

const CreateNewForm = () => {
    const [userRoles, setUserRoles] = useState({});

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
            <div className='flex w-4/5 bg-slate-100 justify-center'>
                <div class="bg-grey-lighter min-h-screen flex flex-col">
                    <div class="container max-w-3xl min-w-3xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 class="mb-8 text-3xl text-center">Tạo hộ khẩu mới</h1>
                            <div className='w-full'>
                                <input
                                    type="text"
                                    class="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="Mã hộ"
                                    placeholder="Mã hộ" />
                            </div>
                            <div className="flex space-x-12">

                                <div className='mr-8 w-full'>
                                    <input
                                        type="text"
                                        class="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="Số nhà"
                                        placeholder="Số nhà" />
                                    <input
                                        type="text"
                                        class="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="Ngày chuyển đến"
                                        placeholder="Ngày chuyển đến" />
                                    <input
                                        type="text"
                                        class="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="Lý do"
                                        placeholder="Lý do" />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        class="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="Phường"
                                        placeholder="Phường" />
                                    <input
                                        type="text"
                                        class="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="Quận"
                                        placeholder="Quận" />
                                    <input
                                        type="text"
                                        class="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="Huyện"
                                        placeholder="Huyện" />
                                </div>
                            </div>
                            <div className='flex items-center w-full'>
                            </div>
                            <div class="text-center text-sm text-grey-dark mt-4">
                                <BlueButton text="Tạo"></BlueButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewForm