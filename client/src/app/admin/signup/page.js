"use client";
import { SubmitButton } from "@/components/button";
import { InputField, RadioButton } from "@/components/form";
import React, { useState } from "react";
import Modal from "@/components/submit-modal";
const SignUp = () => {
  const defaultValue = {
    phone: "",
    password: "",
    role: "",
  };
  const [user, setUser] = useState(defaultValue);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name) {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    } else {
      setUser((prevUser) => ({ ...prevUser, role: value }));
    }
  };

  const phoneNum = {
    type: "text",
    id: "phone",
    value: `${user.phone}`,
    name: "phone",
    placeHolder: "Enter phone num",
    label: "Số điện thoại",
  };
  const password = {
    type: "password",
    id: "password",
    value: `${user.password}`,
    name: "password",
    placeHolder: "Enter password",
    label: "Mật khẩu",
  };
  const closeModal = () => {
    setIsSuccess(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    if (user.phone && user.role) {
      const response = await fetch("http://localhost:4000/user/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        setIsSuccess(true);
        setSuccessMessage(data.message);
        setUser(defaultValue);
      } else {
        const data = await response.json();
        setIsSuccess(true);
        setSuccessMessage(data.error.message);
        setUser(defaultValue);
      }
    }
  };

  return (
    <div className="flex flex-row w-4/5 px-10 mx-auto bg-white justify-center">
      {isSuccess && (
        <Modal modalContent={successMessage} closeModal={closeModal}></Modal>
      )}
      <div className="bg-white mt-24 px-6 py-8 rounded shadow-md text-black w-full">
        <div className="mx-auto w-4/5 relative">
          <h1 className="mb-8 text-3xl text-center ">Tạo người dùng mới</h1>
          <div className="flex flex-row ">
            <form onSubmit={handleSubmit} className="mx-auto">
              <div>
                <InputField data={phoneNum} handleChange={handleChange} />
              </div>
              <div>
                <InputField data={password} handleChange={handleChange} />
              </div>
              <div>
                <div className=" text-gray-700 text-sm font-bold mb-2">
                  Role
                </div>

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
    </div>
  );
};
export default SignUp;
