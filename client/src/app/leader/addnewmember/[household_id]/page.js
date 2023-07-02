"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/navbar';
import BlueButton from '@/components/button/blue-button';


const AddNewMember = ({ params }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [userRoles, setUserRoles] = useState({});
    const [household, setHousehold] = useState({});
    const [citizenID, setCitizenID] = useState("");
    const [relation, setRelation] = useState("");
    const [citizen, setCitizen] = useState({ citizen_id: citizenID, relation });
    const [name, setName] = useState();
    const [cccd, setCccd] = useState("");
    useEffect(() => {
        (async () => {
            const token =
                localStorage.getItem("access_token") ||
                sessionStorage.getItem("access_token");
            try {
                const response = await fetch(`http://localhost:4000/household/profile/${params.household_id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const data = await response.json();
                console.log(data.data.household, "hel");
                setHousehold(data.data.household)
                setName(data.data.household.members[0].citizen_id.name.firstName
                    + " " + data.data.household.members[0].citizen_id.name.lastName)
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);
    const handleAddNewMember = async () => {
        citizen.citizen_id = citizenID
        const token =
            localStorage.getItem('access_token') ||
            sessionStorage.getItem('access_token');
        try {
            console.log(citizen, "citizen")
            const response = await fetch(`http://localhost:4000/household/add_member/${params.household_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(citizen)
            });
            const data = await response.json();
            if (response.ok) {
                setCitizen({ citizen_id: "", relation: "" })
                setShowModal(false)
            } else {
                console.log(data.error[0].message)
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleGetCitizenId = async () => {
        setShowModal(true);
        const token =
            localStorage.getItem('access_token') ||
            sessionStorage.getItem('access_token');
        try {
            console.log(citizen, "citizen")
            const response = await fetch(`http://localhost:4000/citizen/find?key=${cccd}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data.data.result[0]._id);
            setCitizenID(data.data.result[0]._id);
            console.log(citizenID, "alooo")
        } catch (error) {
            console.error(error);
        }
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
    const onCccdChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setCccd(value)
        console.log("cccd = ", value)
    };
    const onRelationChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setRelation(value)
        setCitizen({ ...citizen, [name]: value })
        console.log(citizen)

    }
    return (
        <div className='flex'>
            <div className="flex-auto w-1/5 bg-slate-500 h-screen">
                <Navbar data={jobMenu} />
            </div>
            <div className='flex w-4/5 bg-white justify-center'>
                <div className="bg-white mt-24 px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Thêm thành viên mới</h1>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Họ và tên chủ hộ">
                        Họ và tên chủ hộ
                    </label>
                    <div className='w-full'>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="name"
                            value={name}
                            placeholder="Họ và tên chủ hộ"
                        />
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Họ và tên chủ hộ">
                                Số căn cước công dân của thành viên muốn thêm :
                            </label>
                            <div className='w-full'>
                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="citizen_id"
                                    placeholder="Số căn cước"
                                    onChange={onCccdChange}
                                />
                            </div>
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Họ và tên chủ hộ">
                                Quan hệ với chủ hộ
                            </label>
                            <div className='w-full'>
                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="relation"
                                    placeholder="Quan hệ với chủ hộ"
                                    onChange={onRelationChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center w-full'>
                    </div>
                    <div className="text-center text-sm text-grey-dark mt-4">
                        <BlueButton onClick={handleGetCitizenId} text="Cập nhật"></BlueButton>
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
                                                    Xác nhận thêm
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
                                                    Bạn có chắc chắn muốn thêm thành viên này?
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
                                                <BlueButton text="Xác nhận" onClick={handleAddNewMember}></BlueButton>
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

export default AddNewMember