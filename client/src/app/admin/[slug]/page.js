"use client";
import React, { useState, useEffect } from "react";
import { UpdateField } from "@/components/form";
export async function generateStaticParams() {
  const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");
  const posts = await fetch("http://localhost:4000/user/userList", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

  return posts?.data?.list?.map((post) => ({
    slug: post,
  }));
}
const UserDetail = ({ params }) => {
  const { slug } = params;
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getUser() {
      const token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      const foundUser = await fetch(
        "http://localhost:4000/user/details/" + slug,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());
      if (foundUser) {
        setUser(foundUser?.data.user);
      }
    }
    getUser();
  }, []);
  const [modal, setModal] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const phone = {
    type: "text",
    id: "phone",
    value: `${user.phone}`,
    name: "phone",
    label: "Số điện thoại",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    const response = await fetch(
      `http://localhost:4000/user/update_profile/${user._id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          phone: user.phone,
          role: user.role,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setIsUpdate(true);
      setModal(data?.message);
    } else {
      setIsUpdate(true);
      setModal("fail");
    }
  };
  return (
    <div className="flex flex-row w-4/5 px-10 mx-auto bg-white justify-center">
      <div className="bg-white mt-24 px-6 py-8 rounded shadow-md text-black w-full">
        <h1 className="mb-8 text-3xl text-center ">Cập nhật người dùng</h1>
        <div className="flex flex-row ">
          <form className="flex w-full mx-auto" onSubmit={handleSubmit}>
            <div className="flex flex-col w-1/2">
              <UpdateField data={phone} handleChange={handleChange} />
            </div>
            <div className="flex flex-col  w-1/2 text-black">
              <h1 className="text-gray-700 text-sm font-bold mb-2 pl-4">
                Role
              </h1>
              <div>
                <input
                  className="mx-4"
                  type="radio"
                  id="ADMIN"
                  name="role"
                  value="ADMIN"
                  checked={user.role === "ADMIN"}
                  onChange={handleChange}
                ></input>
                <label for="role">ADMIN</label>
              </div>
              <div>
                <input
                  className="mx-4"
                  type="radio"
                  id="LEADER"
                  name="role"
                  value="LEADER"
                  checked={user.role === "LEADER"}
                  onChange={handleChange}
                ></input>
                <label for="role">LEADER</label>
              </div>
              <div>
                <input
                  className="mx-4"
                  type="radio"
                  id="ACCOUNTANT"
                  name="role"
                  value="ACCOUNTANT"
                  checked={user.role === "ACCOUNTANT"}
                  onChange={handleChange}
                ></input>
                <label for="role">ACCOUNTANT</label>
              </div>
            </div>
            <div className="mx-auto text-center flex flex-row">
              <button className="bg-blue-200 hover:bg-blue-400" type="submit">
                Cap nhat
              </button>
            </div>
          </form>
          {isUpdate && <div>{modal}</div>}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
