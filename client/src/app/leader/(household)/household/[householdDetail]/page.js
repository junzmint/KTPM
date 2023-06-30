"use client"

import BlueButton from '@/components/button/blue-button';
import Image from 'next/legacy/image';
import React, { useEffect, useState } from 'react'

function HouseholdDetailPage({ params }) {
    const [household, setHousehold] = useState();
    const [name, setName] = useState();
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
                console.log(name);
                setHousehold(data.data.household)
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
            <div className="flex-auto w-4/5 bg-slate-100 h-screen flex justify-center">

                <div className="w-full max-w-2xl max-h-13 bg-white border border-gray-200 rounded-lg shadow ">
                    <div className="flex justify-end px-4 pt-4">
                        <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 hover:bg-gray-100 fo0 rounded-lg text-sm p-1.5" type="button">
                            <span className="sr-only">Open dropdown</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                        </button>
                    </div>
                    <div className="flex flex-col items-center pb-10">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://images.iphonephotographyschool.com/24762/560/portrait-photography.jpg" alt="Bonnie image" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900">{name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Chủ hộ</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HouseholdDetailPage