"use client";
import React, { useState, useEffect } from "react";
import { UpdateField } from "@/components/form";
import { SubmitButton } from "@/components/button";
import Modal from "@/components/submit-modal";
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
  const closeModal = () => {
    setIsUpdate(false);
  };
  return (
    <div className="flex flex-row w-4/5 px-10 mx-auto bg-white justify-center">
      {isUpdate && <Modal modalContent={modal} closeModal={closeModal}></Modal>}
      <div className="bg-white mt-24 px-6 py-8 rounded shadow-md text-black w-full">
        <h1 className="mb-8 text-3xl text-center ">Cập nhật người dùng</h1>
        <div className="flex flex-row ">
          <form className=" mx-auto" onSubmit={handleSubmit}>
            <div>
              <UpdateField data={phone} handleChange={handleChange} />
            </div>
            <div>
              <h1 className="text-gray-700 text-sm font-bold mb-2 pl-4">
                Role
              </h1>

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
            <div className="text-center pt-5">
              <SubmitButton text="Đăng kí" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
